/*
 * @Author: Arius
 * @Date:   2019-10-05 05:32:01
 * @Last Modified by:   Arius
 * @Last Modified time: 2019-10-05 21:16:43
 */
import * as dom from './dom'
import axios from 'axios'

export default {
  dom
}

export const replaceImg = src => {
  return `https://test.img.cheerfun.dev/get/${src}`
}

export function download (href, cb) {
  const eleLink = document.createElement('a')
  eleLink.download = ''
  eleLink.href = href
  eleLink.click()
  eleLink.remove()
  cb && cb()
}

export function downloadImage (url, cb) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      responseType: 'blob',
      onDownloadProgress (progress) {
        cb && cb(progress)
      }
    })
      .then(res => {
        const url = URL.createObjectURL(res.data)
        download(url)
        resolve()
      })
      .catch(error => {
        reject(error)
      })
  })
}
