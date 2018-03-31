
export default function ({ store, redirect, route }) {
  // console.log(`middleware\'s route is ${JSON.stringify(route)}`)
  // console.log(`middleware\'s store is ${JSON.stringify(store.state)}`)
  if (route.path !== '/system/login') {
    if (!store.state.user) {
      // console.log(`middleware redirect login.`)
      redirect('/system/login')
    }
  }
}