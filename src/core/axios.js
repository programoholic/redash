import axios, { AxiosInstance } from 'axios';
import * as tunnel from 'tunnel';
import httpsProxyAgent from 'https-proxy-agent';
// import Mauth from 'node-eureka-mauth';
const agents = new httpsProxyAgent('https://127.0.0.1:9090');
console.log('** agent : ',agents);
   const agent = tunnel.httpsOverHttp({
   proxy: {
     host: '127.0.0.1',
     port: 9090,
     tunnel: false,
     authenticate: false,
     disabled: false
    },
   });
const axiosClient = axios.create({
baseURL: 'http://localhost:4000/v1/sensor_cloud_entities',
httpsAgent: agent,
});
export default axiosClient;