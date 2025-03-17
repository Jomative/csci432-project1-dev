import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '@/views/SignIn.vue'
import Main from '@/views/Main.vue'
import Join from '@/views/Join.vue'
import Home2 from '@/views/Home2.vue'
import Feed from '@/views/Feed.vue'
import Search from '@/views/Search.vue'
import Menu from '@/views/Menu.vue'
import Settings from '@/views/settings/Settings.vue'
import Subscriptions from '@/views/settings/Subscriptions.vue'
import Account from '@/views/settings/Account.vue'
import Profile from '@/views/Profile.vue'
import MsgCont from '@/views/msgCont.vue'
import PrivateMessages from '@/views/PrivateMessages.vue'
import UserList from '@/views/UserList.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user/:userId',
      components: {
        leftSidebar: Menu,
        focus: PrivateMessages,
      },
      props: true
    },
    
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
      name: 'main',
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
              components: {
                leftSidebar: Menu,
                focus: MsgCont,
                rightSidebar: Search
              }
            },
            {
              path: 'settings',
              components: {
                leftSidebar: Menu,
                focus: Settings
              }
            },
            {
              path: 'settings/account',
              components: {
                leftSidebar: Menu,
                focus: Settings,
                rightSidebar: Account
              }
            },
            {
              path: 'settings/account/subscriptions',
              components: {
                leftSidebar: Menu,
                focus: Settings,
                rightSidebar: Subscriptions
              }
            },
            {
              path: 'profile',
              components: {
                leftSidebar: Menu,
                focus: Profile
              }
            }
          ]
          // i can send screenshots hmm, yes i do have tailscale lol
          // yeah just remove and readd, ok it disappeared haha, no just type the port number
          // interesting it just doesn't want to load, hmm, do you still have tailscale?
        }
      ]
    },
    {
      path: '/home2',
      name: 'home2',
      component: Home2,
      children: [
        {
          path: '',
          components: {
            leftSidebar: Menu,
            focus: Feed,
            rightSidebar: Search
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
        }
      ]
    }
  ],
})

export default router
