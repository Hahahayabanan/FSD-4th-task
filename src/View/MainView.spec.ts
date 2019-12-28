import { MainView } from './MainView';
import { PointerView } from './PointerView';
import styleClasses from './styleClasses';

document.body.innerHTML = '<div id="test" class="slider"></div>';

const shadowSlider = document.querySelector('#test') as HTMLElement;

describe('View / Slider template / Test of initialization parameters', () => {
  const slider: MainView = new MainView({ rootElem: shadowSlider });

  beforeEach(() => {
    slider.update({
      isVertical: true,
      hasTip: true,
    });
  });

  it('Slider pointer should be set', () => {
    expect(slider.pointer0).toBeDefined(PointerView);
  });

  it('Slider class with point should be set', () => {
    expect(slider.sliderHTML).toHaveClass(
      styleClasses.SLIDER_WITH_TIP,
    );
  });

  it('Slider class vertical should be set', () => {
    expect(slider.sliderHTML).toHaveClass(styleClasses.SLIDER_VERTICAL);
  });

  it('Slider should be vertical', () => {
    expect(slider.isVertical).toBeTruthy();
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
  const slider: MainView = new MainView({ rootElem: shadowSlider });

  beforeEach(() => {
    slider.update({
      isRange: true,
      hasTip: true,
    });
    slider.pointer0.applyPointerPosition(20);
    slider.pointer1.applyPointerPosition(50);
    slider.pointer0.render(20);
    slider.pointer1.render(50);
  });

  it('Test of set data attribute', () => {
    slider.setDataAttributes({ from: 99 });
    expect(slider.sliderHTML.dataset.from).toEqual('99');
  });

  it('Test of get clear', () => {
    slider.getClear();
    expect(slider.pointer0).toBeNull();
    expect(slider.pointer1).toBeNull();
  });
});
