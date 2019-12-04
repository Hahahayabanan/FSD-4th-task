import './slider';

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
    expect($slider.HYBSlider('getSetting', 'isRange').get(0)).toBeTruthy();
    expect($slider.HYBSlider('getSetting', 'min').get(0)).toEqual(20);
    expect($slider.HYBSlider('getSetting', 'max').get(0)).toEqual(150);
    expect($slider.HYBSlider('getSetting', 'orientation').get(0)).toEqual('horizontal');
  });
});

describe('Slider / Test empty initialization', () => {
  document.body.innerHTML = '<div id="test" class="slider"></div>';
  const shadowSlider = document.querySelector('#test') as HTMLElement;
  shadowSlider.style.cssText = 'width: 300px';
  const $slider = $(shadowSlider);

  $slider.HYBSlider();

  it('Should coincide constructor set', () => {
    expect($slider.HYBSlider('getSetting', 'isRange').get(0)).toBeFalsy();
    expect($slider.HYBSlider('getSetting', 'min').get(0)).toEqual(0);
    expect($slider.HYBSlider('getSetting', 'max').get(0)).toEqual(100);
    expect($slider.HYBSlider('getSetting', 'orientation').get(0)).toEqual('horizontal');
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
    expect($slider.HYBSlider('getSetting', 'min').get(0)).toEqual(50);
  });
  it('Should coincide manual multiple set', () => {
    $slider.HYBSlider('update', { max: 200, orientation: 'vertical', hasLine: false });
    expect($slider.HYBSlider('getSetting', 'max').get(0)).toEqual(200);
    expect($slider.HYBSlider('getSetting', 'orientation').get(0)).toEqual('vertical');
    expect($slider.HYBSlider('getSetting', 'hasLine').get(0)).toEqual(false);
  });
});
