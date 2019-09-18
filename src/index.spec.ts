import { SliderTemplate } from './View/SliderTemplate';
import { Slider } from './Model/Slider';
import { SliderSettings } from './Model/SliderSettings';
import { SliderPresenterAPI } from './Presenter/SliderPresenterAPI';
import { SliderPresenter } from './Presenter/SliderPresenter';


describe('Model / Slider / Test initialization', () => {
  const slider = new Slider();

  it('Should initializate slider object', () => {
    slider.setSettings({
      range: false,
      minVal: 1,
      maxVal: 10,
      stepVal: 1,
    });

    expect(slider.settings).toEqual(new SliderSettings({
      range: false,
      minVal: 1,
      maxVal: 10,
      stepVal: 1,
    }));
  });

  it('Should change slider settings', () => {
    slider.setSettings({
      range: false,
      minVal: 1,
      maxVal: 10,
      stepVal: 1,
    });

    slider.settings.setMaxVal(150);
    slider.settings.setMinVal(10);

    expect(slider.settings).toEqual(new SliderSettings({
      range: false,
      minVal: 10,
      maxVal: 150,
      stepVal: 1,
    }));
  });

  it('Should initializate RANGE slider object', () => {
    slider.setSettings({
      range: true,
      minVal: 1,
      maxVal: 10,
      stepVal: 1,
      values: [7, 8],
    });

    expect(slider.settings).toEqual(new SliderSettings({
      range: true,
      minVal: 1,
      maxVal: 10,
      stepVal: 1,
      values: [7, 8],
    }));
  });
});

describe('Model / Slider / Test moving', () => {
  const slider = new Slider({
    minVal: 20,
    maxVal: 100,
    stepVal: 2,
  });

  slider.settings.setStepVal(5);

  it('Should change pointer position 60', () => {
    expect(slider.setPointerPosition(58)).toEqual(60);
  });

  it('Should change pointer position 90', () => {
    expect(slider.setPointerPosition(92)).toEqual(90);
  });

  it('Should change pointer position 20,35', () => {
    expect(slider.setPointerPosition([22, 37])).toEqual([20, 35]);
  });
});


describe('View / Slider template / Test of setting pointer positions', () => {
  const shadowSlider = document.createElement('div');
  shadowSlider.classList.add('slider');

  const slider = new SliderTemplate(shadowSlider);

  // setting style.width because we dont have DOM
  slider.slider.style.cssText = 'width: 300px';

  it('Curr position should be set', () => {
    slider.thumb.setCurPos(150);
    expect(slider.thumb.curPos).toEqual(150);
  });

  it('Should update value of curr position on change 236', () => {
    slider.thumb.renderCurrentPosInPixels(236);
    // width  300px - 100 %
    // newPos 236px -  79 %
    expect(Math.round(parseInt(slider.thumb.thumbHTMLElem.style.left, 10))).toEqual(78);
  });
  it('Should update value of curr position on change 33', () => {
    slider.thumb.renderCurrentPosInPercents(33);
    expect(slider.thumb.thumbHTMLElem.style.left).toEqual('33%');
  });
});

describe('View / Vertical Slider template / Test of setting pointer positions', () => {
  const shadowSlider = document.createElement('div');
  shadowSlider.classList.add('slider');

  const slider = new SliderTemplate(shadowSlider, true);
  slider.slider.style.cssText = 'height: 300px';

  it('Curr position should be set', () => {
    slider.thumb.setCurPos(150);
    expect(slider.thumb.curPos).toEqual(150);
  });

  it('Should update value of curr position on change 236', () => {
    slider.thumb.renderCurrentPosInPixels(236);
    expect(Math.round(parseInt(slider.thumb.thumbHTMLElem.style.top, 10))).toEqual(78);
  });
  it('Should update value of curr position on change 33', () => {
    slider.thumb.renderCurrentPosInPercents(33);
    expect(slider.thumb.thumbHTMLElem.style.top).toEqual('33%');
  });
});


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
    expect(slider.model.settings.settings.value).toEqual(parseInt(slider.view.thumb.followerPoint.elemHTMLElement.innerHTML, 10));
  });
});


describe('Presenter / SliderPresenterRange / Test initialization', () => {
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
    expect(slider.view.range.style.left).toEqual(slider.view.thumb1.thumbHTMLElem.style.left);
  });
});


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
