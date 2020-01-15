import { MainView } from './MainView';
import { PointerView } from '../PointerView/PointerView';
import styleClasses from '../styleClasses';

document.body.innerHTML = '<div id="test" class="slider"></div>';

const shadowSlider = document.querySelector('#test') as HTMLElement;

describe('View / Slider template / Test of initialization parameters', () => {
  const view: MainView = new MainView({
    rootElem: shadowSlider,
    isRange: false,
    isVertical: false,
    hasLine: false,
    hasTip: false,
  });

  beforeEach(() => {
    view.update({
      isVertical: true,
      hasTip: true,
    });
  });

  it('Slider pointer should be set', () => {
    expect(view.fromValuePointer).toBeDefined(PointerView);
  });

  it('Slider class with point should be set', () => {
    expect(view.sliderElement).toHaveClass(
      styleClasses.SLIDER_WITH_TIP,
    );
  });

  it('Slider class vertical should be set', () => {
    expect(view.sliderElement).toHaveClass(styleClasses.SLIDER_VERTICAL);
  });
});

describe('View / Slider template / Test of initialization pointers', () => {
  const slider = new MainView({
    rootElem: shadowSlider,
    isRange: true,
    isVertical: false,
    hasLine: false,
    hasTip: false,
  });

  it('Slider pointers should be set', () => {
    expect(slider.fromValuePointer).toBeDefined(PointerView);
    expect(slider.toValuePointer).toBeDefined(PointerView);
  });
});

describe('View / Slider template / Test of calculations', () => {
  const view: MainView = new MainView({
    rootElem: shadowSlider,
    isRange: false,
    isVertical: false,
    hasLine: false,
    hasTip: false,
  });

  beforeEach(() => {
    view.update({
      isRange: true,
      hasTip: true,
    });
    view.fromValuePointer.applyPointerPosition(20);
    view.toValuePointer.applyPointerPosition(50);
    view.fromValuePointer.render(20);
    view.toValuePointer.render(50);
  });

  it('Test of set data attribute', () => {
    view.setDataAttributes({ from: 99 });
    expect(view.sliderElement.dataset.from).toEqual('99');
  });
});

describe('View / Slider template / Test of update', () => {
  const view: MainView = new MainView({
    rootElem: shadowSlider,
    isRange: false,
    isVertical: false,
    hasLine: false,
    hasTip: false,
  });

  it('Test of set range', () => {
    view.update({
      isRange: true,
    });
    expect(view.toValuePointer).toBeTruthy();
  });

  it('Test of set range', () => {
    view.update({
      isVertical: true,
    });
    expect(view.sliderElement.classList.contains(styleClasses.SLIDER_VERTICAL)).toBeTrue();
  });

  it('Test of set range', () => {
    view.update({
      hasLine: true,
    });
    expect(view.path.lineElement).toBeTruthy();
  });

  it('Test of set range', () => {
    view.update({
      hasTip: true,
    });
    expect(view.fromValuePointer.tip).toBeTruthy();
  });
});
