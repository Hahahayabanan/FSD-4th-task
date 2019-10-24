import { SliderTemplate } from './SliderTemplate';
import { SliderPointer } from './SliderPointer';

document.body.innerHTML = '<div id="test" class="slider"></div>';

const shadowSlider = document.querySelector('#test') as HTMLElement;

describe('View / Slider template / Test of initialization parameters', () => {
  let slider: SliderTemplate;

  beforeEach(() => {
    slider = new SliderTemplate({
      rootElem: shadowSlider,
      isVertical: true,
      isFollowerPoint: true,
    });
  });

  it('Slider pointer should be set', () => {
    expect(slider.thumb0).toBeDefined(SliderPointer);
  });

  it('Slider class with point should be set', () => {
    expect(slider.slider).toHaveClass(slider.styleClasses.SLIDER_WITH_POINT);
  });

  it('Slider class vertical should be set', () => {
    expect(slider.slider).toHaveClass(slider.styleClasses.SLIDER_VERTICAL);
  });

  it('Slider should be vertical', () => {
    expect(slider.isVertical).toBeTruthy();
  });
});

describe('View / Slider template / Test of initialization pointers', () => {
  const slider = new SliderTemplate({
    rootElem: shadowSlider,
    isRange: true,
  });

  it('Slider pointers should be set', () => {
    expect(slider.thumb0).toBeDefined(SliderPointer);
    expect(slider.thumb1).toBeDefined(SliderPointer);
  });
});

describe('View / Slider template / Test of calculations', () => {
  let slider: SliderTemplate;

  beforeEach(() => {
    slider = new SliderTemplate({
      rootElem: shadowSlider,
      isRange: true,
    });
    slider.thumb0.setCurPosInPercents(20);
    slider.thumb1.setCurPosInPercents(50);
    slider.thumb0.renderCurrentPosInPercents(20);
    slider.thumb1.renderCurrentPosInPercents(50);
  });

  it('calculateAndApplyRangeLine', async () => {
    await slider.calculateAndApplyRangeLine();
    expect(slider.range.style.width).toEqual('30%');
  });

  it('setDataAttribute', async () => {
    await slider.setDataAttribute('value', '99');
    expect(slider.slider.dataset.value).toEqual('99');
  });

  it('Update z-index', async () => {
    await slider.updateZIndex(slider.thumb1);
    expect(slider.thumb1.thumbHTMLElem).toHaveClass(
      slider.styleClasses.THUMB_SELECTED,
    );
  });

  it('destroy', async () => {
    await slider.destroy();
    expect(slider.thumb1).toBeUndefined();
    expect(slider.slider).toBeUndefined();
  });
});
