import { TemplateView } from './TemplateView';
import { PointerView } from './PointerView';

document.body.innerHTML = '<div id="test" class="slider"></div>';

const shadowSlider = document.querySelector('#test') as HTMLElement;

describe('View / Slider template / Test of initialization parameters', () => {
  let slider: TemplateView;

  beforeEach(() => {
    slider = new TemplateView({
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
  const slider = new TemplateView({
    rootElem: shadowSlider,
    isRange: true,
  });

  it('Slider pointers should be set', () => {
    expect(slider.pointer0).toBeDefined(PointerView);
    expect(slider.pointer1).toBeDefined(PointerView);
  });
});

describe('View / Slider template / Test of calculations', () => {
  let slider: TemplateView;

  beforeEach(() => {
    slider = new TemplateView({
      rootElem: shadowSlider,
      isRange: true,
      hasTip: true,
    });
    slider.pointer0.setPointerPosition(20);
    slider.pointer1.setPointerPosition(50);
    slider.pointer0.renderCurrentPosInPercents(20);
    slider.pointer1.renderCurrentPosInPercents(50);
  });

  it('setDataAttribute', async () => {
    await slider.setDataAttribute('value', '99');
    expect(slider.sliderHTML.dataset.value).toEqual('99');
  });

  it('Update z-index', async () => {
    await slider.updateZIndex(slider.pointer1);
    expect(slider.pointer1.pointerHTML).toHaveClass(
      slider.styleClasses.THUMB_SELECTED,
    );
  });

  it('setTipValue', async () => {
    await slider.setTipValue([256, 128]);
    expect(slider.pointer0.tip.tipHTML.textContent).toEqual('256');
  });

  it('getClear', async () => {
    await slider.getClear();
    expect(slider.pointer0).toBeUndefined();
    expect(slider.pointer1).toBeUndefined();
  });
});
