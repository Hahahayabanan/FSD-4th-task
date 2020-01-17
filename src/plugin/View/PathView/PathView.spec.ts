import { PathView } from './PathView';
import styleClasses from '../styleClasses';

document.body.innerHTML = '<div id="test" class="j-slider-plugin__slider"></div>';

describe('View / Path / Test of initialization', () => {
  const path = new PathView();

  it('Path should be initialized', () => {
    expect(path.pathElement).toHaveClass(styleClasses.PATH);
  });
});

describe('View / Path / Test of methods', () => {
  const path = new PathView();

  it('Line should be initialized', () => {
    path.toggleLine(true);
    expect(path.lineElement).toHaveClass(styleClasses.LINE);
  });

  it('Orientation class should be changed', () => {
    path.toggleOrientation(true);
    expect(path.pathElement).toHaveClass(styleClasses.PATH_VERTICAL);
  });

  it('Type class should be changed', () => {
    path.toggleLine(true);
    path.toggleLineType(true);
    expect(path.lineElement).toHaveClass(styleClasses.LINE_RANGE);
  });
});

describe('View / Path / Test of line update', () => {
  const path = new PathView();

  it('Line scope should be changed', () => {
    path.toggleLine(true);
    path.toggleLineType(true);
    path.setLineScope(20, 50);
    expect(path.lineElement.style.left).toEqual('20%');
    expect(path.lineElement.style.width).toEqual('30%');
  });
});
