import { ComponentTag } from "../components";
import CommonError from "./common.error";

export default class EvenDefinedComponentError extends CommonError {
    constructor(componentTag: ComponentTag) {
        super(`"${componentTag.toString()}" is event defined`);
    }
}