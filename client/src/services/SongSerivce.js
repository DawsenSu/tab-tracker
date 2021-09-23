import Api from './Api'

export default {
  index () {
    return Api().get('songs')
  },
  show () {
    return Api().get('songs/')
  }
}