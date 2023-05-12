import { inject } from "../../common";
import Carousel from "../carousel";
import CarouselArrow from "./carousel-arrow";

export default class CarouselRightArrow extends CarouselArrow {
    constructor(root: Carousel) {
        super('>');
        const rootRightPaddingValue = inject(Window).getComputedStyle(root).getPropertyValue('padding-right');
        this.element.style.right = rootRightPaddingValue;
    }
}