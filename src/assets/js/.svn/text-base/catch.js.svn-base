const storage = require('store')

function saveStorage(key, value) {
  const history = getStorage(key) || []
  if (history.length == 10) {
    history.pop()
  }
  history.unshift(value)
  storage.set(key, history)
}

function getStorage(key) {
  return storage.get(key)
}

function clearStorage(key) {
  return storage.remove(key)
}

function removeStorage(key, value) {
  let history = getStorage(key) || []
  history = history.filter(item => item !== value)
  storage.set(key, history)
}

export default {
  set: saveStorage,
  get: getStorage,
  remove: removeStorage,
  clear: clearStorage
}