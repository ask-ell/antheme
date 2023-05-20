import { ComponentTag, inject } from '.'
import type AskellImage from './image'

export default class DomCacheService {
  private static instance?: DomCacheService
  private readonly cacheDomElementTag = new ComponentTag('cache')
  private readonly cache = inject(Window).document.createElement(
    this.cacheDomElementTag.toString()
  )

  private constructor() {
    this.cache.style.position = 'absolute'
    this.cache.style.zIndex = '-1000'
    this.cache.style.opacity = '0'
    inject(Window).document.body.appendChild(this.cache)
  }

  static getInstance(): DomCacheService {
    if (DomCacheService.instance == null) {
      DomCacheService.instance = new DomCacheService()
    }
    return DomCacheService.instance
  }

  async preloadImage({ src }: AskellImage): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      const image = new Image()
      image.onload = () => {
        resolve()
      }
      image.onerror = reject
      image.src = src
      this.cache.appendChild(image)
    })
  }
}
