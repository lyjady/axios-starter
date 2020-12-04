<template>
  <div>
    <h3>Axios对象与Axios方法发送请求</h3>
    <button @click="successRequest">成功的请求</button>
    <button @click="notFoundRequest">404的请求</button>
    <button @click="errorRequest">非200的错误请求</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AxiosDemo',
  created() {
    this.initAxios()
  },
  methods: {
    initAxios() {
      // 请求前缀
      axios.defaults.baseURL = 'http://localhost:8081/PYCPAPI'
      // 响应拦截器
      // 成功回调处理响应成功或者非200的异常(服务器通常会将发生的错误捕获包装返回, 响应码通常为200)
      // 错误回调处理响应码异常的请求
      axios.interceptors.response.use(response => {
        console.log('response success interceptor')
        const data = response.data
        // 判断响应提
        if (data.code !== 0) {
          alert(data.message)
          // 因为返回Promise对象, 发生了业务异常必须将异常抛出或者返回错误的Promise对象否则依然会执行axios的成功回调
          throw data.message
        } else {
          // 正常将服务器响应的数据返回, 执行axios的请求成功回调, 返回的数据就是成功回调的参数
          return data
        }
      }, error => {
        console.log('response error interceptor')
        console.log(error)
        // 发生了系统异常(响应码为404, 505等http的异常)时执行, 如果不返回错误的Promise的对象那么axios的错误回调也不会执行
        alert('interceptor ' + error)
        if (error.response.status === 404) {
          alert('404 not fund')
        }
        return Promise.reject(error)
      })
      // 请求拦截器
      // 统一为请求添加请求头信息
      axios.interceptors.request.use(config => {
        config.headers['axios-interceptor-header'] = 'yes'
        return config
      }, error => {
        return error
      })
    },
    successRequest() {
      axios({
        url: '/misc/findEmployeeById',
        method: 'get',
        params: {
          id: 'e41afbdb66834595912ac05f660feb0c'
        }
      }).then(response => {
        console.log(response)
      }).catch(reason => {
        console.log(reason)
      })
    },
    notFoundRequest() {
      axios({
        url: '/misc/findEmployeeById2',
        method: 'get',
        params: {
          id: 'e41afbdb66834595912ac05f660feb0c'
        }
      }).then(response => {
        console.log(response)
      }).catch(reason => {
        console.log('axios ' + reason)
        console.log(reason)
      })
    },
    errorRequest() {
      axios({
        url: '/misc/error_request',
        method: 'get'
      }).then(response => {
        console.log(response)
      }).catch(reason => {
        console.log('axios ' + reason)
      })
    },
    axiosCreate: function () {
      // 可以根据不同的配置生成不同的axios实例
      // 不同的axios实例可以有不同的baseURL连接不同的服务器, 前端可以根据具体需求选择不同的axios实例对不同的服务器发起请求
      // axios实例与直接使用axios存在一定的差异, 但是都可以发送ajax请求
      // eslint-disable-next-line no-unused-vars
      const instance = axios.create({
        baseURL: 'xxxx',
        timeout: 5000
      });
    },
    axiosObjectRequest() {
      axios({
        url: 'https://api.github.com/search/repositories',
        method: 'get',
        params: {
          q: 'Spring',
          sort: 'stars'
        }
      }).then(value => console.log(value))
          .catch(reason => console.log(reason))
    },
    axiosMethodRequest() {
      axios.get('https://api.github.com/search/repositories?q=Mybatis&sort=stars')
          .then(value => console.log(value))
          .catch(reason => console.log(reason))
    }
  }
}
</script>

<style scoped>

</style>
