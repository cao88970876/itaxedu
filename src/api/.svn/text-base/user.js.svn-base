import ajax from '@/assets/js/axios.package';

export default {

//奖品列表
    gamePrize() {
        return ajax.post('/api/admin_root/prize/lists', {})
    },
    //获奖记录
    prizeList(data) {
        return ajax.post('/api/admin_root/prize/get_list', {
            uid: data.uid,
            page: data.page,
            page_size: data.page_size,
        })
    },
    //游戏设置
    prizeSet() {
        return ajax.post('/api/admin_root/prize_config/index',)
    },

    //游戏中奖
    prizeing(uid) {
        return ajax.post('/api/admin_root/prize/index', {
            uid: uid,
        },)
    },

    //学习图表
    learnExperiences(uid) {
        return ajax.get('api/admin_root/content_inventory/study_chart', {
            uid: uid,
        })
    },

    //每日任务
    task(obj = {}) {
        return ajax.post('/api/admin_root/integral_config/index', {
            uid: obj.uid,
            cate: obj.cate //1积分任务 2每日任务 不传为全部任务
        })
    },
    //积分记录
    integral(obj = {}) {
        return ajax.post('api/admin_root/integral_config/integral', {
            uid: obj.uid,
            page: obj.page,
            page_size: obj.pageSize,
        })
    },
    getLineChartData(_uid) {
        //获取折线图数据
        return ajax.post("/api/admin_root/course/study", {
            uid: _uid
        });
    },
    //获取专家类型
    expertsType() {
        return ajax.post('/api/admin_root/experts_type/index')
    },
    //编辑个人资料
    edit(obj) {
        console.log(obj)
        return ajax.post("/api/admin_root/user/edit", {
            uid: obj.uid,
            nickname: obj.nickname,
            face: obj.face,
            experts_type_id: obj.experts_type_id,
            birthday: obj.birthday,
            city: obj.city,
            sex: obj.sex,
            expertise: obj.expertise,
            answer: obj.answer
        })
    },
    editExpert(obj) {
        return ajax.post("/api/recruit/expert_info/update", obj)
    }
    ,
    getStudyHistoryLog(obj) {
        //获取学习历史记录
        return ajax.post("/api/admin_root/study_log/index", {
            uid: obj.uid,
            page: obj.page,
            page_size: obj.page_size || '8'
        })
    },
    getKnowledgeLists(obj) {
        //status 0未学习 1学习中 2已学完 不传为全部
        return ajax.post('/api/admin_root/content_inventory/index', {
            uid: obj.uid,
            status: obj.status,
            page: obj.page,
            page_size: obj.page_size || '8'
        })
    },
    //生成证明
    generateStudyProve(obj) {
        return ajax.post('/api/admin_root/study_prove/add', {
            uid: obj.uid,
            name: obj.name,
            idcard: obj.idcard
        })
    }
}

