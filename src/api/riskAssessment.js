import utilsApi from '../assets/js/utils'
import axios from "axios";

export default utilsApi.createApi({
    cash_flow_sheet_download: ['get', '/api/recruit/analyze/cash_flow_sheet_download'],//下载现金流量表模版
    profit_statement_download: ['get', '/api/recruit/analyze/profit_statement_download'],//下载利润及利润分配表模版
    balance_sheet_download: ['get', '/api/recruit/analyze/balance_sheet_download'],//下载资产负债表模版
    get_category: ['get', '/api/recruit/analyze/get_category'],//1级分类
    sub_category: ['get', '/api/recruit/analyze/get_sub_category/code'],//2级分类
    export_report: ['post', '/api/recruit/analyze/export_report'],//下载报告
    analyze: ['post', '/api/recruit/analyze/analyze'],//风险评估
})
