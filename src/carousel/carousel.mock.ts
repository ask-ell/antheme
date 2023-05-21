import { type AnthemeImage } from '../core'

function imageFactory(_: unknown, index: number): AnthemeImage {
  return {
    src: `https://images.pexels.com/photos/266211${index}/pexels-photo-266211${index}.jpeg?auto=compress&cs=tinysrgb&w=1600`
  }
}

export const imagesMock: AnthemeImage[] = [...Array(3).keys()].map(imageFactory)

function fakeImageFactory(_: unknown, index: number): AnthemeImage {
  return {
    src: `fakeurl${index}.com`
  }
}

export const fakeImagesMock: AnthemeImage[] = [...Array(2).keys()].map(
  fakeImageFactory
)
