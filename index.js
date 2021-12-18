function noop() {}

const cachedStorage = {
  cache: {},
}

function setHandlers(env, context, config) {
  let defaultGetSync = noop
  let defaultSetSync = noop
  let defaultRemoveSync = noop
  let defaultClearSync = noop
  if (env === 'uni') {
    defaultGetSync = context.getStorageSync || noop
    defaultSetSync = context.setStorageSync || noop
    defaultRemoveSync = context.removeStorageSync || noop
    defaultClearSync = context.clearStorageSync || noop
  } else if (env === 'window') {
    defaultGetSync = context.localStorage.getItem || noop
    defaultSetSync = context.localStorage.setItem || noop
    defaultRemoveSync = context.removeItem || noop
    defaultClearSync = context.clear || noop
  }
  cachedStorage.getSyncWrapper = config.getSync || defaultGetSync
  cachedStorage.setSyncWrapper = config.setSync || defaultSetSync
  cachedStorage.removeSyncWrapper = config.removeSync || defaultRemoveSync
  cachedStorage.clearSync = config.clearSync || defaultClearSync
}

function interceptHandlers(context) {
  const getSync = function(key) {
    if (!key) throw new Error('请传入key来获取对应缓存')

    let result = this.cache[key]
    if (result) return result

    result = this.getSyncWrapper(key)
    this.setSync(key, result)
    return result
  }
  const setSync = function(key, value) {
    if (!key) throw new Error('请传入key来设置对应缓存')

    if (typeof key === 'object') throw new Error('key值只能为原始值类型')

    value = `${value}`
    this.setSyncWrapper(key, value)
    this.cache[key] = value
    return true
  }
  const removeSync = function(key) {
    if (!key) throw new Error('请传入key来移除对应缓存')

    this.removeSyncWrapper(key)
  }
  const clearSync = function() {
    const cache = this.cache
    Object.keys(cache).forEach(key =>{
      this.removeSync(key)
      delete cache[key]
    })
  }

  Object.defineProperty(context, 'getSync', {
    get: function() {
      return getSync
    },
    set: noop,
    enumerable: false,
    configurable: false,
  })
  Object.defineProperty(context, 'setSync', {
    get: function() {
      return setSync
    },
    set: noop,
    enumerable: false,
    configurable: false,
  })
  Object.defineProperty(context, 'clearSync', {
    get: function() {
      return clearSync
    },
    set: noop,
    enumerable: false,
    configurable: false,
  })
  Object.defineProperty(context, 'removeSync', {
    get: function() {
      return removeSync
    },
    set: noop,
    enumerable: false,
    configurable: false,
  })
}

cachedStorage.init = function(config) {
  setHandlers(config.env, config.context, config)
  interceptHandlers(cachedStorage)
}



module.exports = cachedStorage
