import './slider';
import { ISliderSettings } from './helpers/interfaces';

describe('Slider / Test initialization', () => {
  document.body.innerHTML = '<div id="test" class="slider"></div>';
  const shadowSlider = document.querySelector('#test') as HTMLElement;
  shadowSlider.style.cssText = 'width: 300px';
  const $slider = $(shadowSlider);

  $slider.HYBSlider({
    min: 20,
    max: 150,
    isRange: true,
    from: 59,
    to: 120,
  });

  it('Should coincide constructor set', () => {
    const {
      max, min, isRange, orientation,
    } = $slider.HYBSlider('getSettings').get(0) as ISliderSettings;

    expect(isRange).toBeFalsy();
    expect(min).toEqual(0);
    expect(max).toEqual(100);
    expect(orientation).toEqual('horizontal');
  });
});

describe('Slider / Test empty initialization', () => {
  document.body.innerHTML = '<div id="test" class="slider"></div>';
  const shadowSlider = document.querySelector('#test') as HTMLElement;
  shadowSlider.style.cssText = 'width: 300px';
  const $slider = $(shadowSlider);

  $slider.HYBSlider();

  it('Should coincide constructor set', () => {
    const {
      max, min, isRange, orientation,
    } = $slider.HYBSlider('getSettings').get(0) as ISliderSettings;

    expect(isRange).toBeFalsy();
    expect(min).toEqual(0);
    expect(max).toEqual(100);
    expect(orientation).toEqual('horizontal');
  });
});

describe('Slider / Test dynamic set', () => {
  document.body.innerHTML = '<div id="test" class="slider"></div>';
  const shadowSlider = document.querySelector('#test') as HTMLElement;
  shadowSlider.style.cssText = 'width: 300px';
  const $slider = $(shadowSlider);

  $slider.HYBSlider({
    min: 20,
    max: 150,
    isRange: true,
    from: 59,
    to: 120,
  });

  it('Should coincide manual set', () => {
    $slider.HYBSlider('update', { min: 50 });
    expect($slider.HYBSlider('getSettings').get(0)).toEqual(50);
  });
  it('Should coincide manual multiple set', () => {
    $slider.HYBSlider('update', { max: 200, orientation: 'vertical', hasLine: false });
    const { max, orientation, hasLine } = $slider.HYBSlider('getSettings').get(0) as ISliderSettings;
    expect(max).toEqual(200);
    expect(orientation).toEqual('vertical');
    expect(hasLine).toEqual(false);
  });
});
