import { SliderPresenterAPI } from './SliderPresenterAPI';
import { SliderPresenter } from './SliderPresenter';

describe('Presenter / SliderPresenterAPI / Test initialization', () => {
  const shadowSlider = document.createElement('div');
  shadowSlider.classList.add('slider');

  shadowSlider.style.cssText = 'width: 300px';

  let slider: SliderPresenter;

  beforeEach(() => {
    slider = new SliderPresenter(shadowSlider, {
      minVal: -100,
      stepVal: 5,
      maxVal: 100,
      followerPoint: true,
    });
  });


  it('Should coincide API set values \'step\'', () => {
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'stepVal',
      value: 10,
    });
    expect(slider.model.settings.settings.stepVal).toEqual(10);
  });

  it('Should coincide API set values \'value\'', () => {
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'value',
      value: -20,
    });
    expect(slider.model.settings.settings.value).toEqual(-20);
  });
  it('Should coincide API set values \'maxVal\'', () => {
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'maxVal',
      value: 100,
    });
    expect(slider.model.settings.settings.maxVal).toEqual(100);
  });
  it('Should coincide API set values \'minVal\'', () => {
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'minVal',
      value: 10,
    });
    const val = SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'value',
    });
    expect(slider.model.settings.settings.value).toEqual(<number>val);
    expect(slider.model.settings.settings.minVal).toEqual(10);
  });

  it('Should coincide API set values \'range\'', () => {
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'range',
      value: true,
    });
    expect(slider.model.settings.settings.range).toEqual(true);
    expect(slider.model.settings.settings.values).toEqual([-100, 100]);
  });

  it('Should coincide API set values \'range\' on view', () => {
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'range',
      value: true,
    });
    expect(slider.view.thumb1.curPos).toEqual(0);
    expect(slider.view.thumb2.curPos).toEqual(300);
  });

  it('Should coincide API set values \'followerPoint\'', () => {
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'followerPoint',
      value: false,
    });
    expect(slider.model.settings.settings.followerPoint).toEqual(false);
  });

  it('Should coincide API set values \'range\'', () => {
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'range',
      value: true,
    });
    expect(slider.model.settings.settings.range).toEqual(true);
    expect(slider.model.settings.settings.values).toEqual([-100, 100]);
  });

  it('Should coincide API cant set values \'values\'', () => {
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'values',
      value: [25, 35],
    });
    expect(slider.model.settings.settings.values).toEqual([null, null]);
  });
  it('Should coincide API set values \'values\'', () => {
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'range',
      value: true,
    });
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'values',
      value: [25, 35],
    });
    expect(slider.model.settings.settings.values).toEqual([25, 35]);
  });

  it('Should coincide API cant \'set only one of values\' in range', () => {
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'values',
      value: 1,
      valuesOneOfTwoVals: 55,
    });
    expect(slider.model.settings.settings.values).toEqual([null, null]);
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'values',
      value: 0,
      valuesOneOfTwoVals: 35,
    });
    expect(slider.model.settings.settings.values).toEqual([null, null]);
  });
  it('Should coincide API set values \'set only one of values\'', () => {
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'range',
      value: true,
    });
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'values',
      value: 1,
      valuesOneOfTwoVals: 55,
    });
    expect(slider.model.settings.settings.values).toEqual([-100, 55]);
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'values',
      value: 0,
      valuesOneOfTwoVals: 35,
    });
    expect(slider.model.settings.settings.values).toEqual([35, 55]);
  });
  it('Should coincide API set values \'get only one of values\'', () => {
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'range',
      value: true,
    });
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'values',
      value: 0,
      valuesOneOfTwoVals: -10,
    });
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'values',
      value: 1,
      valuesOneOfTwoVals: 75,
    });
    expect(SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'values',
      value: 1,
    })).toEqual(75);
  });

  it('Should coincide API set values \'orientation\'', () => {
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'orientation',
      value: 'vertical',
    });
    expect(slider.model.settings.settings.orientation).toEqual('vertical');
  });
});


describe('Presenter / SliderPresenterAPI / Test creating slider', () => {
  const shadowSlider = document.createElement('div');
  shadowSlider.classList.add('slider');

  shadowSlider.style.cssText = 'width: 300px';

  let slider: SliderPresenter;

  beforeEach(() => {
    slider = new SliderPresenter(shadowSlider, {});
  });

  it('Should init default orientation', () => {
    expect(slider.model.settings.settings.orientation).toEqual('horizontal');
  });
  it('Should init default range', () => {
    expect(slider.model.settings.settings.range).toEqual(false);
  });
  it('Should init default minVal', () => {
    expect(slider.model.settings.settings.minVal).toEqual(0);
  });
  it('Should init default stepVal', () => {
    expect(slider.model.settings.settings.stepVal).toEqual(1);
  });
  it('Should init default value', () => {
    expect(slider.model.settings.settings.value).toEqual(0);
  });
  it('Should init default values', () => {
    expect(slider.model.settings.settings.values).toEqual([null, null]);
  });
});


describe('Presenter / SliderPresenterAPI / Test dynamic set range mode true', () => {
  const shadowSlider = document.createElement('div');
  shadowSlider.classList.add('slider');

  shadowSlider.style.cssText = 'width: 300px';

  let slider: SliderPresenter;

  beforeEach(() => {
    slider = new SliderPresenter(shadowSlider, {});
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'range',
      value: true,
    });
  });

  it('Should init default orientation', () => {
    expect(slider.model.settings.settings.orientation).toEqual('horizontal');
  });
  it('Should init default range', () => {
    expect(slider.model.settings.settings.range).toEqual(true);
  });
  it('Should init default minVal', () => {
    expect(slider.model.settings.settings.minVal).toEqual(0);
  });
  it('Should init default stepVal', () => {
    expect(slider.model.settings.settings.stepVal).toEqual(1);
  });
  it('Should init default value', () => {
    const promise = new Promise(() => {
      SliderPresenterAPI.enterPoint({
        slider,
        option: 'option',
        setting: 'range',
        value: true,
      });
    });
    promise.then(
      () => {
        expect(slider.model.settings.settings.value).toEqual(null);
      },
    );
  });
  it('Should init default values', () => {
    expect(slider.model.settings.settings.values).toEqual([0, 100]);
  });
});


describe('Presenter / SliderPresenterAPI / Test dynamic set range mode false', () => {
  const shadowSlider = document.createElement('div');
  shadowSlider.classList.add('slider');

  shadowSlider.style.cssText = 'width: 300px';

  let slider: SliderPresenter;

  beforeEach(() => {
    slider = new SliderPresenter(shadowSlider, {
      range: true,
    });
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'range',
      value: false,
    });
  });

  it('Should init default orientation', () => {
    expect(slider.model.settings.settings.orientation).toEqual('horizontal');
  });
  it('Should init default range', () => {
    expect(slider.model.settings.settings.range).toEqual(false);
  });
  it('Should init default minVal', () => {
    expect(slider.model.settings.settings.minVal).toEqual(0);
  });
  it('Should init default stepVal', () => {
    expect(slider.model.settings.settings.stepVal).toEqual(1);
  });
  it('Should init default value', () => {
    expect(slider.model.settings.settings.value).toEqual(0);
  });
  it('Should init default values', () => {
    expect(slider.model.settings.settings.values).toEqual([null, null]);
  });
});


describe('Presenter / SliderPresenterAPI / Test wrong values', () => {
  const shadowSlider = document.createElement('div');
  shadowSlider.classList.add('slider');

  shadowSlider.style.cssText = 'width: 300px';

  let slider: SliderPresenter;

  beforeEach(() => {
    slider = new SliderPresenter(shadowSlider, {
      minVal: 50,
      stepVal: 5,
      maxVal: 100,
      followerPoint: true,
    });
  });

  it('Should not set wrong value', () => {
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'value',
      value: 999,
    });
    expect(slider.model.settings.settings.value).toEqual(slider.model.settings.settings.maxVal);
  });
  it('Should not set wrong value', () => {
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'value',
      value: -999,
    });
    expect(slider.model.settings.settings.value).toEqual(slider.model.settings.settings.minVal);
  });
  it('Should not set wrong range values', () => {
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'range',
      value: true,
    });
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'values',
      value: [99, 51],
    });
    expect(slider.model.settings.settings.values).toEqual([50, 50]);
  });
  it('Should not set wrong first range value', () => {
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'range',
      value: true,
    });
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'values',
      value: 0,
      valuesOneOfTwoVals: 999,
    });
    expect(slider.model.settings.settings.values).toEqual([100, 100]);
  });
  it('Should not set wrong minVal', () => {
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'minVal',
      value: 500,
    });
    expect(slider.model.settings.settings.minVal).toEqual(50);
  });
  it('Should not set wrong maxVal', () => {
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'maxVal',
      value: 13,
    });
    expect(slider.model.settings.settings.maxVal).toEqual(100);
  });
  it('Should not set wrong step', () => {
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'stepVal',
      value: 500,
    });
    expect(slider.model.settings.settings.stepVal).toEqual(5);
  });
  it('Should not set wrong step', () => {
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'stepVal',
      value: -999,
    });
    expect(slider.model.settings.settings.stepVal).toEqual(5);
  });
  it('Should not set wrong step', () => {
    SliderPresenterAPI.enterPoint({
      slider,
      option: 'option',
      setting: 'stepVal',
      value: 3,
    });
    expect(slider.model.settings.settings.stepVal).toEqual(3);
  });
});