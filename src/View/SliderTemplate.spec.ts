import { SliderTemplate } from './SliderTemplate';
import { SliderPointer } from './SliderPointer';

document.body.innerHTML = '<div id="test" class="slider"></div>';

const shadowSlider = document.querySelector('#test') as HTMLElement;

describe('View / Slider template / Test of setting pointer positions', () => {
  const slider = new SliderTemplate({
    rootElem: shadowSlider,
    isVertical: true,
    isFollowerPoint: true,
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

describe('View / Slider template / Test of setting pointer positions', () => {
  const slider = new SliderTemplate({
    rootElem: shadowSlider,
    isRange: true,
  });

  it('Slider pointers should be set', () => {
    expect(slider.thumb0).toBeDefined(SliderPointer);
    expect(slider.thumb1).toBeDefined(SliderPointer);
  });
});
