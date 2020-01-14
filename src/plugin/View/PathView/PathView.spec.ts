import { PathView } from './PathView';
import { MainView } from '../MainView/MainView';

document.body.innerHTML = '<div id="test" class="j-slider-plugin__slider"></div>';

const path = new PathView({ isVertical: false, hasLine: true });

describe('View / Path / Test of setting', () => {
  it('Path should be initialized', () => {
    expect(path.pathElement).toHaveClass('j-plugin-slider__path');
  });
  it('Line should be initialized', () => {
    expect(path.lineElement).toHaveClass('j-plugin-slider__path-line');
  });
});

describe('View / Path / Test of setting', () => {
  document.body.innerHTML = '<div id="test" class="slider"></div>';
  const shadowSlider = document.querySelector('#test') as HTMLElement;
  const view: MainView = new MainView({ rootElem: shadowSlider, isRange: true, hasLine: true });

  it('Line should be updated', () => {
    view.setPointerPosition({ first: 10, second: 50 });
    expect(view.path.lineElement.style.left).toEqual('10%');
  });
});
