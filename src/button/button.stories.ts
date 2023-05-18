import { buttonComponentTag } from './utils'

export default {
  title: 'Components/Button'
}

export const Button = {
  render: () =>
    `<button class="${buttonComponentTag.toString()}">This is a button</button>`
}
