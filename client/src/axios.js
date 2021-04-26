import axios from 'axios';

const instance = axios.create({
    baseURL:"https://whatsapp167.herokuapp.com/",
})

export default instance;