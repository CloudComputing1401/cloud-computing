export default async ({ $axios, store }, inject) => {
    await store.restored

    $axios.setHeader('Authorization', store.getters['Auth/getToken'])
    // $axios.onError(error => {
    //     if (!error.response) {
    //         store.dispatch('SnackBar/show', {
    //             type: 'error',
    //             text: 'در اتصال به سرور مشکلی به وجود آمده است، لطفا بعدا مجدد تلاش نمایید.',
    //         })
    //     }
    // })
    inject('get', (url, params) => {
        return $axios.get(`/api/v1/${url}`, {
            params
        })
    })
    inject('post', (url, body) => {
        return $axios.post(`/api/v1/${url}`, body)
    })
    inject('put', (url, body) => {
        return $axios.put(`/api/v1/${url}`, body)
    })
    inject('deleteReq', (url, data) => {
        return $axios.delete(`/api/v1/${url}`, {
            data
        })
    })
}