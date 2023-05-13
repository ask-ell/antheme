import { CustomImage } from "../core";

export const imagesMock = [...Array(3).keys()].map((_, index) => ({
    src: `https://images.pexels.com/photos/266211${index}/pexels-photo-266211${index}.jpeg?auto=compress&cs=tinysrgb&w=1600`
} as CustomImage));

export const fakeImagesMock = [...Array(2).keys()].map((_, index) => ({
    src: `fakeurl${index}.com`
} as CustomImage));