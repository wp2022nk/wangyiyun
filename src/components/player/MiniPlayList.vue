<template>
  <div class="miniPlayList">
    <div
      class="mask"
      @click.self="store.commit('updateShowMiniPlayList', false)"
    >
      <div class="pannel">
        <div class="header">
          <h4>当前播放</h4>
          <span>(12)</span>
        </div>
        <div class="middle">
          <div class="playModel">
            <svg aria-hidden="true">
              <use xlink:href="#icon-xunhuan-copy"></use></svg
            ><span>列表循环</span>
          </div>
          <div class="opPannel">
            <svg aria-hidden="true">
              <use xlink:href="#icon-w_xiazai"></use>
            </svg>
            <svg aria-hidden="true">
              <use xlink:href="#icon-tianjiadaozuhe"></use>
            </svg>
            <svg aria-hidden="true">
              <use xlink:href="#icon-shanchu"></use>
            </svg>
          </div>
        </div>
        <div class="content">
          <div
            class="songItem"
            v-for="(song, index) in store.state.playList"
            @click="store.commit('updatePlayListIndex', index)"
            :key="index"
          >
            <div :class="{'song active':store.state.playListIndex == index,'song':store.state.playListIndex != index}">
            <svg aria-hidden="true" v-show="store.state.playListIndex == index">
              <use xlink:href="#icon-paihangbang"></use>
            </svg>
              <h4>{{ song.name }}</h4>
              <h5>- {{ song.ar[0].name }}</h5>
            </div>
            <div class="delete" @click="deleteMusic(index)">+</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from 'vue';
let store = useStore()
const playListIndex = computed(() => store.state.playListIndex);
const playList = computed(() => store.state.playList);
function deleteMusic(index){

  // 确保传入的 index 是一个有效的索引
  if (index >= 0 && index < this.playList.length) {
    // 使用 splice 方法删除指定索引处的音乐
    this.playList.splice(index, 1);

    // 提交 mutation 来更新整个 playList
    store.commit('updatePlayList', this.playList);
    store.commit('updatePlayListIndex', Math.max(0, this.playListIndex));
    // 如果删除的是当前播放的歌曲，更新 playListIndex
    if (index === this.playListIndex) {
      // 如果播放列表不为空，更新索引为前一个歌曲；否则，停止播放
      const newPlayListIndex = Math.max(0, this.playListIndex - 1);
      store.commit('updatePlayListIndex', newPlayListIndex < this.playList.length ? newPlayListIndex : null);
    }
  } else {
    // 如果索引无效，可以输出一个错误消息或进行其他错误处理
    console.error('提供的索引无效，无法删除歌曲。');
  }
}

</script>

<style lang="less" scoped>
.miniPlayList {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 20;
  .mask {
    width: 100vw;
    height: 100vh;
    // background-color: rgba(0, 0, 0, 0.07);
    .pannel {
      height: 8rem;
      width: 90%;
      background-color: #fff;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0.4rem;

      border-radius: 0.4rem;
      padding: 0.3rem;
      box-shadow: 2px 2px .2rem rgba(0, 0, 0, 0.4);
      .header {
        display: flex;
        align-items: baseline;
        span {
          font-size: 0.2rem;
          color: rgb(74, 74, 74);
        }
      }
      .middle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.1rem 0;
        .playModel {
          width: 3rem;
          display: flex;
          align-items: center;
          flex: 5;
          svg {
            width: 0.4rem;
            height: 0.4rem;
            fill: rgb(74, 74, 74);
          }
        }
        .opPannel {
          display: flex;
          flex: 3;
          justify-content: space-around;
          svg {
            width: 0.4rem;
            height: 0.4rem;
            fill: rgb(74, 74, 74);
          }
        }
      }
      .content {
        height: 6.4rem;
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        .songItem {
          width: 100%;
          height: 0.8rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .song {
            display: flex;
            align-items: center;
            flex: 6;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            h4 {
              font-weight: 400;
              color: #434344;
              font-size: 0.3rem;
            }
            h5 {
              font-weight: 400;
              font-size: 0.2rem;
              color: #959595;
            }
            svg{
              width: .3rem;
              height: .3rem;
              margin:0 .1rem;
            }
          }

          .active {
            h4,
            h5 {
              color: #df1b05;
            }
          }

          .delete {
            flex: 2s;
            padding-right: 0.2rem;

            width: 0.4rem;
            height: 0.4rem;
            font-size: 0.4rem;
            transform: rotate(45deg);
            color: #959595;
            font-weight: 200;
          }
        }
      }
    }
  }
}
</style>