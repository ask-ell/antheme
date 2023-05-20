import { type AskellImage } from '../core'

function imageFactory(_: unknown, index: number): AskellImage {
  return {
    src: `https://images.pexels.com/photos/266211${index}/pexels-photo-266211${index}.jpeg?auto=compress&cs=tinysrgb&w=1600`
  }
}

export const imagesMock: AskellImage[] = [...Array(3).keys()].map(imageFactory)

function fakeImageFactory(_: unknown, index: number): AskellImage {
  return {
    src: `fakeurl${index}.com`
  }
}

export const fakeImagesMock: AskellImage[] = [...Array(2).keys()].map(
  fakeImageFactory
)
