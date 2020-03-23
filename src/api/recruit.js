
import ajax from '../assets/js/axios.package';
import url_path from '../assets/js/utils';

// 支付接口
const urls = {
    contentOrderUrl: '/api/admin_root/content_order/add',
}

url_path.autoPrefix(urls)

export default {
    // 生成订单
    contentOrder(obj) {
        return ajax.post(urls.contentOrderUrl, obj)
    },
}
