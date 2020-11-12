import axios from 'axios'

const instance = axios.create({
   baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:9000/api/v1' : process.env.APP_URI
})



export default instance