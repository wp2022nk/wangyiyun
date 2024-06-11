<!-- 歌曲详情页 -->
<template>
    <!-- 背景图片 -->
    <div class="image-container">
        <img :src="musicDetail.al.picUrl" alt="" class="bgimg">
    </div>
    <Transition>

      <mini-play-list v-show="showMiniPlayList"></mini-play-list>
    </Transition>
    <!-- 头部 -->
    <div class="detailTop">
        <!-- 左边 -->
        <div class="detailTopLeft">
            <!-- 左箭头 -->
            <svg class="icon liebiao" aria-hidden="true" @click="backHome">
                <use xlink:href="#icon-xiangzuojiantou"></use>
            </svg>
            <!-- 歌名和作者名 -->
            <div class="leftMarquee">
                <!-- 歌名 使用跑马灯-->
                <Vue3Marquee style="color: aliceblue;" class="pmd">
                   {{ musicDetail.name }}
                </Vue3Marquee>
                
                <!-- 歌手名 -->
                <span v-for="(item,i) in musicDetail.ar" :key="item">
                    {{ item.name+" " }}
                </span>
                <!-- 右箭头 -->
                <svg class="icon liebiao" aria-hidden="true">
                    <use xlink:href="#icon-btn-right"></use>
                </svg>
            </div>
        </div>
        <!-- 右边 -->
        <div class="detailTopRight">
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>

        </div>
    </div>
    <!-- 中间部分 -->
    <div class="middle" >
        <!-- 磁盘部分 -->
        <div class="detailContent" v-show="!isLyricShow">
            <img src="@\assets\cz.png" alt="" class="img_cz" :class="{img_cz_active:!isbtnShow}">
            <img src="@\assets\cd.png" alt="" class="img_cd">
            <img :src="musicDetail.al.picUrl" alt="" class="img_ar" @click="isLyricShow=true" :class="{img_ar_active:!isbtnShow,img_ar_paused:isbtnShow}">
        </div>
        <!-- 歌词部分 -->
        <div class="musicLyric" ref="musicLyric" :class="{musicLyricActive:!isLyricShow}" @touchstart="music_touchstart" @touchmove="music_touchmove" @touchend="music_touchend">
            <p v-for="item in lyric" :key="item":class="{active:(currentTime*1000>=item.time&&currentTime*1000<=item.next)} "@click="clipMusic(item.time)">{{ item.lrc }}</p>
        </div>
    </div>
    <!-- 底部组件 -->
    <div class="detailFooter">
        <!-- 底部多功能按钮 -->
        <div class="footerTop">
            <!-- 喜欢 -->
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-aixin"></use>
            </svg>
            <!-- 下载 -->
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-xiazai3"></use>
            </svg>
            <!-- 唱片 -->
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-yinlechangpian"></use>
            </svg>
            <!-- 评论 -->
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-xiaoxi"></use>
            </svg>
            <!-- 循环播放 -->
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-duoxuantitongbuguize"></use>
            </svg>
        </div>
        <!-- 进度条 -->
        <div class="footerContent">
            <input type="range" class="range"  ref="progress" min="0" :max="duration"  step="0.05" @touchstart="touchStart" @touchend="touchEnd" @touchmove="touchMove">
            
        </div>
        <!-- 时间显示 -->
        <div class="progress-time">
            
            <span class="left">{{ parseTime(currentTime) }}</span>
            <span class="right">{{ parseTime(duration) }}</span>
        </div>
        <!-- 播放，以及切换上下首 -->
        <div class="footer">
            <!-- 单曲循环 -->
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-xunhuan"></use>
            </svg>
            <!-- 上一首 -->
            <svg class="icon liebiao" aria-hidden="true" @click="goPlay(-1)">
                <use xlink:href="#icon-shangyishoushangyige"></use>
            </svg>
            <!-- 播放&暂停 -->
            <svg class="bofang" aria-hidden="true" @click="play" v-if="isbtnShow">
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <svg class="bofang" aria-hidden="true" @click="play" v-else>
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <!-- 下一首 -->
            <svg class="icon liebiao" aria-hidden="true" @click="goPlay(1)">
                <use xlink:href="#icon-xiayigexiayishou"></use>
            </svg>
            <!-- 列表 -->
            <svg class="icon liebiao" aria-hidden="true" @click="updateShowMiniPlayList(true)">
                <use xlink:href="#icon-liebiaoxuanxiang"></use>
            </svg>

        </div>
    </div>

</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import { mapMutations ,mapState} from 'vuex';
import MiniPlayList from "@/components/player/MiniPlayList.vue";


export default{
    data(){
        return{
            isLyricShow: false,//是否显示歌词
            isTouch:false,//是否拖动进度条
            isScrolling:false,//是否滚动歌词
            scrollTimeout:null,
            isWatching: true, // 控制是否执行watch逻辑
            timer: null // 存储setTimeout返回的定时器ID
        }
    },
    created(){
        this.unwatch=this.progressWatcher()
    
       
    },
    computed:{
        ...mapState(["lyricList","currentTime","playListIndex","playList","duration","showMiniPlayList"]),
        //以换行符切割字符串
        lyric:function(){
            let arr;
            if(this.lyricList.lyric){
                arr=this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item,i)=>{
                    //获取分钟
                    let min=item.slice(1,3);
                    //获取秒数
                    let sec=item.slice(4,6);
                    //获取毫秒
                    let mill=item.slice(7,10);
                    
                    //获取歌词
                    let lrc=item.slice(11,item.length);
                    if(isNaN(Number(mill))){
                        mill=item.slice(7,9);
                        lrc=item.slice(10,item.length);
                    }
                    //获取时间
                    let time=parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
                    // console.log(min,sec,mill,lrc)
                    return {min,sec,mill,lrc,time};
                });
                arr.forEach((item, i) => {
                    if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
                        item.next = 10000000;
                    } else {
                        item.next = arr[i + 1].time;
                    }
                });
            }
            console.log(arr)
            return arr

        }
    },
    
    //监听歌词的滚动以及进度条
    watch:{
        currentTime:function(newValue){
            let p=document.querySelector("p.active")
           
            // console.log([p])
            //监听歌词
            if(this.isWatching){//true:执行watch监听歌词滚动
                //与磁盘一同出现
                if(!this.isLyricShow)
                {
                    if (p) {
                        if (p.offsetTop > 50) {
                            this.$refs.musicLyric.scrollTop = p.offsetTop - 50;
                        }
                    }
                }
                //单独出现
                else{
                    if (p) {
                            if (p.offsetTop > 150) {
                                this.$refs.musicLyric.scrollTop = p.offsetTop - 150;
                            }
                        }
                }
            }
            
            //监听进度条
            
            
            if(newValue===this.duration){
                this.goPlay(1)
            }
        }
    },
    components: {
        Vue3Marquee,
        MiniPlayList
    },
    props:['musicDetail','play','isbtnShow','changeCurrentTime'],
    methods:{
        //返回上一级
        backHome:function(){
            this.updatedetailShow()
            this.isLyricShow=false
        },
        //上一首和下一首的切换
        goPlay:function(i){
            let index=this.playListIndex+i;
            if(index<0){
                index=this.playList.length-1;
                this.play()
            }else if(index>=this.playList.length){
                index=0;
                this.play()
            }
            this.updatePlayListIndex(index)
        },
        //监听进度条
        progressWatcher:function(){
            return this.$watch("currentTime",(newValue)=>{
                this.$refs.progress.value=newValue
            })
        },
        //进度条开始拖动
        touchStart:function(e){
            
            
            this.unwatch();
            console.log("开始拖动")
            console.log(e.target.value)
        },
        //进度条正在拖动
        touchMove:function(e){
            this.updateCurrentTime(e.target.value)
            console.log("正在拖动")
        },
        //进度条结束拖动
        touchEnd:function(e){
            this.updateCurrentTime(e.target.value)
            this.changeCurrentTime(this.currentTime)
            // this.audioTime=e.target.value
            console.log("结束拖动")
            console.log(e.target.value)
            console.log(this.currentTime)
            this.unwatch=this.progressWatcher()
        },
        //歌词开始拖动
        music_touchstart:function(e){
            //在每次拖动时消除定时器，防止上一次定时器完成后对本次拖动的影响
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            console.log("歌词开始拖动")
            this.isWatching=false
        },
        //歌词正在拖动
        music_touchmove:function(e){
            
            console.log("歌词正在拖动")
        },
        //歌词结束拖动
        music_touchend:function(e){
            console.log(e)
            console.log("歌词结束拖动")
            this.timer=setTimeout(() => {
                this.isWatching=true
            }, 2000);
            
        },
        //跳转歌词
        clipMusic:function(e1){
            console.log(e1)
    
            console.log(this.currentTime)
            
            this.updateCurrentTime(e1/1000+0.1)
            console.log(this.currentTime)
            this.changeCurrentTime(this.currentTime)
            //立即恢复对歌词的监听
            this.isWatching=true

        },
        //规格化时间
        parseTime:function(e){
            let min = Math.floor(e / 60);
            let sec = Math.floor(e % 60); // 使用取模操作得到秒数，这样更准确

            // 格式化分钟和秒数，确保它们始终是两位数
            min = min < 10 ? '0' + min : min.toString();
            sec = sec < 10 ? '0' + sec : sec.toString();

            return `${min}:${sec}`;
        },
         beforeDestroy() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
        },
        
        ...mapMutations(['updatedetailShow','updatePlayListIndex','updateCurrentTime',"updateShowMiniPlayList"])
    }
    
}
</script>
<style lang="less" scoped>
.image-container{
    .bgimg{
       
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;        
        filter:  blur(50px)  brightness(50%)  ;
        background-blend-mode: hue;
      
    }
}
// 给背景图片加一个灰色背景
.image-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* 半透明黑色背景，你可以根据需要调整颜色和透明度 */
  z-index: -1; /* 确保背景在图片下方 */
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fcf4f4;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .leftMarquee {
      width: 100%;
      height: 100%;
      margin-left: 0.4rem;
      
      .pmd{
        margin-top: 10px;
        align-self: center;
        width: 3rem;
        height: 100%;
      }
      span {
        margin-top:10px;
        color: #e0dfdf;
        font-family: "华文楷体";
        font-weight: bold;
      }
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        fill: #ffffff;
     
        
      }
    }
  }
}
//中间
.middle{
    width: 100%;
    height:9rem;
    position: relative;
    //磁盘
    .detailContent{
        width: 100%;
        height: 8.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        //磁针收回
        .img_cz{
            width:94.8px;
            height: 151.2px;
            position: absolute;
            left: 47%;
            bottom: 64%;
            transform-origin: 0 0;
            transform: rotate(-20deg);
            transition: all 1s;
        }
        //磁针放下
        .img_cz_active{
           width:94.8px;
            height: 151.2px;
            position: absolute;
            left: 47%;
            bottom: 64%;
            transform-origin: 0 0;
            transform: rotate(-3deg);
            transition: all 21;
        }

        .img_cd{
            width: 5rem;
            height: 5rem;
            position: absolute;
            bottom: 2rem;
            z-index: -1;
        }
        .img_ar {
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 50%;
            position: absolute;
            bottom: 2.89rem;
            //磁盘旋转
            animation: rotate_ar 50s linear infinite;
        }
        //磁盘旋转动画
        .img_ar_active{
            animation-play-state: running;
        }
        .img_ar_paused{
            animation-play-state: paused;
        }
        @keyframes rotate_ar{
            0%{
                transform: rotateZ(0deg);
            }
            100%{
                transform: rotateZ(360deg);
            }
        }
    }
    //歌词:单独出现时
    .musicLyric{
        width: 100%;
        height: 8rem;
        position: absolute;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
        overflow: scroll;
        scroll-behavior: smooth;
        transition: all 0.5s ease;
        p{
            color: #ccc6c6;
            margin-bottom: 15px;
            font-size: 10px;
        }
        .active{
            color: white;
            font-size: 15px;
        }
    }
    //歌词：与磁盘一起时
    .musicLyricActive{
        width: 100%;
        height: 2rem;
        position: absolute;
        top: 78%;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
        overflow: scroll;
        scroll-behavior: smooth;
        p{
            color: #c2c1c1;
            margin-bottom: 15px;
            font-size: 10px;
        }
        .active{
            color: white;
            font-size: 15px;
        }
    }
}

//底部
.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  //进度条
  .range {
   
    width: 100%; /* 宽度100% */
    height: 0.06rem; /* 高度 */
    background-color: blue;
   
  }
  
   
    
  //时间显示
  .progress-time{
    width: 100%;
    height: .4rem;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    .left,.right{
        font-size: large;
        color: white;
       
    }
  }
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: rgb(245, 234, 234);
    }
    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>