<!-- 主页面顶部导航 父级组件为"wangyiyun-app\src\views\HomeView.vue"-->
<template>
    <div class="topNav">
        <div class="topleft">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao1"></use>
            </svg>
        </div>
        
        <div class="topContent">
           <span @click="$router.push('/userInfo')">我的</span>
           <span class="active">发现</span>
           <span>云村</span>
           <span>视频</span>
        </div>
        <div class="topright" @click="$router.push('/search')">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
        
    </div>
</template>
<style lang="less" scoped>
    .topNav{
        width:100% ;
        padding: .2rem;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .topContent{
            width: 65%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-size: .36rem;
            .active{
                font-weight: 900;
            }
        }
    }
    
    
</style>
