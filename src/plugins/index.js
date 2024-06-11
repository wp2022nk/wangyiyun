//引入网易云组件(按需引用)
import { Swipe, SwipeItem, Button, Popup, Slider, NoticeBar, Dialog, Tab, Tabs, Notify, Switch, Cell, CellGroup, Tabbar, TabbarItem } from 'vant';
//放入数组中
let plugins = [Swipe, SwipeItem, Button, Popup, Slider, NoticeBar, Dialog, Tab, Tabs, Notify, Switch, Cell, CellGroup, Tabbar, TabbarItem]
export default function getVant(app){
    plugins.forEach((item)=>{
        return app.use(item)
    })
}