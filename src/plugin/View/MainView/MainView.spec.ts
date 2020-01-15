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
    expect(view.firstPointer).toBeDefined(PointerView);
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
    expect(slider.firstPointer).toBeDefined(PointerView);
    expect(slider.secondPointer).toBeDefined(PointerView);
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
    view.firstPointer.applyPointerPosition(20);
    view.secondPointer.applyPointerPosition(50);
    view.firstPointer.render(20);
    view.secondPointer.render(50);
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
    expect(view.secondPointer).toBeTruthy();
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
    expect(view.firstPointer.tip).toBeTruthy();
  });
});
