import { get, save } from '@/utils/store'

export function list() {
  return new Promise((resolve) => {
    const items = get('items') || []
    resolve(items)
  })
}

export function add(data) {
  return new Promise((resolve, reject) => {
    if (!data.label) return reject('参数错误')
    const items = get('items') || []
    const maxId = items.reduce((maxId, o) => {
      if (o.id > maxId) {
        maxId = o.id
      }
      return maxId
    }, 0)
    data.id = maxId + 1
    data.createTime = +new Date()
    items.push(data)
    save('items', items)
    // 模拟网络请求
    setTimeout(() => {
      resolve(data)
    }, Math.random() * 3000);
  })
}

export function remove(id) {
  return new Promise((resolve, reject) => {
    const items = get('items') || []
    const idx = items.findIndex(o => o.id === id)
    if (idx < 0) return reject('没有找到')
    const item = items[idx]
    items.splice(idx, 1)
    save('items', items)
    resolve(item)
  })
}

export function toggleDone(id, done = false) {
  return new Promise((resolve, reject) => {
    const items = get('items') || []
    const item = items.find(o => o.id === id)
    if (!item) return reject('没有找到该待办')
    item.done = done
    save('items', items)
    resolve()
  })
}
