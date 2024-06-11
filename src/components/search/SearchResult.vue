<template>
  <div class="searchResult">
    <div class="searchResultHeader">
      <div class="keyword">
        <div class="searchIcon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-sousuo"></use>
          </svg>
        </div>
        <input
          type="text"
          name=""
          id=""
          class="kword"
          placeholder="周杰伦"
          v-model="keyword"
        />
        <div class="clearIcon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-closefill"></use>
          </svg>
        </div>
      </div>
    </div>
    <!-- :before-change="beforeChange" -->
    <van-tabs v-model:active="active">
      <van-tab title="综合">
        <div class="musicListContent">
          <div class="header">
            <h2>单曲</h2>

            <h3>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang2"></use></svg
              >播放
            </h3>
          </div>
          <ul class="main_list">
            <li
              v-for="(music,index) in searchResultList.result"
              :key="music.id"
              class="music_list_item"
              @click="
                playMusic(music)
                
              "
            >
              <div class="music_info">
                <h3>{{ music.name }}</h3>
                <h5>
                  <span v-show="music.fee == '1'" class="vip">vip</span>

                  <span
                    v-show="music.privilege.maxBrLevel === 'lossless'"
                    class="sq"
                    >SQ</span
                  >
                  <span
                    v-show="music.privilege.maxBrLevel === 'hires'"
                    class="sq"
                    >Hi-res</span
                  >
                  <i v-for="ar in music.ar" :key="ar.id">{{ ar.name }}</i
                  ><i class="alname">{{ " - " + music.al.name }}</i>
                </h5>
              </div>

              <div class="music_op">
                <div class="showMv">
                  <svg aria-hidden="true" class="music_op_icon">
                    <use xlink:href="#icon-shipin"></use>
                  </svg>
                </div>
                <div class="showList">
                  <svg aria-hidden="true" class="music_op_icon">
                    <use xlink:href="#icon-gengduo-shuxiang"></use>
                  </svg>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </van-tab>
      <van-tab title="单曲"> 内容 </van-tab>
      <van-tab title="歌单"> 内容 </van-tab>
      <van-tab title="视频"> 内容 </van-tab>
      <van-tab title="歌手"> 内容 </van-tab>
      <van-tab title="播客"> 内容 </van-tab>
    </van-tabs>
  </div>
  <!-- <h1>  {{keyword}}</h1>
    <h1>  {{props}}</h1> -->
  <!-- <h1>  {{searchResultList.result}}</h1> -->
    
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { onBeforeMount, onMounted, onUpdated } from "vue";
import { getSearchResult } from "@/request/api/search";
import { useStore } from "vuex";
import FooterMusic from '@/components/item/FooterMusic.vue'
import { computed } from 'vue';
let keyword = ref("");
let props = defineProps(["keyword"]);
if (props.keyword) {
  keyword = props.keyword;
}
const store = useStore()
const playListIndex = computed(() => store.state.playListIndex);
const playList = computed(() => store.state.playList);
let searchResultList = reactive({
  result: [],
});
function getResult(keyword) {
  getSearchResult(keyword)
    .then((res) => {
      searchResultList.result = res.data.result.songs;
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

onMounted(() => {
  console.log(1);
  getResult(keyword);
});

const active = ref(0);

function playMusic(music) {
    console.log(music);
    console.log(this.playListIndex);
    // 检查音乐是否已存在于播放列表中
    const existingIndex = this.playList.indexOf(music);
    console.log(existingIndex)
    if (existingIndex!=-1) {
        // 如果音乐已存在，先删除旧条目
        this.playList.splice(existingIndex, 1);
    }
    const playListIndex = Math.min(this.playListIndex, this.playList.length - 1);

    // 使用 splice 方法在 playListIndex 后面插入音乐
   
    this.playList.splice(playListIndex + 1, 0, music);
    
    // 更新 playListIndex，如果需要的话（例如，如果你想立即播放这首新音乐）
    store.commit('updatePlayListIndex', playListIndex + 1);

    // 提交 mutation 来更新整个 playList（如果需要的话，取决于你的应用逻辑）
    store.commit('updatePlayList', this.playList);
    
}
components:{
    FooterMusic
}


</script>

<style lang="less">

.searchResult {
  background-color: #f2f2f2;
  .searchResultHeader {
    width: 100%;
    height: 1rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    background-color: #d8402f;
    display: flex;
    // justify-content: space-between;
    align-items: center;

    .keyword {
      height: 60%;
      flex: 9;
      padding: 0 0.2rem;
      position: relative;
      margin-left: 0.7rem;
      .searchIcon {
        width: 0.35rem;
        height: 0.35rem;
        position: absolute;
        fill: #e8b9b6;
        top: 50%;
        left: 0.4rem;
        transform: translateY(-50%);
        .icon {
          width: 100%;
          height: 100%;
        }
      }

      .clearIcon {
        width: 0.1rem;
        height: 0.1rem;
        position: absolute;
        right: 0.7rem;
        top: 35%;
        transform: translateY(-150%);
        svg {
          fill: rgba(21, 21, 21, 0.3);
        }
      }
      input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        padding: 0.2rem 0.2rem;
        padding-left: 0.7rem;
        font-size: 0.3rem;
        border-radius: 0.4rem;
        background-color: rgba(255, 255, 255, 0.2);
        color: #fff;
      }
    }
  }
  input::-webkit-input-placeholder {
    color: #e8b9b6;
  }
  .van-tabs {
    margin-top: 0.8rem;
    .van-tabs__wrap {
      .van-tabs__nav {
        background-color: #d8402f;
        .van-tab {
          span {
            color: #f3dad7;
          }
        }
        .van-tab--active {
          span {
            color: #fefefe;
          }
        }
        .van-tabs__line {
          background-color: rgba(232, 232, 232, 0.3);
          height: 0.16rem;
          width: 0.65rem;
          bottom: 0.5rem;
        }
      }
    }
  }

  // musicList

  .musicListContent {
    margin: 0.2rem auto;
    width: 90%;
    background: #fff;
    border-radius: 0.2rem;
    padding: 0 0.2rem;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 1rem;
      padding: 0 0.2rem;
      border-bottom: 1px solid #e6e6e6;
      h2 {
        font-weight: 500;
        color: #333334;
      }
      h3 {
        font-size: 0.2rem;
        font-weight: 400;
        border: 1px solid #b4b4b4;
        border-radius: 0.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.05rem 0.1rem;
        svg {
          width: 0.2rem;
          height: 0.2rem;
        }
      }
    }
  }

  .musicListContent .main_list {
    width: 100%;
    margin-bottom: 1rem;
  }

  .music_list_item {
    padding: 0.4rem 0.2rem;
    height: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
  }

  .music_list_item .music_info {
    font-size: 0.5rem;
    color: gray;
    flex: 7.5;
    flex-direction: column;
    justify-content: space-around;
    .vip,
    .sq {
      display: inline-block;
      color: #ed3131;
      font-size: 0.2rem;
      border: 0.01rem solid;
      padding: 0 0.05rem;
      margin: 0;
      line-height: 0.22rem;
      height: 0.22rem;
      box-sizing: border-box;
      font-weight: 400;
      border-radius: 0.05rem;
      border-color: #f12929;
      margin: 0.05rem;
    }
  }

  .music_list_item .music_info h3 {
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.3rem;
    color: #333334;
    font-weight: 500;
    width: 100%;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    line-clamp: 2;
    -webkit-line-clamp: 1;
  }

  .music_list_item .music_info h5 {
    height: 0.3rem;
    //   line-height: 0.5rem;
    font-size: 0.2rem;
    color: rgb(137, 137, 137);
    font-weight: 500;

    width: 100%;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    line-clamp: 2;
    -webkit-line-clamp: 1;
    //   padding-right: .2rem;

    i {
      font-style: normal;
    }
  }

  .music_list_item .music_op {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transform: translateY(-15%);
  }

  .music_op_icon {
    width: 0.3rem;
    height: 0.3rem;
    fill: gray;
  }
}
</style>