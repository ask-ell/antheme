export default {
  title: 'Core/Colors'
}

const colorLabels = [
  'Background color light',
  'Background color dark',
  'Button background color hover',
  'Primary color',
  'Text color',
  'Text color secondary'
]

function getClassFromColorLabel(colorLabel: string): string {
  return colorLabel
    .split(' ')
    .map((word) => word.toLowerCase())
    .join('-')
}

export const Colors = {
  render: () =>
    colorLabels
      .map(
        (label) =>
          `<div class='color-marker ask-ell-flat-${getClassFromColorLabel(
            label
          )}'>${label}</div>`
      )
      .join('')
}
