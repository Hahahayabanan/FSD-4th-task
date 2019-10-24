import { Slider } from './Slider';
import { SliderSettings } from './SliderSettings';

describe('Model / Slider / Test initialization', () => {
  const slider = new Slider();

  it('Should initialize slider object', () => {
    slider.setSettings({
      range: false,
      minVal: 1,
      maxVal: 10,
      stepVal: 1,
    });

    expect(slider.settings).toEqual(
      new SliderSettings({
        range: false,
        minVal: 1,
        maxVal: 10,
        stepVal: 1,
      }),
    );
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

    expect(slider.settings).toEqual(
      new SliderSettings({
        range: false,
        minVal: 10,
        maxVal: 150,
        stepVal: 1,
      }),
    );
  });

  it('Should initialize RANGE slider object', () => {
    slider.setSettings({
      range: true,
      minVal: 1,
      maxVal: 10,
      stepVal: 1,
      values: [7, 8],
    });

    expect(slider.settings).toEqual(
      new SliderSettings({
        range: true,
        minVal: 1,
        maxVal: 10,
        stepVal: 1,
        values: [7, 8],
      }),
    );
  });
});

describe('Model / Slider / Test of setting other pointer values', () => {
  const slider = new Slider({
    minVal: 20,
    maxVal: 100,
    stepVal: 2,
  });

  slider.settings.setStepVal(5);

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
