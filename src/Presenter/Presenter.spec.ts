import { Presenter } from './Presenter';

document.body.innerHTML = '<div id="test" class="slider"></div>';

const shadowSlider = document.querySelector('#test') as HTMLElement;

describe('Presenter / Presenter / Test initialization', () => {
  shadowSlider.style.cssText = 'width: 300px';

  let slider: Presenter = new Presenter(shadowSlider, {
    min: 10,
    step: 5,
    max: 100,
    range: false,
    hasTip: true,
  });

  it("Should coincide constructor set values 'value'", () => {
    slider = new Presenter(shadowSlider, {
      range: false,
      min: 10,
      step: 5,
      max: 100,
      value: 53,
    });
    expect(slider.model.getValue()).toEqual(55);
  });

  it("Should coincide constructor values 'step'", () => {
    slider = new Presenter(shadowSlider, {
      step: 5,
    });
    expect(slider.model.getStep()).toEqual(5);
  });

  it("Should coincide constructor values default 'value'", () => {
    slider = new Presenter(shadowSlider, {
      min: 10,

      max: 100,
      range: false,
    });
    expect(slider.model.getValue()).toEqual(10);
  });

  it('Should coincide follower pointer value', () => {
    slider = new Presenter(shadowSlider, {
      hasTip: true,
    });
    expect(slider.model.getValue()).toEqual(
      parseInt(slider.view.pointer0.tip.tipHTML.innerHTML, 10),
    );
  });
});

describe('Presenter / Presenter Range / Test initialization', () => {
  shadowSlider.style.cssText = 'width: 300px';

  const slider: Presenter = new Presenter(shadowSlider, {
    min: 10,
    step: 5,
    max: 100,
    range: true,
    values: [25, 35],
  });

  it("Should coincide constructor set values 'range'", () => {
    expect(slider.model.getRange()).toEqual(true);
  });

  it("Should coincide constructor set values 'values'", () => {
    expect(slider.model.getValues()).toEqual([25, 35]);
  });

  it('Should coincide constructor set values on range line', () => {
    expect(slider.view.range.style.left).toEqual(
      slider.view.pointer0.pointerHTML.style.left,
    );
  });
});

describe('Presenter / Presenter Range / Test methods', () => {
  shadowSlider.style.cssText = 'width: 300px';

  const slider: Presenter = new Presenter(shadowSlider, {
    min: 10,
    step: 5,
    max: 100,
    range: true,
    values: [25, 75],
  });

  it('render', async () => {
    await slider.render(slider.view.pointer1, 50);
    expect(Math.round(slider.view.pointer1.curPos)).toEqual(72);
  });

  it('setHasTipValue', async () => {
    slider.model.setHasTip(true);
    await slider.setTipValue(slider.view.pointer1, 55);
    expect(slider.view.pointer1.tip.tipHTML.innerHTML).toEqual('55');
  });

  it('checkOrientationIsVertical', async () => {
    expect(slider.checkOrientationIsVertical()).toEqual(
      slider.model.getOrientation() === 'vertical',
    );
  });

  it('updateDataAttributes', async () => {
    await slider.model.setMin(0);
    await slider.updateDataAttributes();
    expect(slider.view.sliderHTML.dataset.min).toEqual('0');
  });

  it('updateValuesDataAttributes', async () => {
    await slider.model.setValues([35, 65]);
    await slider.updateValuesDataAttributes();
    expect(slider.view.sliderHTML.dataset.values).toEqual('[35,65]');
  });
});
