import { PathView } from './PathView';
import styleClasses from '../styleClasses';

document.body.innerHTML = '<div id="test" class="j-slider-plugin__slider"></div>';

describe('View / Path / Test of initialization', () => {
  const path = new PathView();

  it('Path should be initialized', () => {
    expect(path.pathElement).toHaveClass(styleClasses.PATH);
  });

  it('Slider pointer should be set', () => {
    expect(path.fromValuePointer).toBeDefined();
  });

  it('Both slider pointers should be set', () => {
    expect(path.fromValuePointer).toBeDefined();
    expect(path.toValuePointer).toBeDefined();
  });
});

describe('View / Path / Test of methods', () => {
  const path = new PathView();
  const options = {
    isRange: false,
    isVertical: true,
    hasTip: false,
    hasLine: true,
  };

  it('Pointer position should coincide', () => {
    path.toggleRange(true);
    path.setPointerPosition({ fromValue: 50, toValue: 100, options });
    expect(path.fromValuePointer.currentPosition).toEqual(50);
    expect(path.toValuePointer.currentPosition).toEqual(100);
  });

  it('Line should be initialized', () => {
    path.toggleLine(options);
    expect(path.lineElement).toHaveClass(styleClasses.LINE);
  });

  it('ToValuePointer should be initialized by using toggleRange', () => {
    path.toggleRange(true);
    expect(path.toValuePointer).toBeDefined();
  });

  it('Tip should be initialized by using toggleTip', () => {
    path.toggleTip(true);
    expect(path.fromValuePointer.tip).toBeDefined();
  });
});


describe('View / Path / Test of pointer update', () => {
  const path = new PathView();
  const options = {
    isRange: false,
    isVertical: true,
    hasTip: false,
    hasLine: true,
  };

  it('Pointer position should coincide', () => {
    path.toggleRange(false);
    path.setPointerPosition({ fromValue: 50, toValue: 100, options });
    expect(path.fromValuePointer.currentPosition).toEqual(50);
    expect(path.toValuePointer).toBeNull();
  });
});
