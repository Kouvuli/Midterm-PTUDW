const auth = window.localStorage.getItem('auth') ?? {}
const { token = '' } = auth
const baseUrl = 'https://midterm-ptudw-production.up.railway.app'

export default {
    token,
    baseUrl
}