import axios from "axios"

const api=axios.create({
    baseURL:"http://loaclhost:5000"
})  

export default api