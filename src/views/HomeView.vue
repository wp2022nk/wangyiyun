<!-- 主页面 -->
<template>
  <TopNav/>
  <Swpier/>
  <iconList/>
  <MusicList/>
</template>

<script>
// @ is an alias to /src

import TopNav from '@/components/home/TopNav.vue'
import Swpier from '@/components/home/Swpier.vue'
import iconList from '@/components/home/iconList.vue';//
import MusicList from '@/components/home/MusicList.vue';//歌单列表
export default {
  name: 'HomeView',
  components: {
   TopNav,
   Swpier,
   iconList,
   MusicList,
  }
}

</script>
