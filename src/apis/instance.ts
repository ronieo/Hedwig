import axios from 'axios'

export const instance = axios.create({
    baseURL: 'http://hedwigbe-env.eba-afs9gzxm.ap-northeast-2.elasticbeanstalk.com',
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})


