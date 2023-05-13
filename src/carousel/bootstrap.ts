import { carouselComponentTag } from "./utils";
import { defineWebComponent } from "../core";
import Carousel from "./carousel";

export default function importCarouselComponent() {
    defineWebComponent(carouselComponentTag, Carousel);
}