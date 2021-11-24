# cached storage

It's simplified function to reduce the consumption of get from storage, such as mini-programs' `uni.getStorageSync`, `wx.getStorageSync`.

## use case

Below are some use cases in case you're interested
```javascript
import cachedStorage from 'cached-storage'
cachedStorage.init({
  env: 'uni',
  context: 'uni',
})
// get
cachedStorage.getSync('key')
// set
cachedStorage.setSync('key', 'value')
// remove
cachedStorage.removeSync('key')
// clear
cachedStorage.clearSync()
```

## limitation

Currently it only support uni, and I'll try my best to support other platforms.
