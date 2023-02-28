// 用户名匹配
export function nameRule (rule, value, callback) {
   // 请输入4-10位昵称
   let reg = /(^[a-zA-Z0-9]{4,10}$)/
   if (value === '') {
      callback(new Error('请输入用户名'))
   } else if (!reg.test(value)) {
      callback(new Error('请输入4-10位用户名'))
   } else {
      callback()
   }
}
// 密码正则匹配
export function pwdRule (rule, value, callback) {
   // 6-12位密码需要包含大小写字母以及特殊符号
   let pwd = /^\S*(?=\S{6,12})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*?. ])\S*$/
   if (value === '') {
      callback(new Error('请输入密码'))
   } else if (!pwd.test(value)) {
      callback(new Error('6-12位密码需要包含大小写字母、数字和特殊符号'))
   } else {
      callback()
   }
}