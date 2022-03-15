import axios from 'axios';

const url = 'https://8080-tijjanidev-lendsqr-min0s961g0u.ws-eu34.gitpod.io'

export default axios.create({
    baseURL: url +'/
    api/',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

