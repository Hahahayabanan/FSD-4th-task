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

  it("Should coincide set values 'value'", () => {
    sliderSettings.setSetting('value', -20);
    expect(sliderSettings.getSetting('value')).toEqual(-20);
  });

  it("Should coincide set values 'max'", () => {
    sliderSettings.setSetting('max', 100);
    expect(sliderSettings.getSetting('max')).toEqual(100);
  });

  it("Should coincide set values 'isRange'", () => {
    sliderSettings.setSetting('isRange', true);
    expect(sliderSettings.getSetting('isRange')).toBeTruthy();
    expect(sliderSettings.getSetting('values')).toEqual([-100, 100]);
  });

  it("Should coincide set values 'hasTip'", () => {
    sliderSettings.setSetting('hasTip', false);
    expect(sliderSettings.getSetting('hasTip')).toEqual(false);
  });

  it("Should coincide set values 'values'", () => {
    sliderSettings.setSetting('isRange', true);
    sliderSettings.setSetting('values', [25, 35]);
    expect(sliderSettings.getSetting('values')).toEqual([25, 35]);
  });

  it("Should coincide set values 'set only one of values'", () => {
    sliderSettings.setSetting('isRange', true);
    sliderSettings.setSetting('values', 55, 1);
    expect(sliderSettings.getSetting('values')).toEqual([-100, 55]);
    sliderSettings.setSetting('values', 35, 0);
    expect(sliderSettings.getSetting('values')).toEqual([35, 55]);
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
    expect(sliderSettings.getSetting('value')).toEqual(null);
  });

  it('Should init default values', () => {
    expect(sliderSettings.getSetting('values')).toEqual([null, null]);
  });
});

describe('Model / SliderSettings / Test wrong values', () => {
  let sliderSettings: SliderSettings;

  beforeEach(() => {
    sliderSettings = new SliderSettings({
      min: 50,
      step: 5,
      max: 100,
      hasTip: true,
    });
  });

  it('Should not set wrong value', () => {
    const oldValue = sliderSettings.getSetting('value');
    sliderSettings.setSetting('value', 999);
    expect(sliderSettings.getSetting('value')).toEqual(oldValue);
  });

  it('Should not set wrong value', () => {
    const oldValue = sliderSettings.getSetting('value');
    sliderSettings.setSetting('value', -999);
    expect(sliderSettings.getSetting('value')).toEqual(oldValue);
  });

  it('Should not set wrong range values', () => {
    sliderSettings.setSetting('isRange', true);
    sliderSettings.setSetting('values', [99, 51]);
    expect(sliderSettings.getSetting('values')).toEqual([50, 51]);
  });

  it('Should not set wrong first range value', () => {
    sliderSettings.setSetting('isRange', true);
    sliderSettings.setSetting('values', 999, 0);
    expect(sliderSettings.getSetting('values')).toEqual([50, 51]);
  });

  it('Should not set wrong minVal', () => {
    sliderSettings.setSetting('min', 500);
    expect(sliderSettings.getSetting('min')).toEqual(50);
  });

  it('Should not set wrong maxVal', () => {
    sliderSettings.setSetting('max', 13);
    expect(sliderSettings.getSetting('max')).toEqual(100);
  });

  it('Should not set wrong step', () => {
    sliderSettings.setSetting('step', 500);
    expect(sliderSettings.getSetting('step')).toEqual(5);
  });

  it('Should not set wrong step', () => {
    sliderSettings.setSetting('step', -999);
    expect(sliderSettings.getSetting('step')).toEqual(5);
  });
});
