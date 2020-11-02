$(function () {
  let form = layui.form
  //添加 名称 校验
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度为1~6个字符!"
      }
    }
  })

  initUserInfo()
  function initUserInfo() {
    $.ajax({
      type: 'get',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户失败!')
        }
        form.val('formUserInfo', res.data)
      }
    })
  }
  // 点击时重新获取用户信息
  $('#btnReset').on('click', function (e) {
    e.preventDefault();
    initUserInfo()
  })

  // 监听表单的提交事件
  $('.layui-form').on('submit', function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault()
    // 发起 ajax 数据请求
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg('更新用户信息失败！')
        layer.msg('更新用户信息成功！')
        // 调用父页面中的方法，重新渲染用户的头像和用户的信息
        window.parent.getUserInfo()
      }
    })
  })
})