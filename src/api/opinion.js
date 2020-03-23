import ajax from '@/assets/js/axios.package';
import url_path from '../assets/js/utils';
// //问题反馈
// let opinionUrl = url_path.api+'/api/admin_root/opinion/add';

let urls = {
    opinionUrl: '/api/admin_root/opinion/add',
}
url_path.autoPrefix(urls)
export default {
    submit(obj){
        return ajax.post(urls.opinionUrl, obj)
    }
}
