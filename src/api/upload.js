//
// import {utilsApi} from '.'
import axios from 'axios'
// export default utilsApi.createApi({
//
// })

// import ajax from '../assets/js/axios.package';
export default {
    //G1-企业招聘
    uploadImage(file) { // 图片上传
        return axios({
            url: '/api/common/upload/upload',
            method: 'post',
            data: file,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    analyze(file) { // 文件上传
        return axios({
            url: '/api/recruit/analyze/analyze',
            method: 'post',
            data: file,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
}
