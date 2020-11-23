/*
 * @Author: Whzcorcd
 * @Date: 2020-11-23 14:31:02
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-11-23 15:21:24
 * @Description: file content
 */
import SDK from './sdk'

class API extends SDK {
  private static singleInstance: API | null = null

  private constructor() {
    super()
  }

  static getInstance(): API {
    if (!this.singleInstance) {
      this.singleInstance = new API()
    }
    return this.singleInstance
  }

  config(e: any) {
    super.call(
      'config',
      {},
      ((e._complete = function () {
        console.log('_complete config')
      }),
      e)
    )
  }

  setTitle(e: any) {
    super.call(
      'setTitle',
      {
        title: e.title || '',
      },
      e
    )
  }

  backCloseWindow(e: any) {
    super.call('backCloseWindow', {}, e)
  }

  closeWindow(e: any) {
    super.call('closeWindow', {}, e)
  }

  putLocalStorageKV(e: any) {
    super.call(
      'putLocalStorageKV',
      {
        key: e.key || '',
        value: e.value || '',
      },
      e
    )
  }

  getLocalStorageKV(e: any) {
    super.call(
      'getLocalStorageKV',
      {
        key: e.key || '',
      },
      e
    )
  }

  choosePhotos(e: any) {
    super.call(
      'choosePhotos',
      {
        enableCount:
          e.enableCount || (e.enableCount == undefined ? 0 : e.enableCount),
      },
      e
    )
  }

  uploadPhotos(e: any) {
    super.call(
      'uploadPhotos',
      {
        nativeResourceUrls: e.nativeResourceUrls || [],
      },
      e
    )
  }

  previewPhotos(e: any) {
    super.call(
      'previewPhotos',
      {
        urls: e.urls || [],
        index: e.index || (e.index == undefined ? 0 : e.index),
      },
      e
    )
  }

  chooseVideos(e: any) {
    super.call(
      'chooseVideos',
      {
        enableCount:
          e.enableCount || (e.enableCount == undefined ? 0 : e.enableCount),
      },
      e
    )
  }

  uploadVideos(e: any) {
    super.call(
      'uploadVideos',
      {
        nativeResourceUrls: e.nativeResourceUrls || [],
      },
      e
    )
  }

  previewVideo(e: any) {
    super.call(
      'previewVideo',
      {
        url: e.url || '',
      },
      e
    )
  }

  chooseFile(e: any) {
    super.call(
      'chooseFile',
      {
        enableCount:
          e.enableCount || (e.enableCount == undefined ? 0 : e.enableCount),
        maxSize: e.maxSize || (e.maxSize == undefined ? 0 : e.maxSize),
        isMultiSelect:
          e.isMultiSelect ||
          (e.isMultiSelect == undefined ? true : e.isMultiSelect),
      },
      e
    )
  }

  uploadFile(e: any) {
    super.call(
      'uploadFile',
      {
        nativeResourceUrls: e.nativeResourceUrls || [],
      },
      e
    )
  }

  previewFile(e: any) {
    super.call(
      'previewFile',
      {
        url: e.url || '',
      },
      e
    )
  }

  chooseLocation(e: any) {
    super.call('chooseLocation', {}, e)
  }

  getLocation(e: any) {
    super.call('getLocation', {}, e)
  }

  previewLocation(e: any) {
    super.call('previewLocation', {}, e)
  }

  onContainerResume(e: any) {
    super.on('onContainerResume', e)
  }

  onContainerPause(e: any) {
    super.on('onContainerPause', e)
  }
}

export default API.getInstance()
