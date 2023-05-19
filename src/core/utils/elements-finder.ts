import { ComponentTag } from '../components';

export default class ElementsFinder {
  constructor(private root: HTMLElement) {}

  findByComponentTag(componentTag: ComponentTag): NodeListOf<HTMLElement> {
    return this.root.querySelectorAll<HTMLElement>(
      `.${componentTag.toString()}`
    );
  }
}
