export interface Gradient {
  label: string;
  inner: string;
  outer: string;
}

const orange: Gradient = {
  label: 'orange',
  outer: '#F44318',
  inner: '#FE9807'
}

const pink: Gradient = {
  label: 'pink',
  outer: '#5900FF',
  inner: '#AE4FF2'
}

const green: Gradient = {
  label: 'green',
  outer: '#005921',
  inner: '#008C5F'
}

const blue: Gradient = {
  label: 'blue',
  outer: '#0E3BDD',
  inner: '#087EEE'
}

const stepGradients = {
  'one': orange,
  'two': green,
  'three': blue,
  'four': pink
}

export const gradients: Gradient[] = [orange, pink, green, blue];

export const getRandomGradient = () => {
  const isWindow = typeof window !== 'undefined';

  const lastGradient = isWindow ? localStorage.getItem('lineage_home_gradient') : null;
  const lastGradientIndex = gradients.findIndex((gradient) => gradient.label === lastGradient);

  let newGradient;

  if (lastGradientIndex === -1) {
    newGradient = gradients[Math.floor(Math.random() * gradients.length)];
  } else {
    newGradient = gradients[(lastGradientIndex + 1) % gradients.length];
  }

  if (isWindow) {
    localStorage.setItem('lineage_home_gradient', newGradient.label);
  }

  return newGradient;
}

export const getGradient = (label: string) => {
  return stepGradients[label] ?? gradients.find((gradient) => gradient.label === label);
}