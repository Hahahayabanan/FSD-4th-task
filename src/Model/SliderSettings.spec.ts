import { SliderSettings } from './SliderSettings';

describe('Model / SliderSettings / Test getters and setters', () => {
  let sliderSettings: SliderSettings;

  beforeEach(() => {
    sliderSettings = new SliderSettings({
      min: -100,
      step: 5,
      max: 100,
      hasTip: true,
    });
  });

  it("Should coincide set values 'step'", () => {
    sliderSettings.setSetting('step', 10);
    expect(sliderSettings.getSetting('step')).toEqual(10);
  });

  it("Should coincide set values 'from'", () => {
    sliderSettings.setSetting('from', -20);
    expect(sliderSettings.getSetting('from')).toEqual(-20);
  });

  it("Should coincide set values 'max'", () => {
    sliderSettings.setSetting('max', 100);
    expect(sliderSettings.getSetting('max')).toEqual(100);
  });

  it("Should coincide set values 'isRange'", () => {
    sliderSettings.setSetting('isRange', true);
    expect(sliderSettings.getSetting('isRange')).toBeTruthy();
    expect(sliderSettings.getSetting('to')).toEqual(100);
  });

  it("Should coincide set values 'hasTip'", () => {
    sliderSettings.setSetting('hasTip', false);
    expect(sliderSettings.getSetting('hasTip')).toEqual(false);
  });

  it("Should coincide set values 'values'", () => {
    sliderSettings.setSetting('isRange', true);
    sliderSettings.setSetting('to', 35);
    expect(sliderSettings.getSetting('to')).toEqual(35);
  });

  it("Should coincide set values 'set only one of values'", () => {
    sliderSettings.setSetting('isRange', true);
    sliderSettings.setSetting('from', 35);
    expect(sliderSettings.getSetting('from')).toEqual(35);
    sliderSettings.setSetting('to', 55);
    expect(sliderSettings.getSetting('to')).toEqual(55);
  });

  it("Should coincide set values 'orientation'", () => {
    sliderSettings.setSetting('orientation', 'vertical');
    expect(sliderSettings.getSetting('orientation')).toEqual('vertical');
  });
});

describe('Model / SliderSettings / Test default values setting', () => {
  let sliderSettings: SliderSettings;

  beforeEach(() => {
    sliderSettings = new SliderSettings({});
  });

  it('Should init default orientation', () => {
    expect(sliderSettings.getSetting('orientation')).toEqual('horizontal');
  });

  it('Should init default isRange', () => {
    expect(sliderSettings.getSetting('isRange')).toBeFalsy();
  });

  it('Should init default minVal', () => {
    expect(sliderSettings.getSetting('min')).toEqual(0);
  });

  it('Should init default stepVal', () => {
    expect(sliderSettings.getSetting('step')).toEqual(1);
  });

  it('Should init default value', () => {
    expect(sliderSettings.getSetting('from')).toEqual(null);
  });

  it('Should init default values', () => {
    expect(sliderSettings.getSetting('to')).toEqual(null);
  });
});
