export default function createNode(type: string, HTMLClass: string = '') {
  const node: HTMLElement = document.createElement(type);
  node.classList.add(HTMLClass);

  return node;
}
