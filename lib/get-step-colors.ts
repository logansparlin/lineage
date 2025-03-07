const stepColors = {
  'one': {
    100: 'var(--color-orange-100)',
    200: 'var(--color-orange-200)',
    300: 'var(--color-orange-300)',
    400: 'var(--color-orange-400)',
  },
  'two': {
    100: 'var(--color-green-100)',
    200: 'var(--color-green-200)',
    300: 'var(--color-green-300)',
    400: 'var(--color-green-400)',
  },
  'three': {
    100: 'var(--color-blue-100)',
    200: 'var(--color-blue-200)',
    300: 'var(--color-blue-300)',
    400: 'var(--color-blue-400)',
  },
  'four': {
    100: 'var(--color-pink-100)',
    200: 'var(--color-pink-200)',
    300: 'var(--color-pink-300)',
    400: 'var(--color-pink-400)',
  }
}

const stepColorsRGB = {
  'one': {
    100: 'rgb(254, 243, 205)',
    200: 'rgb(251, 197, 4)',
    300: 'rgb(254, 152, 7)',
    400: 'rgb(244, 67, 24)',
  },
  'two': {
    100: 'rgb(204, 242, 221)',
    200: 'rgb(0, 191, 87)',
    300: 'rgb(0, 140, 95)',
    400: 'rgb(0, 89, 33)',
  },
  'three': {
    100: 'rgb(204, 243, 255)',
    200: 'rgba(1, 194, 255, 1)',
    300: 'rgba(8, 126, 238, 1)',
    400: 'rgba(14, 59, 221, 1)',
  },
  'four': {
    100: 'rgb(254, 229, 243)',
    200: 'rgba(255, 126, 197, 1)',
    300: 'rgba(174, 79, 242, 1)',
    400: 'rgba(89, 0, 255, 1)',
  }
}

export const getStepColors = (step: string) => {
  return stepColors[step]
}

export const getStepColorsRGB = (step: string) => {
  return stepColorsRGB[step]
}
