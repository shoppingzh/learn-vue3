const NS = '__todo__'

function fullname(name) {
  return `${NS}${name}`
}

/**
 * 保存
 * @param {string} name 名称
 * @param {any} value 值
 */
export function save(name, value) {
  localStorage.setItem(fullname(name), JSON.stringify(value))
}


/**
 * 获取
 * @param {String} name 名称
 * @returns 
 */
export function get(name) {
  const str = localStorage.getItem(fullname(name))
  return JSON.parse(str)
}

/**
 * 移除
 * @param {String} name 名称
 * @returns 
 */
export function remove(name) {
  const value = get(fullname(name))
  localStorage.removeItem(fullname(name))
  return value
}