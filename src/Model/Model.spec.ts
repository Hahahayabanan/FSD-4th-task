import { Model } from './Model';
import { SliderSettings } from './SliderSettings';

describe('Model / Slider / Test initialization', () => {
  const slider = new Model();

  it('Should initialize model object', () => {
    slider.setSettings({
      range: false,
      min: 1,
      max: 10,
      step: 1,
    });

    expect(slider.getSettings()).toEqual(
      new SliderSettings({
        range: false,
        min: 1,
        max: 10,
        step: 1,
      }),
    );
  });

  it('Should change slider settings', () => {
    slider.setSettings({
      range: false,
      min: 1,
      max: 10,
      step: 1,
    });

    slider.setMax(150);
    slider.setMin(10);

    expect(slider.getSettings()).toEqual(
      new SliderSettings({
        range: false,
        min: 10,
        max: 150,
        step: 1,
      }),
    );
  });

  it('Should initialize RANGE slider object', () => {
    slider.setSettings({
      range: true,
      min: 1,
      max: 10,
      step: 1,
      values: [7, 8],
    });

    expect(slider.getSettings()).toEqual(
      new SliderSettings({
        range: true,
        min: 1,
        max: 10,
        step: 1,
        values: [7, 8],
      }),
    );
  });
});

describe('Model / Slider / Test of setting other pointer values', () => {
  const slider = new Model({
    min: 20,
    max: 100,
    step: 2,
  });

  slider.setStep(5);

  it('Should change pointer position 60', () => {
    expect(slider.calcPointerPosition(58)).toEqual(60);
  });

  it('Should change pointer position 90', () => {
    expect(slider.calcPointerPosition(92)).toEqual(90);
  });

  it('Should change pointer position 20,35', () => {
    expect(slider.calcPointerPosition([22, 37])).toEqual([20, 35]);
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
