import { createApp } from 'vue'
import App from './App.vue'

import './assets/css/bootstrap.css'
import './index.css'

// 1.导入axios
import axios from 'axios'

const app = createApp(App)

// 2.将axios挂载到全局，今后，每个组件中，都可以直接通过this.$http代替axios发起Ajax请求
app.config.globalProperties.$http = axios
    // 3.配置请求的根路径
axios.defaults.baseURL = 'https://www.escook.cn'

app.mount('#app')