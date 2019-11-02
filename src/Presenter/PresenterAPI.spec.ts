import { PresenterAPI } from './PresenterAPI';
import { Presenter } from './Presenter';

document.body.innerHTML = '<div id="test" class="slider"></div>';

const shadowSlider = document.querySelector('#test') as HTMLElement;

describe('Presenter / PresenterAPI / Test initialization', () => {
  let slider: Presenter;

  beforeEach(() => {
    slider = new Presenter(shadowSlider, {
      min: -100,
      step: 5,
      max: 100,
      hasTip: true,
    });
  });

  it("Should coincide API set values 'step'", () => {
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'step',
      value: 10,
    });
    expect(slider.model.getStep()).toEqual(10);
  });

  it("Should coincide API set values 'value'", () => {
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'value',
      value: -20,
    });
    expect(slider.model.getValue()).toEqual(-20);
  });

  it("Should coincide API set values 'max'", () => {
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'max',
      value: 100,
    });
    expect(slider.model.getMax()).toEqual(100);
  });

  it("Should coincide API set values 'min'", () => {
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'min',
      value: 10,
    });
    const val = PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'value',
    });
    expect(slider.model.getValue()).toEqual(<number>val);
    expect(slider.model.getMin()).toEqual(10);
  });

  it("Should coincide API set values 'range'", () => {
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'range',
      value: true,
    });
    expect(slider.model.getRange()).toEqual(true);
    expect(slider.model.getValues()).toEqual([-100, 100]);
  });

  it("Should coincide API set values 'range' on view", () => {
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'range',
      value: true,
    });
    expect(slider.view.pointer0.curPos).toEqual(0);
    expect(slider.view.pointer1.curPos).toEqual(100);
  });

  it("Should coincide API set values 'hasTip'", () => {
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'hasTip',
      value: false,
    });
    expect(slider.model.getHasTip()).toEqual(false);
  });

  it("Should coincide API set values 'range'", () => {
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'range',
      value: true,
    });
    expect(slider.model.getRange()).toEqual(true);
    expect(slider.model.getValues()).toEqual([-100, 100]);
  });

  it("Should coincide API cant set values 'values'", () => {
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'values',
      value: [25, 35],
    });
    expect(slider.model.getValues()).toEqual([null, null]);
  });

  it("Should coincide API set values 'values'", () => {
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'range',
      value: true,
    });
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'values',
      value: [25, 35],
    });
    expect(slider.model.getValues()).toEqual([25, 35]);
  });

  it("Should coincide API cant 'set only one of values' in range", () => {
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'values',
      value: 1,
      oneOfTwoValues: 55,
    });
    expect(slider.model.getValues()).toEqual([null, null]);
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'values',
      value: 0,
      oneOfTwoValues: 35,
    });
    expect(slider.model.getValues()).toEqual([null, null]);
  });

  it("Should coincide API set values 'set only one of values'", () => {
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'range',
      value: true,
    });
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'values',
      value: 1,
      oneOfTwoValues: 55,
    });
    expect(slider.model.getValues()).toEqual([-100, 55]);
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'values',
      value: 0,
      oneOfTwoValues: 35,
    });
    expect(slider.model.getValues()).toEqual([35, 55]);
  });

  it("Should coincide API set values 'get only one of values'", () => {
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'range',
      value: true,
    });
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'values',
      value: 0,
      oneOfTwoValues: -10,
    });
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'values',
      value: 1,
      oneOfTwoValues: 75,
    });
    expect(
      PresenterAPI.enterPoint({
        slider,
        option: 'option',
        setting: 'values',
        value: 1,
      }),
    ).toEqual(75);
  });

  it("Should coincide API set values 'orientation'", () => {
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'orientation',
      value: 'vertical',
    });
    expect(slider.model.getOrientation()).toEqual('vertical');
  });
});

describe('Presenter / PresenterAPI / Test creating slider', () => {
  let slider: Presenter;

  beforeEach(() => {
    slider = new Presenter(shadowSlider, {});
  });

  it('Should init default orientation', () => {
    expect(slider.model.getOrientation()).toEqual('horizontal');
  });

  it('Should init default range', () => {
    expect(slider.model.getRange()).toEqual(false);
  });

  it('Should init default minVal', () => {
    expect(slider.model.getMin()).toEqual(0);
  });

  it('Should init default stepVal', () => {
    expect(slider.model.getStep()).toEqual(1);
  });

  it('Should init default value', () => {
    expect(slider.model.getValue()).toEqual(0);
  });

  it('Should init default values', () => {
    expect(slider.model.getValues()).toEqual([null, null]);
  });
});

describe('Presenter / PresenterAPI / Test dynamic set range mode true', () => {
  let slider: Presenter;

  beforeEach(() => {
    slider = new Presenter(shadowSlider, {});
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'range',
      value: true,
    });
  });

  it('Should init default orientation', () => {
    expect(slider.model.getOrientation()).toEqual('horizontal');
  });

  it('Should init default range', () => {
    expect(slider.model.getRange()).toEqual(true);
  });

  it('Should init default minVal', () => {
    expect(slider.model.getMin()).toEqual(0);
  });

  it('Should init default stepVal', () => {
    expect(slider.model.getStep()).toEqual(1);
  });

  it('Should init default value', () => {
    const promise = new Promise(() => {
      PresenterAPI.enterPoint({
        slider,
        option: 'option',
        setting: 'range',
        value: true,
      });
    });
    promise.then(() => {
      expect(slider.model.getValue()).toEqual(null);
    });
  });

  it('Should init default values', () => {
    expect(slider.model.getValues()).toEqual([0, 100]);
  });
});

describe('Presenter / PresenterAPI / Test dynamic set range mode false', () => {
  let slider: Presenter;

  beforeEach(() => {
    slider = new Presenter(shadowSlider, {
      range: true,
    });
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'range',
      value: false,
    });
  });

  it('Should init default orientation', () => {
    expect(slider.model.getOrientation()).toEqual('horizontal');
  });

  it('Should init default range', () => {
    expect(slider.model.getRange()).toEqual(false);
  });

  it('Should init default minVal', () => {
    expect(slider.model.getMin()).toEqual(0);
  });

  it('Should init default stepVal', () => {
    expect(slider.model.getStep()).toEqual(1);
  });

  it('Should init default value', () => {
    expect(slider.model.getValue()).toEqual(0);
  });

  it('Should init default values', () => {
    expect(slider.model.getValues()).toEqual([null, null]);
  });
});

describe('Presenter / PresenterAPI / Test wrong values', () => {
  let slider: Presenter;

  beforeEach(() => {
    slider = new Presenter(shadowSlider, {
      min: 50,
      step: 5,
      max: 100,
      hasTip: true,
    });
  });

  it('Should not set wrong value', () => {
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'value',
      value: 999,
    });
    expect(slider.model.getValue()).toEqual(slider.model.getMax());
  });

  it('Should not set wrong value', () => {
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'value',
      value: -999,
    });
    expect(slider.model.getValue()).toEqual(slider.model.getMin());
  });

  it('Should not set wrong range values', () => {
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'range',
      value: true,
    });
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'values',
      value: [99, 51],
    });
    expect(slider.model.getValues()).toEqual([51, 51]);
  });

  it('Should not set wrong first range value', () => {
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'range',
      value: true,
    });
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'values',
      value: 0,
      oneOfTwoValues: 999,
    });
    expect(slider.model.getValues()).toEqual([50, 100]);
  });

  it('Should not set wrong minVal', () => {
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'min',
      value: 500,
    });
    expect(slider.model.getMin()).toEqual(50);
  });

  it('Should not set wrong maxVal', () => {
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'max',
      value: 13,
    });
    expect(slider.model.getMax()).toEqual(100);
  });

  it('Should not set wrong step', () => {
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'step',
      value: 500,
    });
    expect(slider.model.getStep()).toEqual(5);
  });

  it('Should not set wrong step', () => {
    PresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'step',
      value: -999,
    });
    expect(slider.model.getStep()).toEqual(5);
  });
});
