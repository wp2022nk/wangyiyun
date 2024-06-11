<!-- 主页面轮播图 父级组件为"wangyiyun-app\src\views\HomeView.vue"-->
<template>
    <div id="swiperTop">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in state.images" :key="image">
                <img :src="image.pic" />
            </van-swipe-item>
        </van-swipe>
    </div>
   
</template>
<script>
import { reactive,onMounted } from 'vue';
import { getBanner } from '@/request/api/home';
export default {
  setup() {
    const state =reactive({
        images:[
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    ]});
    onMounted(async()=>{
        // axios.get(' ').then((res)=>{
        //     console.log(res)
        //     state.images=res.data.banners
        //     console.log(state.images)
        // })
        let res=await getBanner();
        state.images=res.data.banners
        console.log(res);
    })
    return { state };
  },
};


</script>
<style lang="less" >
#swiperTop{
    .van-swipe{
    width: 100%;
    padding: 10px;
    
        .van-swipe-item{
            padding: 0 0.2rem;
            img{
                width: 94%;
                height: 3rem;
                border-radius: 0.2rem;
            }
        }
        .van-swipe__indicator--active{
            background-color: rgb(219, 130, 130);
        }
    

}
}
</style>