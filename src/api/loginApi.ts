import request from '../utils/request'

interface userType {
}

export function userLoginApi(loginform: userType) {
    return request({
        url: '/api/login',
        method: 'post',
        data: loginform
    })
}

export function outLoginApi() {
    return request({
        url: '/api/test/logout',
        method: 'post',
        params: {
            token: window.sessionStorage.token
        }
    })
}

export function refreshApi() {
    return request({
        url: '/api/test/refresh',
        method: 'post',
        params: {
            token: window.sessionStorage.token
        }
    })
}


export function testTokenApi() {
    return request({
        url: '/api/test/Test',
        method: 'post',
        params: {
            token: window.sessionStorage.token
        }
    })
}
