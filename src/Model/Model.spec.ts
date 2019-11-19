import { Model } from './Model';
import { SliderSettings } from './SliderSettings';

describe('Model / Slider / Test initialization', () => {
  it('Should change slider settings', () => {
    const slider = new Model({
      isRange: false,
      min: 1,
      max: 10,
      step: 1,
    });

    slider.setSetting('max', 150);
    slider.setSetting('min', 10);

    expect(slider.getSettings()).toEqual(
      new SliderSettings({
        isRange: false,
        min: 10,
        max: 150,
        step: 1,
      }).settings,
    );
  });

  it('Should initialize RANGE slider object', () => {
    const slider = new Model({
      isRange: true,
      min: 1,
      max: 10,
      step: 1,
      values: [7, 8],
    });

    expect(slider.getSettings()).toEqual(
      new SliderSettings({
        isRange: true,
        min: 1,
        max: 10,
        step: 1,
        values: [7, 8],
      }).settings,
    );
  });
});

describe('Model / Slider / Test of setting other pointer values', () => {
  const slider = new Model({
    min: 20,
    max: 100,
    step: 2,
    isRange: true,
    values: [25, 55],
  });

  slider.setSetting('step', 5);

  it('Should change pointer position 60', () => {
    slider.setCalculatedValue(58, 'firstValue');
    expect(slider.getSetting('values')[0]).toEqual(20);
  });

  it('Should change pointer position 90', () => {
    expect(slider.calculateValueWithStep(92)).toEqual(90);
  });

  describe('Model / Slider / Test of calculating value', () => {
    it('calculateFromPercentsToValue', () => {
      expect(slider.calculateFromPercentsToValue(58)).toEqual(66.4);
    });

    it('calculateFromValueToPercents', () => {
      expect(slider.calculateFromValueToPercents(58)).toEqual(47.5);
    });
  });
});
