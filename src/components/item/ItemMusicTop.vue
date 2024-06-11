<!-- 歌单简介 父级组件为"wangyiyun-app/src/views/ItemMusicView.vue"-->
<template>
    <!-- 背景图片 -->
        <div class="image-container">
          <img :src="playlist.coverImgUrl" alt="" class="bgimg" />
        </div>
    <!-- 歌单顶部导航栏 -->
    <div class="itemMusicTop">
        
        
        <div class="itemLeft">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-xiangzuojiantou"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="itemRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao2-copy"></use>
            </svg>
        </div>
    </div>
     <!-- 歌单页面顶部详情 -->
     <div class="itemTopContent">
        <!-- 左边 -->
        <div class="contentLeft">
            <img :src="playlist.coverImgUrl" alt="" />
            <!-- 播放量 -->
            <div class="palyCount">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofangliang"></use>
                </svg>
                <span>{{ changeCount(playlist.playCount) }}</span>
            </div>
        </div>
        <!-- 右边 -->
        <div class="contentRight">
        <!-- 歌单名字 -->
        <p class="rightP_one">{{ playlist.name }}</p>
        <div class="right_img">
            <img :src="playlist.creator.backgroundUrl" alt="" />
            <span>{{ playlist.creator.nickname }}</span>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiangyoujiantou"></use>
            </svg>
        </div>
        <p class="rightP_two">
            <span>{{ playlist.description }}</span>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiangyoujiantou"></use>
            </svg>
        </p>
        </div>
     </div>
     <!-- 歌单页面操作图标 -->
     <div class="itemTopFooter">
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiaoxi"></use>
            </svg>
            <span>{{ playlist.commentCount }}</span>
        </div>
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
            <span>{{ playlist.shareCount }}</span>
        </div>
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiazai2"></use>
            </svg>
            <span>下载</span>
        </div>
            <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-a-30show_duoxuan"></use>
            </svg>
            <span>多选</span>
        </div>
  </div>
</template>
<script>
export default{
     setup(props) {
    // console.log(props);
    // 通过props进行传值，判断如果数据拿不到，就获取sessionStorage中的
    if((props.playlist.creator="")){
        props.playlist.creator=sessionStorage.g
    }
    // props.playlist.creator=""
    
    // 对播放量的处理
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    return{changeCount}
  },
  props: ["playlist"],
}
</script>
<style lang="less" scoped>
.image-container{
     .bgimg {
      width: 100%;
      height: 11rem;
      position: absolute;
      z-index: -1;
      filter: blur(30px);
    }
  }
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
// 顶端导航以及背景样式
.itemMusicTop{
   width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding: .2rem;
  position: relative;
  .itemLeft,
  .itemRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.2rem;
    span {
      font-size: 0.4rem;
      color: #fff;
    }
    .icon {
      fill: #fff; //填充颜色
    }
  }
  

 
    
}
//顶端内容样式
.itemTopContent {
  width: 100%;
  height: 3rem;
  padding: 0.2rem;
  margin-top: 0.4rem;
  display: flex;
  justify-content: space-between;
  .contentLeft {
    width: 36%;
    height: 2.6rem;
    position: relative;

    img {
      width: 2.6rem;
      height: 2.6rem;
      border-radius: 0.2rem;
      position: absolute;
      z-index: -1;
    }
    .palyCount {
      position: absolute;
      right: 0.1rem;
      margin-top: 0.1rem;
      
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        margin-top: -0.02rem;
        vertical-align: middle;
      }
      span {
        font-size: 0.3rem;
        font-style:oblique;
        color: #fff;
      }
    }
  }
  .contentRight {
    width: 60%;
    height: 2.6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .rightP_one {
      font-size: 0.3rem;
      font-weight: 900;
      color: #fff;
      font-family: "微软雅黑";
    }
    .right_img {
      width: 100%;
      height: 0.6rem;
      line-height: 0.6rem;
      color: #ccc;
      img {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        vertical-align: middle;
      }
      span {
        margin-left: 0.1rem;
      }
      .icon {
        width: 0.26rem;
        height: 0.26rem;
        margin-top: -0.08rem;
        vertical-align: middle;
      }
    }
    .rightP_two {
      width: 100%;
      height: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        display: inline-block;
        width: 95%;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 0.24rem;
        color: #ccc;
      }
      .icon {
        width: 0.24rem;
        height: 0.24rem;
      }
    }
  }
}
//页面操作图标样式
.itemTopFooter{
  width: 100%;
  height: 1.4rem;
  display: flex;
  justify-content: space-around;
  margin-top: .2rem;
  .footerItem{
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    .icon{
      fill: #f0f0f0;
    }
    span{
      margin-top: .1rem;
    }
  }

}
</style>