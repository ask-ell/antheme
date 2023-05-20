import { type ComponentTag } from './components'

export default abstract class AskellHTMLElement extends HTMLElement {
  findElementsByComponentTag(
    componentTag: ComponentTag
  ): NodeListOf<HTMLElement> {
    return this.querySelectorAll<HTMLElement>(`.${componentTag.toString()}`)
  }
}
