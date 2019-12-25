import { MainView } from './MainView';
import { PointerView } from './PointerView';

document.body.innerHTML = '<div id="test" class="slider"></div>';

const shadowSlider = document.querySelector('#test') as HTMLElement;

describe('View / Slider template / Test of initialization parameters', () => {
  let slider: MainView;

  beforeEach(() => {
    slider = new MainView({
      rootElem: shadowSlider,
      isVertical: true,
      hasTip: true,
    });
  });

  it('Slider pointer should be set', () => {
    expect(slider.pointer0).toBeDefined(PointerView);
  });

  it('Slider class with point should be set', () => {
    expect(slider.sliderHTML).toHaveClass(
      slider.styleClasses.SLIDER_WITH_POINT,
    );
  });

  it('Slider class vertical should be set', () => {
    expect(slider.sliderHTML).toHaveClass(slider.styleClasses.SLIDER_VERTICAL);
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
  let slider: MainView;

  beforeEach(() => {
    slider = new MainView({
      rootElem: shadowSlider,
      isRange: true,
      hasTip: true,
    });
    slider.pointer0.setPointerPosition(20);
    slider.pointer1.setPointerPosition(50);
    slider.pointer0.renderInPercents(20);
    slider.pointer1.renderInPercents(50);
  });

  it('Test of set data attribute', () => {
    slider.setDataAttributes([{ name: 'from', value: '99' }]);
    expect(slider.sliderHTML.dataset.from).toEqual('99');
  });

  it('Test of get clear', () => {
    slider.getClear();
    expect(slider.pointer0).toBeNull();
    expect(slider.pointer1).toBeNull();
  });
});
