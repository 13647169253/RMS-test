$(function () {
  //获取用户基本信息
  getUserInfo()
  let layer = layui.layer
  //退出功能
  $('#btnLogout').on('click', function () {
    layer.confirm('确定退出?', { icon: 3, title: '提示 ' }, function (index) {
      localStorage.removeItem('token')
      location.href = '/login.html';
      // layer 自带的代码; 关闭confirm询问框;关闭当前窗口
      layer.close(index)
    })
  })
})


// 渲染用户头像
function renderAvatar(user) {
  let name = user.nickname || user.username
  $('#welcome').html(`欢迎  ${name}`)
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    let first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}

function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers 就是请求头配置对象,将token放入本地存储中
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
      }
      // 调用 renderAvatar 渲染用户的头像
      renderAvatar(res.data)
    },
    // 不管是成功还是失败都会调用这个函数;
    // complete: function (res) {
    //   // 进行判断,complete里面会有那个返回值,status和message
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     localStorage.removeItem('token')
    //     location.href = '/login.html'
    //   }
    // }
  })
}