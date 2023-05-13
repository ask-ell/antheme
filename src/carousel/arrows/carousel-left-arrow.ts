import { inject } from "../../core";
import Carousel from "../carousel";
import CarouselArrow from "./carousel-arrow";

export default class CarouselLeftArrow extends CarouselArrow {
    constructor(root: Carousel) {
        super('<');
        const rootLeftPaddingValue = inject(Window).getComputedStyle(root).getPropertyValue('padding-left');
        this.element.style.left = rootLeftPaddingValue;
    }
}