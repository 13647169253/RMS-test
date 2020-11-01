// 在jquery中每次调用 $.get() 或 $.post() 或 $.ajax() 的时候,会先调用 ajaxPrefilter 这个函数 ;URL拦截器
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$(function () {
  $.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // 给所有需要token权限的请求添加token
    if (options.url.indexOf('/my/') !== -1) {
      options.headers = {
        Authorization: localStorage.getItem('token') || ''
      }
    }
    // 给页面统一添加权限请求
    options.complete = function (res) {
      // 进行判断,complete里面会有那个返回值,status和message
      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        localStorage.removeItem('token')
        location.href = '/login.html'
      }
    }
  })
})