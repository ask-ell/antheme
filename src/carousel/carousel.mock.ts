import { type CustomImage } from '../core'

export const imagesMock: CustomImage[] = [...Array(3).keys()].map(
  (_, index): CustomImage => ({
    src: `https://images.pexels.com/photos/266211${index}/pexels-photo-266211${index}.jpeg?auto=compress&cs=tinysrgb&w=1600`
  })
)

export const fakeImagesMock: CustomImage[] = [...Array(2).keys()].map(
  (_, index): CustomImage => ({
    src: `fakeurl${index}.com`
  })
)
