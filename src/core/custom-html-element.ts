import { ComponentTag } from "./components";

export default abstract class CustomHTMLElement extends HTMLElement {
    findElementsByComponentTag(componentTag: ComponentTag) {
        return this.querySelectorAll<HTMLElement>(`.${componentTag.toString()}`);
    }
}