import { SliderPresenter } from './SliderPresenter';

describe('Presenter / SliderPresenter / Test initialization', () => {
  const shadowSlider = document.createElement('div');
  shadowSlider.classList.add('slider');

  shadowSlider.style.cssText = 'width: 300px';


  let slider: SliderPresenter = new SliderPresenter(shadowSlider, {
    minVal: 10,
    stepVal: 5,
    maxVal: 100,
    range: false,
    followerPoint: true,
  });

  it('Should coincide constructor set values \'value\'', () => {
    slider = new SliderPresenter(shadowSlider, {
      range: false,
      minVal: 10,
      stepVal: 5,
      maxVal: 100,
      value: 53,
    });
    expect(slider.model.settings.settings.value).toEqual(55);
  });
  it('Should coincide constructor values \'step\'', () => {
    slider = new SliderPresenter(shadowSlider, {
      stepVal: 5,
    });
    expect(slider.model.settings.settings.stepVal).toEqual(5);
  });
  it('Should coincide constructor values default \'value\'', () => {
    slider = new SliderPresenter(shadowSlider, {
      minVal: 10,

      maxVal: 100,
      range: false,
    });
    expect(slider.model.settings.settings.value).toEqual(10);
  });
  it('Should coincide follower pointer value', () => {
    slider = new SliderPresenter(shadowSlider, {
      followerPoint: true,
    });
    expect(slider.model.settings.settings.value)
      .toEqual(parseInt(slider.view.thumb0.followerPoint.elemHTMLElement.innerHTML, 10));
  });
});


describe('Presenter / SliderPresenter Range / Test initialization', () => {
  const shadowSlider = document.createElement('div');
  shadowSlider.classList.add('slider');

  shadowSlider.style.cssText = 'width: 300px';

  const slider: SliderPresenter = new SliderPresenter(shadowSlider, {
    minVal: 10,
    stepVal: 5,
    maxVal: 100,
    range: true,
    values: [25, 35],
  });

  it('Should coincide constructor set values \'range\'', () => {
    expect(slider.model.settings.settings.range).toEqual(true);
  });
  it('Should coincide constructor set values \'values\'', () => {
    expect(slider.model.settings.settings.values).toEqual([25, 35]);
  });
  it('Should coincide constructor set values on range line', () => {
    expect(slider.view.range.style.left).toEqual(slider.view.thumb0.thumbHTMLElem.style.left);
  });
});
