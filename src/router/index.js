import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '@/views/SignIn.vue'
import Main from '@/views/Main.vue'
import Join from '@/views/Join.vue'
import Home2 from '@/views/Home2.vue'
import Feed from '@/views/Feed.vue'
import Menu from '@/views/Menu.vue'
import Settings from '@/views/settings/Settings.vue'
import Subscriptions from '@/views/settings/Subscriptions.vue'
import Account from '@/views/settings/Account.vue'
import Profile from '@/views/Profile.vue'
import MsgCont from '@/views/msgCont.vue'
import PrivateMessages from '@/views/PrivateMessages.vue'
import UserList from '@/views/UserList.vue'
import PostMsgCont from '@/views/PostMsgCont.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [    
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        authRequired: false
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
      meta:{
        authRequired: false
      }
    },
    {
      path: '/join',
      name: 'join',
      component: Join,
      meta:{
        authRequired: false
      }
    },
    {
      path: '/main',
      component: Main,
      children: [
        {
          path: '',
          components: {
            mainHomeCont: Home2
          },
          children: [
            {
              path: '',
              name: 'main', //name determines which configuration/page it actually loads 
              components: {
                leftSidebar: Menu,
                focus: MsgCont,
                rightSidebar: PostMsgCont
              },
              meta:{
                authRequired: true
              }
            },
            {
              path: '/settings',
              components: {
                leftSidebar: Menu,
                focus: Settings
              },
              meta:{
                authRequired: true
              }
            },
            {
              path: '/settings/account',
              components: {
                leftSidebar: Menu,
                focus: Settings,
                rightSidebar: Account
              },
              meta:{
                authRequired: true
              }
            },
            {
              path: '/settings/account/subscriptions',
              components: {
                leftSidebar: Menu,
                focus: Settings,
                rightSidebar: Subscriptions
              },
              meta:{
                authRequired: true
              }
            },
            {
              path: '/profile',
              name:"profile",
              components: {
                leftSidebar: Menu,
                focus: Profile
              },
              meta:{
                authRequired: true
              }
            },
            {
              path: '/usersearch',
              components: {
                leftSidebar: Menu,
                focus: UserList
              },
              meta:{
                authRequired: true
              }
            },
            {
              path: '/user/:userId',
              components: {
                leftSidebar: Menu,
                focus: UserList,
                rightSidebar: PrivateMessages
              },
              props: true,
              meta:{
                authRequired: true
              }
            }
          ]
        }
      ]
    }
  ],
})

router.beforeEach((to, from)=>{

  if(to.matched.length == 0){
    if(localStorage.getItem("token")){ //put them just to main if they're already logged in when trying to access a non-existing page
      return "/main";
    }
    return "/";
  }

  if(to.meta.authRequired){
    if(localStorage.getItem("token")) return;
    return "/";
  }
  
})
export default router
