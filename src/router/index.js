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
      component: Home
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/join',
      name: 'join',
      component: Join
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
              }
            },
            {
              path: '/settings',
              components: {
                leftSidebar: Menu,
                focus: Settings
              }
            },
            {
              path: '/settings/account',
              components: {
                leftSidebar: Menu,
                focus: Settings,
                rightSidebar: Account
              }
            },
            {
              path: '/settings/account/subscriptions',
              components: {
                leftSidebar: Menu,
                focus: Settings,
                rightSidebar: Subscriptions
              }
            },
            {
              path: '/profile',
              components: {
                leftSidebar: Menu,
                focus: Profile
              }
            },
            {
              path: '/usersearch',
              components: {
                leftSidebar: Menu,
                focus: UserList
              }
            },
            {
              path: '/user/:userId',
              components: {
                leftSidebar: Menu,
                focus: UserList,
                rightSidebar: PrivateMessages
              },
              props: true
            }
          ]
        }
      ]
    }
  ],
})

export default router
