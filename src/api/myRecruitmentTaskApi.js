import utilsApi from '../assets/js/utils'

export default utilsApi.createApi({
    userPublished: ['get', '/api/recruit/user_task/published_index'],
    userAccept: ['get', '/api/recruit/user_task/accept_index'],//已接受
})
