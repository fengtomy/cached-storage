# cached storage

It's simplified function to reduce the consumption of getting/setting data from storage, such as `uni.getStorageSync`, `window.localStorage.getItem`.

## use case

Below are some use cases in case you're interested
```javascript
import cachedStorage from 'cached-storage'
cachedStorage.init({
  env: 'uni', // 'window'
  context: 'uni', // window
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

~~Currently it only supports uni, and I'll try my best to support other platforms.~~  
It now supports uni and browser(window), and I'll try my best to support other major platforms.
