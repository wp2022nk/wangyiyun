<!-- 底部播放组件 ：全局组件，父组件为app.vue -->
<template>
    
    <!-- 底部组件 -->
    <div class="FooterMusic">
         <!-- 背景
            <div class="image-container">
                <img :src="playList[playListIndex].al.picUrl" class="bgimg">
            </div>
        -->
        <!-- 左边 -->
         <Transition>

            <mini-play-list v-show="showMiniPlayList"></mini-play-list>
        </Transition>
        <div class="footerLeft" @click="updatedetailShow">
            <img src="@\assets\BgSub_cd2.png" alt="" class="img_cd">
            <img :src="playList[playListIndex].al.picUrl" alt="" class="img_mu">
            
        </div>
        <!-- 右边 -->
        <div class="footRight" >
            
            <!-- 中间 -->
            <div class="footerMiddle" @click="updatedetailShow">
                <div>
                    <Vue3Marquee class="title"  >
                        <!-- 歌曲名字 -->
                        <p>{{ playList[playListIndex].name }}-</p>
                        <!-- 歌手名 -->
                        <span v-for="(item,i) in playList[playListIndex].ar" :key="item">
                            {{ item.name }}
                        </span>
                    </Vue3Marquee>
                    
                    
                </div>
            </div>
            <!-- 右边 -->
            <div class="footerRight">
                <!-- 暂停时图标 -->
                <svg class="icon liebiao" aria-hidden="true" v-if="isbtnShow" @click="play">
                    <use xlink:href="#icon-bofang-copy"  ></use>
                </svg>
                <!-- 播放中图标 -->
                <svg class="icon liebiao" aria-hidden="true" v-else  @click="play">
                    <use xlink:href="#icon-weibiaoti--"></use>
                </svg>
                <svg class="icon liebiao" aria-hidden="true" @click="updateShowMiniPlayList(true)">
                    <use xlink:href="#icon-zu"></use>
                </svg>
            </div>
        </div>
        
        <!-- 播放音乐 -->
        <audio ref="audio" 
            :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`" 
            @timeupdate="timeUpdate"
            @durationchange="durationChange" >
        </audio>
        <!-- 弹出详情页面 -->
        <van-popup v-model:show="detailShow" position="bottom":style="{width:'100%', height: '100%'}">
            <MusicDetail :musicDetail="playList[playListIndex]" :play="play" :isbtnShow="isbtnShow" :changeCurrentTime=" changeCurrentTime"/>
        </van-popup>
    </div>

</template>
<script>
import {mapMutations, mapState} from 'vuex'
import MusicDetail from '@/components/item/MusicDetail.vue'
import { Vue3Marquee } from 'vue3-marquee'
import MiniPlayList from "@/components/player/MiniPlayList.vue";

export default{
    data(){
        return{
            
        }
    },
   
    computed:{
        ...mapState(['playList','playListIndex',"isbtnShow","detailShow","showMiniPlayList"])
    },
    mounted(){
        console.log(this.$refs);
        this.$store.dispatch("getLyric",this.playList[this.playListIndex].id)
    
    },
    updated(){
        this.$store.dispatch("getLyric",this.playList[this.playListIndex].id)
      
    },
    methods:{
        play:function(){
            // 判断歌曲是否处于播放状态
            if(this.$refs.audio.paused){
                this.$refs.audio.play();
                 this.updateISbtnShow(false)
                 console.log(this.playList[this.playListIndex])
              
            }
            else{
                this.$refs.audio.pause();
                this.updateISbtnShow(true)
                
            }
             
        },
        //监听当前时间
        timeUpdate:function(e){
            this.updateCurrentTime(this.$refs.audio.currentTime)
        },
        //监听歌曲总时长
        durationChange:function(e){
             this.updateDuration(this.$refs.audio.duration)
        },
        ...mapMutations(['updateISbtnShow','updatedetailShow','updateCurrentTime','updateDuration',"updateShowMiniPlayList"]),
        //进度条变化
        changeCurrentTime:function(e){
            this.$refs.audio.currentTime=e
         
        }
    },  
    //监听playListIndex是否发生改变，如果发生则播放
        watch:{
            playListIndex:function(){
                this.$refs.audio.autoplay=true;
                if(this.$refs.audio.paused){//判断本来是暂停状态，点击后播放音乐，改变图标
                    this.updateISbtnShow(false)
                    
                }
            },
            playList:function(){
                if(this.isbtnShow){
                     this.$refs.audio.autoplay=true;
                     this.updateISbtnShow(false)
               
                }
            },
           
           
        },
    components:{
        MusicDetail,
        Vue3Marquee,
        MiniPlayList

    }
}
</script>
<style lang="less" scoped>

.FooterMusic{
    width: 100%;
    height: 1.4rem;
    background-color:  rgba(255, 255, 255,0);;
    
    position: fixed;
    bottom: 0;
    
    display: flex;
   
    justify-content: space-between;
   z-index: 10;
    .image-container{
            
            .bgimg{
                position: absolute;
                width: 100%;
                height: 80%;
                top: 15px;
                position: absolute;
                z-index: 1;        
                filter: brightness(40%)  ;
                background-blend-mode: hue;
            
            }
    }
    .footerLeft{

        width: 20%;
        height: 100%;
        position: relative;
        padding: 10px;
        
        align-items: center;
       
       
        .img_mu{
            width: 1.25rem;
            height: 1.25rem;
            border-radius: 10%;
            position: absolute;
            z-index: 4;
            top: 5;
            left: 0;
        }
        .img_cd{
            position: absolute;
            top: 10px;
            left: 20px;
            width: 1.2rem;
            height: 1.2rem;
            z-index: 3;
            display: block; 
           
        }
        
    }
    .footRight{
        width: 100%;
        height: 70%;
       
        background-color: rgb(255, 255, 255);
        margin-top: 25px;
        display: flex;
        padding: 10px;
        border-top: 1px solid #999;
        border-top-right-radius: 30%;
        
        .footerMiddle{
            width: 80%;
            height: 100%;
            display: flex;
            padding: 10px;
            align-items:center;
            z-index: 2;
            
            
            
            .title{
                
                width: 60%;
                height: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-left: 10px;
                font-family: "华文楷体";
                span{
                    font-size: x-small;
                    
                }

            }
        }
        .footerRight{
            width: 30%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            z-index: 2;
            
            .icon{
                width: 30px;
                height: 30px;
                margin-left: 10px;
            }
        }

    }
   
}

</style>