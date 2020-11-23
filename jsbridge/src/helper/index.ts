/*
 * @Author: Whzcorcd
 * @Date: 2020-11-20 13:54:42
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-11-20 18:15:34
 * @Description: file content
 */
const isIOS = (): boolean => {
  const reg = /iPhone|iPad|iPod/i
  if (reg.test(window.navigator.userAgent)) {
    return true
  }
  return false
}

const isAndroid = (): boolean => {
  const reg = /Android|Linux/i
  if (reg.test(window.navigator.userAgent)) {
    return true
  }
  return false
}

export { isIOS, isAndroid }
