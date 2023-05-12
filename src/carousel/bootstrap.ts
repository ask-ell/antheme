import { carouselComponentTag } from "./utils";
import { defineWebComponent } from "../common";
import Carousel from "./carousel";

export default function importCarouselComponent() {
    defineWebComponent(carouselComponentTag, Carousel);
}