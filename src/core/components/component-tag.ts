import { COMPONENT_TAG_PREFIX } from "../utils";

export default class ComponentTag {
    private value: string;

    constructor(componentName: string) {
        this.value = `${COMPONENT_TAG_PREFIX}-${componentName}`
    }

    toString() {
        return this.value;
    }
}