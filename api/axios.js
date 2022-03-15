import axios from 'axios';

export default axios.create({
    baseURL: 'https://8080-tijjanidev-lendsqr-min0s961g0u.ws-eu34.gitpod.io/api/',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

