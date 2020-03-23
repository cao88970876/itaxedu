// export default {
//     path: 'messageCenter',
//     name: 'messageCenter',
//     meta: {
//         title: '消息中心'
//     },
//     component: () => import('../views/messageCenter'),
//     redirect: {name: 'systemMessage'},
//     children: [
//         {
//             path: 'system',
//             name: 'system',
//             meta: {
//                 title: '系统消息'
//             },
//             component: () => import('../views/messageCenter/system'),
//             redirect: {name: 'systemMessage'},
//             children:[
//                 {
//                     path: 'systemMessage',
//                     name: 'systemMessage',
//                     meta: {
//                         title: '系统消息'
//                     },
//                     component: () => import('../views/messageCenter/system/systemMessage'),
//                 }
//             ]
//         },
//
//         {
//             path: 'logistics',
//             name: 'logistics',
//             meta: {
//                 title: '物流消息'
//             },
//             component: () => import('../views/messageCenter/logistics'),
//             redirect: {name: 'logisticsMessage'},
//             children:[
//                 {
//                     path: 'logisticsMessage',
//                     name: 'logisticsMessage',
//                     meta: {
//                         title: '系统消息'
//                     },
//                     component: () => import('../views/messageCenter/logistics/logisticsMessage'),
//                 }
//             ]
//         },
//         {
//             path: 'chatMessage',
//             name: 'chatMessage',
//             meta: {
//                 title: '对话消息'
//             },
//             component: () => import('../views/messageCenter/chatMessage'),
//             redirect: {name: 'dialogueMessage'},
//             children: [
//                 {
//                     path: 'dialogueMessage',
//                     name: 'dialogueMessage',
//                     meta: {
//                         title: '对话消息'
//                     },
//                     component: () => import('../views/messageCenter/chatMessage/dialogueMessage'),
//                 },
//                 {
//                     path: 'chat',
//                     name: 'chat',
//                     meta: {
//                         title: '聊天'
//                     },
//                     component: () => import('../views/messageCenter/chatMessage/chat'),
//                 },
//             ]
//         },
//
//     ],
//
// }
