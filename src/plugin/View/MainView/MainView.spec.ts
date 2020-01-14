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
    expect(view.pointer0).toBeDefined(PointerView);
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
    expect(slider.pointer0).toBeDefined(PointerView);
    expect(slider.pointer1).toBeDefined(PointerView);
  });
});

describe('View / Slider template / Test of calculations', () => {
  const view: MainView = new MainView({ rootElem: shadowSlider });

  beforeEach(() => {
    view.update({
      isRange: true,
      hasTip: true,
    });
    view.pointer0.applyPointerPosition(20);
    view.pointer1.applyPointerPosition(50);
    view.pointer0.render(20);
    view.pointer1.render(50);
  });

  it('Test of set data attribute', () => {
    view.setDataAttributes({ from: 99 });
    expect(view.sliderHTML.dataset.from).toEqual('99');
  });

  it('Test of get clear', () => {
    view.getClear();
    expect(view.pointer0).toBeNull();
    expect(view.pointer1).toBeNull();
  });
});
