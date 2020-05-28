import moment from 'moment'

const enumData = {
    typeFilter: [
        {key: 1, value: '课程'},
        {key: 2, value: '专栏'},
        {key: 3, value: '电子书'},
    ],
    courseTypeFilter: [
        {key: 0, value: ''},
        {key: 1, value: '直播课'},
        {key: 2, value: '录播课'},
        {key: 3, value: '线下课'},
    ],
};

class MyPlugin {
    constructor() {
        this.filters = this.initFilters();
        this.directives = this.initDirectives();
        this.rules = this.initRules();
    }

    // 过滤器组
    initFilters() {
        return {
            timeFilter(v, argFmt) {
                let fmt = argFmt || 'MM月DD日 HH:mm';
                return moment.unix(v).format(fmt);
            },
            fileSizeFilter(v) {
                let result = v / 1024;
                result = result / 1024 > 1 ? (result / 1024).toFixed(2) + 'MB' : result.toFixed(2) + 'KB';
                return result;
            },
            timeLongFilter(v) {
                v *= 1;
                const hour = Math.floor(v / 3600);
                const minute = Math.floor(v % 3600 / 60);
                const second = v % 3600 % 60;
                let result = `${(minute < 10 ? '0' : '') + minute}分${(second < 10 ? '0' : '') + second}秒`;
                if (hour > 0) {
                    result = `${hour}小时` + result;
                }
                return result;
            },
            enumFilter(val, validName) {
                let names = Object.keys(enumData);
                // 遍历key来匹配过滤器参数，如果匹配不到，直接返回原始数据
                for (let i in names) {
                    if (names[i] === validName) {
                        // 匹配到key之后，处理返回结果。如果原始数据在枚举数据中没有定义，将返回原始数据
                        for (let j in enumData[names[i]]) {
                            if (enumData[names[i]][j].key === val) {
                                return enumData[names[i]][j].value;
                            }
                        }
                        return val;
                    }
                }
                return val;
            }
        }
    }

    // 指令组
    initDirectives() {
        return {
            time: {
                componentUpdated(el, bindings) {
                    if (bindings.value) {
                        const data = bindings.value.toString().split('|');
                        let fmt = data[1] || 'YYYY年MM月DD日';
                        el.innerHTML = moment.unix(data[0] * 1).format(fmt);
                    }
                }
            }
        };
    }

    // 表单检验
    initRules() {
        return {
            invoiceName: [
                {required: true, message: '请输入发票抬头', trigger: 'blur'},
            ],
            invoiceEin: [
                {required: true, message: '请输入税号', trigger: 'blur'},
            ],
            invoiceDetail: [
                {required: true, message: '请选择发票明细', trigger: 'change'},
            ],
            email: [
                {required: true, message: '请输入电子邮箱', trigger: 'blur'},
                {pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, message: '请输入正确的邮箱'},
            ],
            name: [
                {required: true, message: '请输入姓名', trigger: 'blur'}
            ],
            phone: [
                {pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号'},
                {required: true, message: '请输入手机号', trigger: 'blur'},
            ],
            company: [
                {required: true, message: '请输入公司', trigger: 'blur'}
            ],
            position: [
                {required: true, message: '请输入职位', trigger: 'blur'},
            ],
            province: [
                {required: true, message: '请选择省市区', trigger: 'blur'}
            ],
            premiums: [
                {pattern: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,required: true, message: '请输入各项社会保险费（最多只能两位小数）', trigger: 'blur'}
            ],
            grossPay: [
            {pattern: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,required: true, message: '请输入大于5000的税前工资（最多只能两位小数）', trigger: 'blur'}
            ],
            work_category: [
                    { required: true, message: '请选择所属行业', trigger: 'change' }
            ],
            vat_paid: [
                { pattern: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,required: true, message: '请输入大于0的金额（最多只能两位小数）', trigger: 'blur' }
            ],
            cit_paid: [
                {pattern: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/, required: true, message: '请输入大于0的金额（最多只能两位小数）', trigger: 'blur' }
            ],
            sales_revenue_input: [
                { pattern: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,required: true, message: '请输入大于0的金额（最多只能两位小数）', trigger: 'blur' }
            ],
        }
    }



    install(Vue) {
        // 绑定指令
        const directiveNames = Object.keys(this.directives);
        for (let name of directiveNames) {
            Vue.directive(name, this.directives[name])
        }
        // 绑定过滤器
        const filterNames = Object.keys(this.filters);
        for (let name of filterNames) {
            Vue.filter(name, this.filters[name]);
        }
        Vue.prototype.$filter = this.filters;
        Vue.prototype.$rules = this.rules;
    }
}

export default new MyPlugin()
