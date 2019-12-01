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
    expect($slider.HYBGetOption('isRange').get(0)).toBeTruthy();
    expect($slider.HYBGetOption('min').get(0)).toEqual(20);
    expect($slider.HYBGetOption('max').get(0)).toEqual(150);
    expect($slider.HYBGetOption('orientation').get(0)).toEqual('horizontal');
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
    $slider.HYBUpdate({ min: 50 });
    expect($slider.HYBGetOption('min').get(0)).toEqual(50);
  });
});
