import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import router from './router';
import store from './store';
import { abi,contrato,web3js,web } from "./web3"


const app=createApp(App);
app.provide('abi',abi);
app.provide('contrato',contrato);
app.provide('web3js',web3js);
app.provide('web',web);
app.use(router);

app.use(store);
app.mount('#app');
