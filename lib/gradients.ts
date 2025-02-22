import { shuffleArray } from "./shuffle-array";

const orange = {
  label: 'orange',
  inner: '#F44318',
  outer: '#FE9807'
}

const pink = {
  label: 'pink',
  inner: '#5900FF',
  outer: '#AE4FF2'
}

const green = {
  label: 'green',
  inner: '#005921',
  outer: '#008C5F'
}

const blue = {
  label: 'blue',
  inner: '#0E3BDD',
  outer: '#087EEE'
}

export const gradients = [orange, pink, green, blue];

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
  return gradients.find((gradient) => gradient.label === label);
}