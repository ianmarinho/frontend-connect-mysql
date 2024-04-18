import axios from 'axios'

const api = axios.create ({
    baseURL: 'https://backend-mysql-papelaria.vercel.app'
})

export default api