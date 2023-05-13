import { ComponentTag } from '../core'

export const carouselComponentTag = new ComponentTag('carousel');
export const carouselImageContainerComponentTag = new ComponentTag('carousel-image-container');
export const carouselArrowComponentTag = new ComponentTag('carousel-arrow');

export const hiddenElementClassName = `${carouselImageContainerComponentTag.toString()}-hidden`;
export const fromMiddleToLeftAnimationClassName = `${carouselImageContainerComponentTag.toString()}-from-middle-to-left`;
export const fromMiddleToRightAnimationClassName = `${carouselImageContainerComponentTag.toString()}-from-middle-to-right`;
export const fromLeftToMiddleAnimationClassName = `${carouselImageContainerComponentTag.toString()}-from-left-to-middle`;
export const fromRightToMiddleAnimationClassName = `${carouselImageContainerComponentTag.toString()}-from-right-to-middle`;