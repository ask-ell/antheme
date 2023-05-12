import { importCarouselComponent } from '.';
import { carouselComponentTag } from './utils';
import _Image from './image';
import { encrypt } from '../common';

importCarouselComponent();

export default {
  title: "Components/Carousel",
  component: carouselComponentTag.toString()
};

export const WithoutInputs = {
  name: 'Without inputs',
  render: () => `<${carouselComponentTag.toString()} width="500px"></${carouselComponentTag.toString()}>`
}

const images = [...Array(5).keys()].map((_, index) => ({
  src: `https://images.pexels.com/photos/266211${index}/pexels-photo-266211${index}.jpeg?auto=compress&cs=tinysrgb&w=1600`
} as _Image));

export const WithImages = {
  name: 'With images',
  render: () => `<${carouselComponentTag.toString()} width="500px" images="${encrypt(images)}"></${carouselComponentTag.toString()}>`
}
