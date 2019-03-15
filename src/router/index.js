import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import iView from 'iview'
import 'iView/dist/styles/iview.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import HelloWorld from '@/components/workflow-engine/HelloWorld'
import Index from '@/components/original/Index'
import Reader from '@/components/original/Reader'
import Manager from '@/components/original/Manager'
import RegIndex from '@/components/workflow-engine/RegIndex'
import defaultView from '@/components/workflow-engine/DefaultView'
import goJs from '@/components/workflow-engine/Gojs'

Vue.use(Router)
Vue.use(VueResource)
Vue.use(iView)
// Vue.use(VueQuillEditor,{default global options})
Vue.use(VueQuillEditor)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/reader',
      component: Reader
    },
    {
      path: '/manager',
      component: Manager
    },
    {
      path: '/regindex',
      component: RegIndex
    },
    {
      path: '/default',
      component: defaultView
    },
    {
      path: '/go',
      component: goJs
    }
  ]
})
