import { EvenDefinedComponentError } from '../errors';
import { inject } from '../dependencies-injection';
import ComponentTag from './component-tag';

export default function defineWebComponent(
  componentTag: ComponentTag,
  _constructor: CustomElementConstructor
) {
  if (inject(Window).customElements.get(componentTag.toString())) {
    throw new EvenDefinedComponentError(componentTag);
  }

  inject(Window).customElements.define(componentTag.toString(), _constructor);
  console.log(inject(Window).customElements.get(componentTag.toString()));
}
