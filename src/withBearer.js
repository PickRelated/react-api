import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:3000/api/v1' })

export default ({
  axios,
  getToken = () => console.warn('getToken function is not defined'),
  onError = () => console.error('Token not found'),
}) => {
  axios.interceptors.request.use(config => {
    const token = getToken()
    if (!token || !token.length || token === 'undefined') {
      onError()
    } else {
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  })

  return axios
}
