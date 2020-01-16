import { PathView } from './PathView';

document.body.innerHTML = '<div id="test" class="j-slider-plugin__slider"></div>';

const path = new PathView();

describe('View / Path / Test of setting', () => {
  it('Path should be initialized', () => {
    expect(path.pathElement).toHaveClass('j-plugin-slider__path');
  });
  it('Line should be initialized', () => {
    path.toggleLine(true);
    expect(path.lineElement).toHaveClass('j-plugin-slider__path-line');
  });
});
