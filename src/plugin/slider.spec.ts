import './slider';
import { ISliderSettings } from './Model/ISliderSettings';

describe('Slider / Test of initialization', () => {
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
      max, min, isRange, isVertical,
    } = $slider.HYBSlider('getSettings').get(0) as ISliderSettings;

    expect(isRange).toBeTruthy();
    expect(min).toEqual(20);
    expect(max).toEqual(150);
    expect(isVertical).toBeFalsy();
  });
});

describe('Slider / Test of empty initialization', () => {
  document.body.innerHTML = '<div id="test" class="slider"></div>';
  const shadowSlider = document.querySelector('#test') as HTMLElement;
  shadowSlider.style.cssText = 'width: 300px';
  const $slider = $(shadowSlider);

  $slider.HYBSlider();

  it('Should coincide default settings', () => {
    const {
      max, min, isRange, isVertical,
    } = $slider.HYBSlider('getSettings').get(0) as ISliderSettings;

    expect(isRange).toBeFalsy();
    expect(min).toEqual(0);
    expect(max).toEqual(100);
    expect(isVertical).toBeFalsy();
  });
});

describe('Slider / Test of getters and setters', () => {
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
    $slider.HYBSlider('setSettings', { min: 50 });
    const { min } = $slider.HYBSlider('getSettings').get(0) as ISliderSettings;
    expect(min).toEqual(50);
  });

  it('Should coincide manual multiple set', () => {
    $slider.HYBSlider('setSettings', { max: 200, isVertical: true, hasLine: false });
    const { max, isVertical, hasLine } = $slider.HYBSlider('getSettings').get(0) as ISliderSettings;
    expect(max).toEqual(200);
    expect(isVertical).toBeTruthy();
    expect(hasLine).toBeFalsy();
  });

  it('Should coincide callback return', () => {
    $slider.HYBSlider('callbackOnUpdate', (options: ISliderSettings) => {
      expect(options.from).toEqual(82);
    });
    $slider.HYBSlider('setSettings', { from: 82 });
  });
});
