
import { Message } from 'element-ui'
import Cookies from 'js-cookie'

export default function ({ $axios, redirect }) {

  $axios.onRequest(config => {
    config.headers.Authorization = 'Bearer ' + Cookies.get('http://127.0.0.1:3001/')
    // console.log(`axios\s plugins request : ${JSON.stringify(config)}`)
  })

  $axios.onResponse(response => {
    const respData = response.data
    // console.log(`axios\s plugins response.data: ${JSON.stringify(respData)}`)
    if (!respData.success) {
      Message.warning({
        message: respData.message || 'unknown error !',
        duration: 5 * 1000
      })
    }
    // return respData
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      redirect('/test/login')
    } else {
      Message.error({
        message: (error.response && error.response.data && error.response.data.message) || (error.message) || 'unknown error !',
        duration: 5 * 1000,
        closable: true
      })
    }
  })
}