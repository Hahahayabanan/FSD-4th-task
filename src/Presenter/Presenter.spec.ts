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
    expect(slider.view.rangeHTML.style.left).toEqual(
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

  beforeEach(() => {
    slider.model.setSettings({
      min: 10,
      step: 5,
      max: 100,
      range: true,
      values: [25, 75],
    });
  });


  it('updateViewWithNewPointerPosition', async () => {
    await slider.updateViewWithNewPointerPosition({ newValues: [50, 72] });
    expect(Math.round(slider.view.pointer1.curPos)).toEqual(69);
  });

  it('updateViewWithNewSettings', async () => {
    await slider.updateViewWithNewSettings({ range: false, hasTip: true });
    expect(slider.view.isRange).toBeFalsy();
    expect(slider.view.pointer0.tip).toBeDefined();
    expect(slider.view.pointer1).toBeUndefined();
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

  it('updateValueDataAttributes', async () => {
    await slider.model.setValues([35, 65]);
    await slider.updateValueDataAttributes();
    expect(slider.view.sliderHTML.dataset.values).toEqual('[35,65]');
  });
});
