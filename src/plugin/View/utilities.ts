export function createNode(type: string, HTMLClass: string = '') {
  const node: HTMLElement = document.createElement(type);
  node.classList.add(HTMLClass);

  return node;
}

export function calculateToPixels(options: {
  valueInPercents: number,
  pathElement: HTMLElement,
  isVertical: boolean,
}) {
  const { valueInPercents, pathElement, isVertical } = options;
  const lengthInPixels: number = isVertical ? pathElement.getBoundingClientRect().height
      || parseInt(pathElement.style.height, 10) : pathElement.getBoundingClientRect().width
      || parseInt(pathElement.style.width, 10);

  const valueInPixels = (valueInPercents / 100) * lengthInPixels;
  return valueInPixels;
}

export function calculateToPercents(options: {
  valueInPixels: number,
  pathElement: HTMLElement,
  isVertical: boolean,
}) {
  const { valueInPixels, pathElement, isVertical } = options;
  const lengthInPixels: number = isVertical ? pathElement.getBoundingClientRect().height
    || parseInt(pathElement.style.height, 10) : pathElement.getBoundingClientRect().width
    || parseInt(pathElement.style.width, 10);

  const valueInPercents = (valueInPixels * 100) / lengthInPixels;
  return valueInPercents;
}
