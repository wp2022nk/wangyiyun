<!-- 搜索界面 -->
<template>
  <div class="searchView">
    <div class="searchHeader">
      <div class="back_btn" @click="$router.go(-1)">
        <svg aria-hidden="true" class="icon_back">
          <use xlink:href="#icon-btn-right"></use>
        </svg>
      </div>
      <div class="keyword" >
        <div class="searchIcon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-sousuo"></use>
          </svg>
        </div>
        <input
          type="text"
          name=""
          id=""
          autofocus
          class="kword"
          :placeholder="searchDefault"
          v-model="keyword"
          ref="keyword"
        />
      </div>
      <div class="search_btn" @click="showPopup">搜索</div>
    </div>

    <div class="searchOther">
      <div class="searchHistory">
        <div class="searchHistoryHeader">
          <h3>历史</h3>
          <div
            class="deleteHistory"
            @click="deleteHistory"
            v-show="searchHistory.length != 0"
          >
            <svg class="delete_icon" aria-hidden="true">
              <use xlink:href="#icon-shanchu"></use>
            </svg>
          </div>
        </div>
        <div class="searchHistoryContent">
          <span v-for="key in searchHistory" :key="key" @click="changKeyword(key)">{{
            key.substr(0,8)
          }}</span>
          <span v-show="searchHistory.length == 0">你还没有任何搜索记录哦</span>
          <!-- 显示更多搜索记录，这个先暂时不写 -->
          <!-- <span class="moreHistory" v-show="searchHistory.length != 0">
            <svg aria-hidden="true" class="icon_more">
              <use xlink:href="#icon-xiajiantou"></use>
            </svg>
          </span> -->
        </div>
      </div>
      <div class="searchRecommend">
        <div class="searchRecommendHeader">
          <h3>推荐</h3>
          <div class="refreshRecommend">
            <svg class="refresh_icon" aria-hidden="true">
              <use xlink:href="#icon-shuaxin"></use>
            </svg>
          </div>
        </div>
        <div class="searchRecommendContent">
          <span v-for="item in suggestSinger" :key="item" @click="changKeyword(item)">{{item}}</span>
        </div>
      </div>

      <div class="rankContent">
        <van-swipe
          :loop="false"
          :show-indicators="false"
          :width="rankItemWidth"
        >
          <van-swipe-item class="rankItem">
            <div class="itemContent">
              <div class="rankItemHeader">
                <div class="left">热搜榜</div>
                <div class="right">播放</div>
              </div>
              <div class="rankItemList">
                <ul class="rankItemListContent">
                  <li
                    v-for="(searchHot, index) in searchHotList"
                    :key="searchHot.searchWord"
                    @click="changKeyword(searchHot.searchWord)"
                  >
                    <span class="num">{{ index + 1 }}</span>
                    <div class="content">
                      <h4>{{ searchHot.searchWord }}</h4>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </van-swipe-item>

          <van-swipe-item class="rankItem">
            <div class="itemContent">
              <div class="rankItemHeader">
                <div class="left">热搜榜</div>
                <div class="right">播放</div>
              </div>
              <div class="rankItemList">
                <ul class="rankItemListContent">
                  <li
                    v-for="(searchHot, index) in searchHotList"
                    :key="searchHot.searchWord"
                    @click="changKeyword(searchHot.searchWord)"
                  >
                    <span class="num">{{ index + 1 }}</span>
                    <div class="content">
                      <h4>{{ searchHot.searchWord }}</h4>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <van-popup
      v-model:show="show"
      closeable
      close-icon-position="top-left"
      close-icon="arrow-left"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <SearchResult :keyword="passkeyword" v-if="show" />
    </van-popup>

    <ul
      class="similarWords"
      v-show="searchSuggestList && searchSuggestList.length != 0"
    >
      <li
        class="keyword_item"
        v-for="suggest in searchSuggestList"
        :key="suggest.keyword"
        @click="changKeyword(suggest.keyword)"
      >
        <div class="search_icon">
          <svg aria-hidden="true" class="icon_back">
            <use xlink:href="#icon-sousuo"></use>
          </svg>
        </div>
        <div class="suggest_word">
          {{ suggest.keyword }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  getSearchHot,
  getSearchSuggest,
  getSearchDefault
} from "@/request/api/search";
import SearchResult from "@/components/search/SearchResult";

export default {
  name: "SearchView",
  components: { SearchResult },
  data() {
    return {
      searchDefault:"",
      searchHotList: [],
      hotTopic: [],
      searchHistory: [],
      searchSuggestList: [],
      keyword: "",
      passkeyword: "",
      suggestTimer: 0,
      show: false,
      suggestSinger:['周杰伦','康姆士','李荣浩','林俊杰']
    };
  },
  computed: {
    rankItemWidth() {
      return this.getHtmlFontSize() * 5;
    },
  },
  mounted() {
    getSearchDefault().then(
      (res) => {
        this.searchDefault = res.data.data.showKeyword;
      },
      (err) => console.log(err.message)
    );

    getSearchHot().then(
      (res) => {
        this.searchHotList = res.data.data;
      },
      (err) => console.log(err.message)
    );

    let localHistory = window.localStorage.getItem("searchHistory");
    if (localHistory) {
      this.searchHistory = JSON.parse(localHistory);
    }
  },
  methods: {
    changKeyword(value){
        this.keyword = value
        this.showPopup()
    },
    showPopup() {
      if (this.keyword == "") {
        this.passkeyword = this.$refs.keyword.placeholder;
        console.log(this.keyword);
      } else {
        this.passkeyword = this.keyword;
      }
      this.show = true;
      this.keyword = "";
      this.updateSearchHistory(this.passkeyword);
    },
    getHtmlFontSize() {
      let htmlFontSize = getComputedStyle(window.document.documentElement)[
        "font-size"
      ];
      //以上方法返回的font-size会带单位px，如果不想要px可以做一下处理
      return +htmlFontSize.slice(0, htmlFontSize.indexOf("px"));
    },
    updateSearchHistory(keyword) {
      // console.log(this.searchHistory.indexOf(keyword));
      if (this.searchHistory.indexOf(keyword) == -1) {
        if (this.searchHistory.length == 3) {
          this.searchHistory.pop();
        }

        this.searchHistory.unshift(keyword);
        window.localStorage.setItem(
          "searchHistory",
          JSON.stringify(this.searchHistory)
        );
      }
    },
    deleteHistory() {
      console.log("delete");
      // this.$notify('提示文案');
      this.$dialog
        .confirm({
          title: "QAQ",
          message: "确定要删除搜搜索记录🐎？？",
        })
        .then(() => {
          this.searchHistory = [];
          localStorage.removeItem("searchHistory");
        })
        .catch(() => {
          return;
        });
    },
  },

  watch: {
    // 防抖
    keyword(keyword) {
      //   console.log(keyword);
      clearTimeout(this.suggestTimer);
      if (keyword == "") {
        // console.log('空了。。。')
        this.searchSuggestList = [];
      } else {
        this.suggestTimer = setTimeout(async () => {
          const res = await getSearchSuggest(keyword);
          this.searchSuggestList = res.data.result.allMatch;
        }, 500);
      }
    },
  },
};
</script>

<style lang="less">
.van-popup__close-icon {
  color: #fff;
}
.searchView {
  width:100%;
  height: 100vh;
  position: relative;
  z-index: 7;
  .searchHeader {
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
    .back_btn {
      width: 0.4rem;
      height: 0.4rem;
      flex: 1;
      transform: rotate(-270deg);
      .icon_back {
        width: 100%;
        height: 100%;
        fill: #fff;
      }
    }
    .search_btn {
      margin-right: 0.3rem;
      color: #fff;
      font-weight: 400;
    }
    .keyword {
      height: 60%;
      flex: 9;
      padding: 0 0.2rem;
      position: relative;
      .searchIcon {
        width: 0.3rem;
        height: 0.3rem;
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
    color: #d4b1af;
    font-size: 0.27rem;
    font-weight: 400;
  }

  .searchOther {
    position: relative;
    background-color: #f7f7f7;
    z-index: -1;
    .searchHistory,
    .searchRecommend {
      margin-top: 1rem;
      padding: 0.2rem 0.2rem;
      position: relative;
      .searchHistoryHeader,
      .searchRecommendHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .refreshRecommend,
        .deleteHistory {
          width: 0.4rem;
          height: 0.4rem;
          svg {
            height: 100%;
            width: 100%;
            fill: #7f7f80;
          }
        }
      }
      .searchHistoryContent,
      .searchRecommendContent {
        padding: 0.2rem 0;

        span {
          margin-right: 0.2rem;
          border-radius: 0.3rem;
          background-color: #fefefe;
          color: #7f7f80;
          padding: 0.15rem 0.2rem;
        }
        .moreHistory {
          padding: 0.15rem 0.15rem;
          .icon_more {
            width: 0.3rem;
            height: 0.3rem;
            transform: translateY(20%);
          }
        }
      }
    }
    .searchRecommend {
      margin-top: 0;
    }
    .rankContent {
      width: 100%;
      margin-bottom: 1rem;
      position: relative;
      z-index: 3;

      .van-swipe {
        // height: 100%;

        .rankItem {
          .itemContent {
            width: 97%;
            background-color: #fefefe;
            // margin: 0.2rem 0.2rem;
            border-radius: 0.3rem;
            padding: 0.2rem 0.2rem;
            .rankItemHeader {
              width: 100%;
              height: 0.4rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .left {
                font-weight: 500;
              }
              .right {
                border: 0.02rem solid #7f7f80;
                border-radius: 0.5rem;
                padding: 0.05rem 0.1rem;
                font-size: 0.2rem;
              }
            }
            .rankItemList {
              .rankItemListContent {
                li:nth-child(-n + 3) span {
                  color: #d8402f;
                }
                li {
                  width: 100%;
                  height: 1rem;
                  display: flex;
                  align-items: center;
                  .num {
                    // flex: 1;
                    padding: 0 0.2rem;
                  }

                  .content {
                    h4 {
                      font-weight: 400;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .similarWords {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #f7f7f7;
    .keyword_item {
      padding: 0 0.2rem;
      width: 100%;
      height: 0.8rem;
      display: flex;
      align-items: center;
      .search_icon {
        width: 0.4rem;
        height: 0.4rem;
        svg {
          width: 100%;
          height: 100%;
          fill: #7f7f80;
        }
      }
      .suggest_word {
        width: 100%;
        height: 70%;
        margin-left: 0.2rem;
        border-bottom: 1px solid #d4d4d4;
      }
    }
  }
}
</style>