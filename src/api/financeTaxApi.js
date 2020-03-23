import utilsApi from '../assets/js/utils'

export default utilsApi.createApi({
    financeTaxHome: ['get', '/api/admin_root/taxation_category/index'],//主页
    searchList: ['get', '/api/admin_root/taxation/searchs'],//搜索
    financeTaxClassify: ['get', '/api/admin_root/taxation_category/index'],//财税库分类
    financeTax: ['get', '/api/admin_root/taxation/index'],//财税库
    financeTaxDetail: ['get', '/api/admin_root/taxation/detail'],//财税库详情
})
