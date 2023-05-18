import { carouselComponentTag } from './utils'
import { defineWebComponent } from '../core'
import Carousel from './carousel'

export default function importCarouselComponent(): void {
  defineWebComponent(carouselComponentTag, Carousel)
}
