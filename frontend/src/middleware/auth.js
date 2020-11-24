export default function auth (to, from, next) {
  if (!localStorage.getItem('userToken') && !localStorage.getItem('userData')) {
    return next({ name: 'Login' })
  }
  return next()
}
