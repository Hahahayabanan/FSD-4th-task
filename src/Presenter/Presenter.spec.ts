import { Presenter } from './Presenter';

document.body.innerHTML = '<div id="test" class="slider"></div>';

const shadowSlider = document.querySelector('#test') as HTMLElement;

describe('Presenter / Presenter / Test initialization', () => {
  shadowSlider.style.cssText = 'width: 300px';

  let slider: Presenter = new Presenter(shadowSlider, {
    minVal: 10,
    stepVal: 5,
    maxVal: 100,
    range: false,
    followerPoint: true,
  });

  it("Should coincide constructor set values 'value'", () => {
    slider = new Presenter(shadowSlider, {
      range: false,
      minVal: 10,
      stepVal: 5,
      maxVal: 100,
      value: 53,
    });
    expect(slider.model.settings.settings.value).toEqual(55);
  });

  it("Should coincide constructor values 'step'", () => {
    slider = new Presenter(shadowSlider, {
      stepVal: 5,
    });
    expect(slider.model.settings.settings.stepVal).toEqual(5);
  });

  it("Should coincide constructor values default 'value'", () => {
    slider = new Presenter(shadowSlider, {
      minVal: 10,

      maxVal: 100,
      range: false,
    });
    expect(slider.model.settings.settings.value).toEqual(10);
  });

  it('Should coincide follower pointer value', () => {
    slider = new Presenter(shadowSlider, {
      followerPoint: true,
    });
    expect(slider.model.settings.settings.value).toEqual(
      parseInt(slider.view.thumb0.followerPoint.elemHTMLElement.innerHTML, 10),
    );
  });
});

describe('Presenter / Presenter Range / Test initialization', () => {
  shadowSlider.style.cssText = 'width: 300px';

  const slider: Presenter = new Presenter(shadowSlider, {
    minVal: 10,
    stepVal: 5,
    maxVal: 100,
    range: true,
    values: [25, 35],
  });

  it("Should coincide constructor set values 'range'", () => {
    expect(slider.model.settings.settings.range).toEqual(true);
  });

  it("Should coincide constructor set values 'values'", () => {
    expect(slider.model.settings.settings.values).toEqual([25, 35]);
  });

  it('Should coincide constructor set values on range line', () => {
    expect(slider.view.range.style.left).toEqual(
      slider.view.thumb0.thumbHTMLElem.style.left,
    );
  });
});

describe('Presenter / Presenter Range / Test methods', () => {
  shadowSlider.style.cssText = 'width: 300px';

  const slider: Presenter = new Presenter(shadowSlider, {
    minVal: 10,
    stepVal: 5,
    maxVal: 100,
    range: true,
    values: [25, 75],
  });

  it('render', async () => {
    await slider.render(slider.view.thumb1, 50);
    expect(Math.round(slider.view.thumb1.curPos)).toEqual(72);
  });

  it('setFollowerPointValue', async () => {
    slider.model.settings.setFollowerPoint(true);
    await slider.setFollowerPointValue(slider.view.thumb1, 55);
    expect(slider.view.thumb1.followerPoint.elemHTMLElement.innerHTML).toEqual(
      '55',
    );
  });

  it('checkOrientationIsVertical', async () => {
    expect(slider.checkOrientationIsVertical()).toEqual(
      slider.model.settings.settings.orientation === 'vertical',
    );
  });

  it('updateDataAttributes', async () => {
    await slider.model.settings.setMinVal(0);
    await slider.updateDataAttributes();
    expect(slider.view.slider.dataset.minVal).toEqual('0');
  });

  it('updateValuesDataAttributes', async () => {
    await slider.model.settings.setValues([35, 65]);
    await slider.updateValuesDataAttributes();
    expect(slider.view.slider.dataset.values).toEqual('[35,65]');
  });
});
