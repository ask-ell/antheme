import { importCarouselComponent } from '.';
import { carouselComponentTag } from './utils';
import { encrypt } from '../core';
import { fakeImagesMock, imagesMock } from './carousel.mock';

importCarouselComponent();

export default {
  title: "Components/Carousel"
};

const style = "width: 100%; height: 400px;"

export const WithoutInputs = {
  name: 'Without images',
  render: () => `<${carouselComponentTag.toString()} style="${style}"></${carouselComponentTag.toString()}>`
}

export const WithImages = {
  name: 'With images',
  render: () => `<${carouselComponentTag.toString()} style="${style}" images="${encrypt(imagesMock)}"></${carouselComponentTag.toString()}>`
}

export const WithFailingLoading = {
  name: 'With failing loading',
  render: () => `<${carouselComponentTag.toString()} style="${style}" images="${encrypt(fakeImagesMock)}"></${carouselComponentTag.toString()}>`
}
