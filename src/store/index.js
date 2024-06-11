import { tabProps } from 'vant';
import { createStore } from 'vuex'
import {getMusicLyric} from "@/request/api/item"
import { getPhoneLogin } from '@/request/api/login'
import { reactive } from 'vue'
export default createStore({
  state: {
    playList: [{ //播放列表
      al: {
        id: 89039055,
        name: "雨爱抖音版",
        pic: 109951164966568500,
        picUrl: "https://p1.music.126.net/2f6UgY8Jc0Dy6jufMdIZeQ==/109951164966568495.jpg",
        pic_str: "109951164966568495"
      },
      id: 1446137141,
      name: "雨爱（抖音版）",
      ar:[{name: "灏灏灏仔"}]
    }],
    playListIndex:0,//默认下标
    isbtnShow:true,//暂停按钮显示
    detailShow:false,//歌曲详情页展示
    lyricList:{},//歌词
    currentTime:0,//当前时间
    duration:0,//歌曲总时长
    isLogin: false,//是否登录
    token: "",
    showMiniPlayList: false,//展示小列表
  },
  getters: {
  },
  mutations: {
    //播放与暂停的切换
    updateISbtnShow:function(state,value){
      state.isbtnShow=value
      
    },
    // 更改歌曲列表
    updatePlayList:function(state,value){
      state.playList=value
      console.log(state.playList);

    },
    //更改歌曲
    updatePlayListIndex:function(state,value){
      state.playListIndex=value
    },
  
    //是否弹出详情页
    updatedetailShow:function(state){
      state.detailShow=!state.detailShow
    },
    //更改歌词
    updateLyricList:function(state,value){
      state.lyricList=value
    },
    //改变当前时间
    updateCurrentTime:function(state,value){
    
      state.currentTime=value
      // console.log(state.currentTime)
    },
    //更新歌曲总时长
    updateDuration:function(state,value){
      state.duration=value
    },
    updateIsLogin(state, value) {
            state.isLogin = value
    },
    updateToken(state, value) {
            state.token = value
            localStorage.setItem('token', value)
    },
    updateShowMiniPlayList(state, vlaue) {
            state.showMiniPlayList = vlaue
    },
    updateIsLogin(state, value) {
            state.isLogin = value
    },
    updateToken(state, value) {
            state.token = value
            localStorage.setItem('token', value)
    },
  },
  actions: {
    //获取歌词
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value)
      console.log(res);
      context.commit("updateLyricList",res.data.lrc)
    },
    getLogin:async function  (context, data) {
            let result = {}
            let resdata = {}
            await getPhoneLogin(data).then(res => {
                    // console.log(res.data)
                    result = res.data
                })
                .catch(err => {
                    // console.log(err.response)
                    result = err.response.data
                })
                // console.log(res)
            return result

        }
  },
  modules: {
  }
})
