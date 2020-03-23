export default {
    path: 'course',
    name: 'course',
    component: () => import('../views/course'),
    redirect: {name: 'videoCourse'},
    children: [
        {
            path: 'videoCourse',
            name: 'videoCourse',
            meta: {
                title: '课程学习'
            },
            component: () => import('../views/course/video-course')
        },
         {
            path: 'robotCourse',
            name: 'robotCourse',
            meta: {
                title: '机器人专区'
            },
            component: () => import('../views/course/robot-course')
        },
         {
            path: 'zjLink',
            name: 'zjLink',
            meta: {
                title: '机器人专区'
            },
            component: () => import('../views/course/zj-link')
        },
        {
            path: 'videoCourseDetail/:courseId/:tabId',
            name: 'videoCourseDetail',
            meta: {
                title: '录播课'
            },
            component: () => import('../views/course/video-course-detail')
        },
        {
            path: 'liveCourse',
            name: 'liveCourse',
            meta: {
                title: '课程学习'
            },
            component: () => import('../views/course/live-course')
        },
        {
            path: 'liveCourseDetail/:courseId/:tabId',
            name: 'liveCourseDetail',
            meta: {
                title: '直播课'
            },
            component: () => import('../views/course/live-course-detail')
        },
        {
            path: 'downlineCourse',
            name: 'downlineCourse',
            meta: {
                title: '课程学习'
            },
            component: () => import('../views/course/downline-course')
        },
        {
            path: 'downlineCourseDetail/:courseId/:tabId',
            name: 'downlineCourseDetail',
            meta: {
                title: '线下课'
            },
            component: () => import('../views/course/downline-course-detail')
        },
        {
            path: 'coursePay/:courseId',
            name: 'coursePay',
            meta: {
                title: '课程支付'
            },
            component: () => import('../views/course/course-pay')
        },
        {
            path: 'coursePayStatus/:orderNum/:courseId',
            name: 'coursePayStatus',
            meta: {
                title: '支付状态'
            },
            component: () => import('../views/course/pay-status')
        },
        {
            path: 'courseSearch/:type',
            name: 'courseSearch',
            meta: {
                title: '搜索结果'
            },
            component: () => import('../views/course/search-result')
        },
        {
            path: 'downCourseSignUp/:courseId',
            name: 'downCourseSignUp',
            meta: {
                title: '在线报名'
            },
            component: () => import('../views/course/course-sign-up')
        },
    ]
}
