import request from '../utils/request'

interface userType {
}

export function userregisterApi(registerform: userType) {
    return request({
        url: '/api/register',
        method: 'post',
        data: registerform
    })
}

export function sendemailApi(sendemailform: userType) {
    return request({
        url: '/api/SendEmail',
        method: 'post',
        data: sendemailform
    })
}

export function testemailApi(testemailform: userType) {
    return request({
        url: '/api/decrypt',
        method: 'post',
        data: testemailform
    })
}
