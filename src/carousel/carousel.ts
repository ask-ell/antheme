import {
  decrypt,
  inject,
  AskellHTMLElement,
  type AskellImage,
  DomCacheService,
  type OnChanges
} from '../core'
import { CarouselLeftArrow, CarouselRightArrow } from './arrows'
import { ShiftAnimationDirection } from './types'
import {
  carouselComponentTag,
  carouselImageContainerComponentTag,
  fromLeftToMiddleAnimationClassName,
  fromMiddleToLeftAnimationClassName,
  fromMiddleToRightAnimationClassName,
  fromRightToMiddleAnimationClassName,
  hiddenElementClassName
} from './utils'

export default class Carousel extends AskellHTMLElement implements OnChanges {
  private currentIndex = 0
  private previousIndex = this.currentIndex
  private images = new Array<AskellImage>()
  private imageContainers = new Array<HTMLDivElement>()
  private timeOut?: NodeJS.Timeout
  private lastShiftAnimationDirection?: ShiftAnimationDirection
  static readonly shiftAnimationDuration = 500

  constructor() {
    super()
    this.reset()
    this.classList.add(carouselComponentTag.toString())
    this.inspectImagesAttribute()
  }

  onChanges(): void {
    this.reset()
    this.inspectImagesAttribute()
  }

  getPreviousIndex(): number {
    return this.previousIndex
  }

  getCurrentIndex(): number {
    return this.currentIndex
  }

  getLastShiftAnimationDirection(): ShiftAnimationDirection {
    return this.lastShiftAnimationDirection
      ? this.lastShiftAnimationDirection
      : ShiftAnimationDirection.UNDEFINED
  }

  private inspectImagesAttribute(): void {
    const encodedImages = this.getAttribute('images')
    if (encodedImages !== null) {
      this.images = decrypt<AskellImage[]>(encodedImages)
      this.createImageContainers()
    }
  }

  private reset(): void {
    this.innerHTML = ''
    this.currentIndex = 0
    this.previousIndex = this.currentIndex
    this.images = new Array<AskellImage>()
    this.imageContainers = new Array<HTMLDivElement>()
  }

  private createImageContainers(): void {
    const imagesPreloaders = new Array<Promise<void>>()
    const domCacheService = DomCacheService.getInstance()

    this.images.forEach((image, index) => {
      const imageContainer = inject(Window).document.createElement('div')
      imageContainer.classList.add(
        carouselImageContainerComponentTag.toString()
      )
      if (index !== this.currentIndex) {
        imageContainer.classList.add(hiddenElementClassName)
      }
      imageContainer.style.backgroundImage = `url("${image.src}")`

      this.imageContainers.push(imageContainer)
      this.appendChild(imageContainer)

      const imagePreloader = domCacheService.preloadImage(image).catch(() => {
        this.imageContainers[index].innerText = 'Error: unreachable resource'
      })

      imagesPreloaders.push(imagePreloader)
    })

    Promise.all(imagesPreloaders)

    if (this.imageContainers.length > 1) {
      this.createArrows()
    }
  }

  private createArrows(): void {
    const leftArrow = new CarouselLeftArrow(this)
    this.appendChild(leftArrow.element)
    leftArrow.element.addEventListener('click', () => {
      if (this.timeOut != null) {
        return
      }
      this.lastShiftAnimationDirection = ShiftAnimationDirection.RIGHT
      this.setCurrentIndex(
        this.currentIndex === 0
          ? this.imageContainers.length - 1
          : this.currentIndex - 1
      )
    })

    const rightArrow = new CarouselRightArrow(this)
    this.appendChild(rightArrow.element)
    rightArrow.element.addEventListener('click', () => {
      if (this.timeOut != null) {
        return
      }
      this.lastShiftAnimationDirection = ShiftAnimationDirection.LEFT
      this.setCurrentIndex(
        this.currentIndex === this.imageContainers.length - 1
          ? 0
          : this.currentIndex + 1
      )
    })
  }

  private setCurrentIndex(currentIndex: number): void {
    this.previousIndex = this.currentIndex
    this.currentIndex = currentIndex
    this.runAnimations()
  }

  private runAnimations(): void {
    this.imageContainers[this.currentIndex].classList.remove(
      hiddenElementClassName
    )

    const shiftAnimationDirection = this.getLastShiftAnimationDirection()

    if (shiftAnimationDirection === ShiftAnimationDirection.UNDEFINED) {
      return
    }
    const isToTheRight =
      shiftAnimationDirection === ShiftAnimationDirection.RIGHT

    const previousImageContainerClass = isToTheRight
      ? fromMiddleToRightAnimationClassName
      : fromMiddleToLeftAnimationClassName
    this.imageContainers[this.previousIndex].classList.add(
      previousImageContainerClass
    )

    const currentImageContainerClass = isToTheRight
      ? fromLeftToMiddleAnimationClassName
      : fromRightToMiddleAnimationClassName
    this.imageContainers[this.currentIndex].classList.add(
      currentImageContainerClass
    )

    this.timeOut = setTimeout(() => {
      this.imageContainers[this.previousIndex].classList.remove(
        previousImageContainerClass
      )
      this.imageContainers[this.previousIndex].classList.add(
        hiddenElementClassName
      )

      this.imageContainers[this.currentIndex].classList.remove(
        currentImageContainerClass
      )

      this.clearTimeOut()
    }, Carousel.shiftAnimationDuration)
  }

  private clearTimeOut(): void {
    clearTimeout(this.timeOut)
    this.timeOut = undefined
  }
}
