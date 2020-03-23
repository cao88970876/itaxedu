/**
 * 融云im
 * App Key n19jmcy5n8209
 * App Secret GmAAyucg1b
 * */
const appKey = "n19jmcy5n8209";

export default {
    init(cb) {
        // 设置连接监听状态 （ status 标识当前连接状态 ）
        // 连接状态监听器
        RongIMClient.setConnectionStatusListener({
            onChanged: function (status) {
                switch (status) {
                    case RongIMLib.ConnectionStatus.CONNECTED:
                        console.log('链接成功');
                        cb(true);
                        break;
                    case RongIMLib.ConnectionStatus.CONNECTING:
                        console.log('正在链接');
                        break;
                    case RongIMLib.ConnectionStatus.DISCONNECTED:
                        console.log('断开连接');
                        break;
                    case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                        console.log('其他设备登录');
                        break;
                    case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                        console.log('域名不正确');
                        break;
                    case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                        console.log('网络不可用');
                        break;
                }
            }

        });
    },
    onMessage(callback) {
        // 消息监听器
        RongIMClient.setOnReceiveMessageListener({
            // 接收到的消息
            onReceived: function (message) {
                // 判断消息类型
                switch (message.messageType) {
                    case RongIMClient.MessageType.TextMessage:
                        // message.content.content => 消息内容

                        callback({
                            success: true,
                            type: 'text',
                            message: message
                        });
                        break;
                    case RongIMClient.MessageType.VoiceMessage:
                        callback({
                            success: true,
                            type: 'audio',
                            message: message
                        });
                        // 对声音进行预加载
                        // message.content.content 格式为 AMR 格式的 base64 码
                        break;
                    case RongIMClient.MessageType.ImageMessage:
                        callback({
                            success: true,
                            type: 'image',
                            message: message
                        });
                        // message.content.content => 图片缩略图 base64。
                        // message.content.imageUri => 原图 URL。
                        break;
                    case RongIMClient.MessageType.DiscussionNotificationMessage:
                        // message.content.extension => 讨论组中的人员。
                        break;
                    case RongIMClient.MessageType.LocationMessage:
                        // message.content.latiude => 纬度。
                        // message.content.longitude => 经度。
                        // message.content.content => 位置图片 base64。
                        break;
                    case RongIMClient.MessageType.RichContentMessage:
                        // message.content.content => 文本消息内容。
                        // message.content.imageUri => 图片 base64。
                        // message.content.url => 原图 URL。
                        break;
                    case RongIMClient.MessageType.InformationNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.ContactNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.ProfileNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.CommandNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.CommandMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.UnknownMessage:
                        // do something...
                        break;
                    default:
                    // do something...
                }
            }
        });
    },
    sendMessage(_msg, _friend = {
        id: "",
        name: "",
        portrait: "",
    }, callback) {
        let msg = new RongIMLib.TextMessage({
            content: _msg, extra: '', user: _friend
        });
        let conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
        let targetId = _friend.id; //给别人发的Id
        console.log(conversationtype, targetId, _msg)
        RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
                onSuccess: function (message) {
                    //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                    console.log(message);
                    let _type = '';
                    switch (message.messageType) {
                        case RongIMClient.MessageType.TextMessage:
                            _type = 'text';
                            break;
                        case RongIMClient.MessageType.VoiceMessage:
                            _type = 'audio';
                            break;
                        case RongIMClient.MessageType.ImageMessage:
                            _type = 'image';
                            break;
                    }
                    callback({
                        success: true,
                        type: _type,
                        message: message
                    });
                    console.log("Send successfully");
                },
                onError: function (errorCode, message) {
                    let info = '';
                    switch (errorCode) {
                        case RongIMLib.ErrorCode.TIMEOUT:
                            info = '超时';
                            break;
                        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                            info = '未知错误';
                            break;
                        case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                            info = '在黑名单中，无法向对方发送消息';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                            info = '不在讨论组中';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_GROUP:
                            info = '不在群组中';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                            info = '不在聊天室中';
                            break;
                        default :
                            info = x;
                            break;
                    }
                    return callback({
                        success: false,
                        message: info
                    });
                    console.log('发送失败:' + info);
                }
            }
        );
    },
    sendImageMessage(_friendId,_base64Str,_imageUrl,callback){
        var base64Str = _base64Str;
        var imageUri = _imageUrl; // 上传到自己服务器的 URL。
        var msg = new RongIMLib.ImageMessage({content:base64Str,imageUri:imageUri});
        var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
        var targetId = _friendId; // 目标 Id
        RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
                onSuccess: function (message) {
                    //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                    console.log('发送图片成功',message)
                    callback({
                        success: true,
                        type: 'image',
                        message: message
                    });
                    console.log("Send successfully");
                },
                onError: function (errorCode,message) {
                    console.log('发送图片失败')
                    var info = '';
                    switch (errorCode) {
                        case RongIMLib.ErrorCode.TIMEOUT:
                            info = '超时';
                            break;
                        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                            info = '未知错误';
                            break;
                        case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                            info = '在黑名单中，无法向对方发送消息';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                            info = '不在讨论组中';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_GROUP:
                            info = '不在群组中';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                            info = '不在聊天室中';
                            break;
                        default :
                            info = x;
                            break;
                    }
                    console.log('发送失败:' + info);
                }
            }
        );
    },
    lianjie(_token) {
        RongIMClient.connect(_token, {

            onSuccess: function (userId) {
                console.log("Connect successfully." + userId);
            },
            onTokenIncorrect: function () {
                console.log('token无效');
            },
            onError: function (errorCode) {
                let info = '';
                switch (errorCode) {
                    case RongIMLib.ErrorCode.TIMEOUT:
                        info = '超时';
                        break;
                    case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
                        info = '不可接受的协议版本';
                        break;
                    case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
                        info = 'appkey不正确';
                        break;
                    case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
                        info = '服务器不可用';
                        break;
                }
                console.log(errorCode);
            }
        });
        //重新连接
        let callback = {
            onSuccess: function (userId) {
                console.log("Reconnect successfully." + userId);
            },
            onTokenIncorrect: function () {
                console.log('token无效');
            },
            onError: function (errorCode) {
                console.log(errorcode);
            }
        };
        let config = {
            // 默认 false, true 启用自动重连，启用则为必选参数
            auto: true,
            // 重试频率 [100, 1000, 3000, 6000, 10000, 18000] 单位为毫秒，可选
            url: 'cdn.ronghub.com/RongIMLib-2.2.6.min.js',
            // 网络嗅探地址 [http(s)://]cdn.ronghub.com/RongIMLib-2.2.6.min.js 可选
            rate: [100, 1000, 3000, 6000, 10000]
        };
        // RongIMClient.reconnect(callback, config);
        //  重连end
    }
}
