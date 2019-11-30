import './slider';

describe('Presenter / Presenter / Test initialization', () => {
  document.body.innerHTML = '<div id="test" class="slider"></div>';
  const shadowSlider = document.querySelector('#test') as HTMLElement;
  shadowSlider.style.cssText = 'width: 300px';
  const $slider = $(shadowSlider);

  $slider.slider({
    min: 20,
    max: 150,
    isRange: true,
    values: [59, 120],
  });

  it('Should coincide constructor set', () => {
    expect($slider.slider('option', 'isRange')).toBeTruthy();
    expect($slider.slider('option', 'min')).toEqual([20]);
    expect($slider.slider('option', 'max')).toEqual([150]);
    expect($slider.slider('option', 'values')).toEqual([59, 120]);
    expect($slider.slider('option', 'orientation') as string).toEqual(['horizontal']);
  });
});

describe('Presenter / Presenter / Test dynamic set', () => {
  document.body.innerHTML = '<div id="test" class="slider"></div>';
  const shadowSlider = document.querySelector('#test') as HTMLElement;
  shadowSlider.style.cssText = 'width: 300px';
  const $slider = $(shadowSlider);

  $slider.slider({
    min: 20,
    max: 150,
    isRange: true,
    values: [59, 120],
  });

  it('Should coincide manual set', () => {
    $slider.slider('option', 'min', 50);
    expect($slider.slider('option', 'min')).toEqual([50]);
  });
});
