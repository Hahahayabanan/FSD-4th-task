import { MainView } from './MainView';
import { PointerView } from '../PointerView/PointerView';
import styleClasses from '../styleClasses';

document.body.innerHTML = '<div id="test" class="slider"></div>';

const shadowSlider = document.querySelector('#test') as HTMLElement;

describe('View / Slider template / Test of initialization parameters', () => {
  const view: MainView = new MainView({ rootElem: shadowSlider });

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
    expect(view.sliderHTML).toHaveClass(
      styleClasses.SLIDER_WITH_TIP,
    );
  });

  it('Slider class vertical should be set', () => {
    expect(view.sliderHTML).toHaveClass(styleClasses.SLIDER_VERTICAL);
  });

  it('Slider should be vertical', () => {
    expect(view.isVertical).toBeTruthy();
  });
});

describe('View / Slider template / Test of initialization pointers', () => {
  const slider = new MainView({
    rootElem: shadowSlider,
    isRange: true,
  });

  it('Slider pointers should be set', () => {
    expect(slider.firstPointer).toBeDefined(PointerView);
    expect(slider.secondPointer).toBeDefined(PointerView);
  });
});

describe('View / Slider template / Test of calculations', () => {
  const view: MainView = new MainView({ rootElem: shadowSlider });

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
    expect(view.sliderHTML.dataset.from).toEqual('99');
  });

  it('Test of get clear', () => {
    view.getClear();
    expect(view.firstPointer).toBeNull();
    expect(view.secondPointer).toBeNull();
  });
});
