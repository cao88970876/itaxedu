import myAccount from './personal-center/myAccount'
import myCourse from './personal-center/myCourse'
import myStudy from './personal-center/myStudy'
import myCollection from './personal-center/myCollection'
import myDelivery from './myDelivery'
import task from './rewardTaks'
import myRecruitmentTask from './myRecruitmentTask'
import myResume from './myResume'
import myAnswer from './myAnswer'
import myManagement from './myManagement'
import myOrder from './myOrder'
import makeMoney from './makeMoney'
import myProject from './myProject'
import experPut from './experPut'

export default [
    {
        path: '',
        name: 'navPage',
        component: () => import('../views/user/nav-page'),
        children: [
            task,
            myAccount,
            myDelivery,
            myStudy,
            myCollection,
            myRecruitmentTask,
            myAnswer,
            myResume,
            myCourse,
            myManagement,
            myOrder,
            makeMoney,
            myProject,
            experPut,
            {
                path: 'myFocus',
                name: 'myFocus',
                meta: {
                    title: '我的关注'
                },
                component: () => import('../views/user/my-focus'),
            }, {
                path: 'personalCenter/userInform',
                name: 'userInform',
                meta: {
                    title: '个人信息'
                },
                component: () => import('../views/user/personalCenter/userInform'),
            }, {
                path: 'personalCenter/changePass',
                name: 'changePass',
                meta: {
                    title: '修改密码'
                },
                component: () => import('../views/user/personalCenter/changePass'),
            }, {
                path: 'personalCenter/changeUser',
                name: 'changeUser',
                meta: {
                    title: '修改个人信息'
                },
                component: () => import('../views/user/personalCenter/changeUser'),
            }, {
                path: 'personalCenter/prove',
                name: 'prove',
                meta: {
                    title: '个人中心-生成证明'
                },
                component: () => import('../views/user/personalCenter/prove'),
            },
            {
                path: 'personalCenter/game',
                name: 'game',
                meta: {
                    title: '大转盘游戏'
                },
                component: () => import('../views/user/personalCenter/game'),
            },
            {
                path: 'personalCenter/authentication',
                name: 'authentication',
                meta: {
                    title: '资料认证'
                },
                component: () => import('../views/user/personalCenter/authentication'),
            },
        ]
    },
    {
        path: 'myVideoCourse/:courseId/:tabId',
        name: 'myVideoCourse',
        meta: {
            title: '录播课'
        },
        component: () => import('../views/user/video-course'),
    },
    {
        path: 'myLiveCourse/:courseId/:tabId',
        name: 'myLiveCourse',
        meta: {
            title: '直播课'
        },
        component: () => import('../views/user/live-course'),
    },
    {
        path: 'myDownlineCourse/:courseId/:tabId',
        name: 'myDownlineCourse',
        meta: {
            title: '线下课'
        },
        component: () => import('../views/user/live-course'),
    },
    {
        path: 'mySpecial/:id',
        name: 'mySpecial',
        meta: {
            title: '知识专栏'
        },
        component: () => import('../views/user/my-special'),
    },
    {
        path: 'myBook/:id',
        name: 'myBook',
        meta: {
            title: '电子书'
        },
        component: () => import('../views/user/my-books'),
    },
]
