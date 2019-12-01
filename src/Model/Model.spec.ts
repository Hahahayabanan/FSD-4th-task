import { Model } from './Model';
import { SliderSettings } from './SliderSettings';

describe('Model / Test initialization', () => {
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
      from: 7,
      to: 8,
    });

    expect(slider.getSettings()).toEqual(
      new SliderSettings({
        isRange: true,
        min: 1,
        max: 10,
        step: 1,
        from: 7,
        to: 8,
      }).settings,
    );
  });
});

describe('Model / Test of setting other pointer values', () => {
  const slider = new Model({
    min: 20,
    max: 100,
    step: 2,
    isRange: true,
    from: 25,
    to: 55,
  });

  slider.setSetting('step', 5);

  it('Should change pointer position 60', () => {
    slider.setCalculatedValue(58, 'second');
    expect(slider.getSetting('to')).toEqual(65);
  });

  it('Should change pointer position 90', () => {
    expect(slider.calculateValueWithStep(92)).toEqual(90);
  });

  describe('Model / Test of calculating value', () => {
    it('calculatePercentsToValue', () => {
      expect(slider.calculatePercentsToValue(58)).toEqual(66.4);
    });

    it('calculateValueToPercents', () => {
      expect(slider.calculateValueToPercents(58)).toEqual(47.5);
    });
  });
});
