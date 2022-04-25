import { Button, Card, Field, CellGroup, Slider } from 'vant';
import Vue3Autocounter from 'vue3-autocounter';
import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
.use(Button)
.use(Card)
.use(Field)
.use(CellGroup)
.use(Slider)
.component('Vue3Autocounter', Vue3Autocounter)
.mount('#app')
