export const getPositionBetween = (elementOne: HTMLElement, elementTwo: HTMLElement) => {
  if (!elementOne || !elementTwo) return 0;
  
  const rectOne = elementOne.getBoundingClientRect();
  const rectTwo = elementTwo.getBoundingClientRect();

  const elementOneBottom = rectOne.top + rectOne.height;
  const elementTwoTop = rectTwo.top;

  return elementTwoTop - elementOneBottom;
};
