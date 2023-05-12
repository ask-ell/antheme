import { importCarouselComponent } from '.';
import { carouselComponentTag } from './utils';
import _Image from './image';
import { encrypt } from '../common';

importCarouselComponent();

export default {
  title: "Components/Carousel"
};

const style = "width: 100%; height: 400px;"

export const WithoutInputs = {
  name: 'Without images',
  render: () => `<${carouselComponentTag.toString()} style="${style}"></${carouselComponentTag.toString()}>`
}

const images = [...Array(3).keys()].map((_, index) => ({
  src: `https://images.pexels.com/photos/266211${index}/pexels-photo-266211${index}.jpeg?auto=compress&cs=tinysrgb&w=1600`
} as _Image));

export const WithImages = {
  name: 'With images',
  render: () => `<${carouselComponentTag.toString()} style="${style}" images="${encrypt(images)}"></${carouselComponentTag.toString()}>`
}

export const WithFailingLoading = {
  name: 'With failing loading',
  render: () => `<${carouselComponentTag.toString()} style="${style}" images="${encrypt([{ src: "fakeurl.com" }, { src: "fakeurl2.com" }])}"></${carouselComponentTag.toString()}>`
}
