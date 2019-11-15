import * as $ from 'jquery';
import { ISliderSettings } from './ISliderSettings';

class SliderSettings {
  protected defaultSettings: ISliderSettings = {
    range: false,
    min: 0,
    max: 100,
    step: 1,
    orientation: 'horizontal',
    value: null,
    values: [null, null],
    hasTip: false,
  };

  public settings: ISliderSettings;

  public errors = {
    minBiggerMax: 'Min slider range value cant be bigger than max value',
    stepBiggerMaxMin: 'Step cant be bigger than min and max range',
    stepInteger:
      "Step should be an integer, commonly a dividend of the slider's maximum value",
    valueBiggerMax: 'Value cant be bigger than max value',
    valueSmallerMin: 'Value cant be smaller than min value',
    firstValueSmallerMin: 'First value cant be smaller than min value',
    secondValueBiggerMax: 'Second value cant be bigger than max value',
    firstValueBiggerSecond: 'First value cant be bigger than second value',
    secondValueBiggerFirst: 'Second value cant be bigger than first value',
    rangeValuesInSingle: 'Slider has range values but it is not range',
    notValidOrientation:
      'Orientation of slider has only two values "horizontal" or "vertical"',
  };

  constructor(setts: ISliderSettings) {
    this.settings = $.extend(this.defaultSettings, setts);

    this.setValidValue();
    this.checkValidSettings();
  }

  checkValidSettings() {
    const orientation = {
      VERTICAL: 'vertical',
      HORIZONTAL: 'horizontal',
    };
    const isOrientationVertical = this.settings.orientation !== orientation.VERTICAL;
    const isOrientationHorizontal = this.settings.orientation !== orientation.HORIZONTAL;
    const isOrientationNotSet = isOrientationVertical && isOrientationHorizontal;
    const valueRange = this.settings.max - this.settings.min;
    const isStepSmallerNull = this.settings.step < 0;
    const isStepBiggerRange = this.settings.step < valueRange;
    const isValueBiggerMax = this.settings.value > this.settings.max;
    const isValueSmallerMin = this.settings.value < this.settings.min;
    const isFirstValueSmallerMin = this.settings.values[0] < this.settings.min;
    const isSecondValueBiggerMax = this.settings.values[1] > this.settings.max;
    const isFirstValueBiggerMax = this.settings.values[0] > this.settings.max;
    const isSecondValueSmallerMin = this.settings.values[1] < this.settings.min;
    const isFirstValueBiggerSecond = this.settings.values[0] > this.settings.values[1];

    if (this.settings.min >= this.settings.max) {
      this.settings.max = this.defaultSettings.max;
      this.settings.min = this.defaultSettings.min;
      this.settings.value = this.defaultSettings.value;
      this.settings.values = this.defaultSettings.values;
      this.settings.step = this.defaultSettings.step;
    }
    if (isStepSmallerNull && isStepBiggerRange) {
      this.settings.step = this.defaultSettings.step;
    }
    if (valueRange % this.settings.step !== 0) {
      this.settings.step = this.defaultSettings.step;
    }
    if (isValueBiggerMax && !this.settings.range) {
      this.settings.value = this.settings.max;
    }
    if (isValueSmallerMin && !this.settings.range) {
      this.settings.value = this.settings.min;
    }
    if (isFirstValueSmallerMin && this.settings.range) {
      this.settings.values[0] = this.settings.min;
    }
    if (isSecondValueBiggerMax && this.settings.range) {
      this.settings.values[1] = this.settings.max;
    }
    if (isFirstValueBiggerMax && this.settings.range) {
      this.settings.values[0] = this.settings.max - this.settings.step < this.settings.max
        ? this.settings.max - this.settings.step
        : this.settings.max;
    }
    if (isSecondValueSmallerMin && this.settings.range) {
      this.settings.values[1] = this.settings.min + this.settings.step < this.settings.min
        ? this.settings.min + this.settings.step
        : this.settings.min;
    }
    if (isOrientationNotSet) {
      this.settings.orientation = this.defaultSettings.orientation;
    }
    if (isFirstValueBiggerSecond) {
      const second = this.settings.values[1];
      this.settings.values[0] = second;
    }
  }

  setValidValue(newValue?: number, currentValueNumber?: number) {
    const isFirstValueNull = this.settings.values[0] === null;
    const isSecondValueNull = this.settings.values[1] === null;
    const isValuesNull = this.settings.values === [null, null];
    const isValueNull = this.settings.value === null;

    if (currentValueNumber === 0) {
      if (newValue <= this.settings.values[1]) this.settings.values[0] = newValue;
    } else if (newValue >= this.settings.values[0]) this.settings.values[1] = newValue;

    if (!isFirstValueNull && !this.settings.range) {
      const first = this.settings.values[0];
      this.settings.value = first;
      this.settings.values = [null, null];
    }
    if (isValueNull && !this.settings.range) {
      this.settings.value = this.settings.min;
    }
    if (isValuesNull && this.settings.range) {
      if (!isValueNull) {
        this.settings.values = [this.settings.value, this.settings.max];
      } else {
        this.settings.values = [this.settings.min, this.settings.max];
      }
      this.settings.value = null;
    }
    if (isFirstValueNull && this.settings.range) {
      if (!isValueNull) {
        this.settings.values[0] = this.settings.value;
        this.settings.value = null;
      } else {
        this.settings.values[0] = this.settings.min;
      }
    }
    if (isSecondValueNull && this.settings.range) {
      this.settings.values[1] = this.settings.max;
    }
    if (!isValueNull && this.settings.range) {
      this.settings.value = null;
    }
    if (!isValuesNull && !this.settings.range) {
      this.settings.values = [null, null];
    }
  }

  setRange(tmp: boolean) {
    this.settings.range = Boolean(tmp);
    this.setValidValue();
    this.checkValidSettings();
    return this.settings.range;
  }

  setMin(tmp: number) {
    try {
      if (Number(tmp) >= this.settings.max) {
        throw this.errors.minBiggerMax;
      }
      this.settings.min = Number(tmp);
      this.checkValidSettings();
      return this.settings.min;
    } catch (err) {
      console.error(err);
      return this.settings.min;
    }
  }

  setMax(tmp: number) {
    try {
      if (Number(tmp) <= this.settings.min) {
        throw this.errors.minBiggerMax;
      }
      this.settings.max = Number(tmp);
      this.checkValidSettings();
      return this.settings.max;
    } catch (err) {
      console.error(err);
      return this.settings.max;
    }
  }

  setStep(tmp: number) {
    try {
      const valueRange = this.settings.max - this.settings.min;
      const stepBiggerNull = Number(tmp) > 0;
      const stepSmallerRange = Number(tmp) < valueRange;
      if (stepBiggerNull && stepSmallerRange) {
        this.settings.step = Number(tmp);
        this.checkValidSettings();
        return this.settings.step;
      }
      this.settings.step = this.defaultSettings.step;
      throw this.errors.stepBiggerMaxMin;
    } catch (err) {
      console.error(err);
      return this.settings.step;
    }
  }

  setValue(newValue: number, currentValueNumber?: number) {
    if (currentValueNumber !== undefined && currentValueNumber !== null) {
      this.setValidValue(newValue, currentValueNumber);
    } else {
      this.settings.value = newValue;
    }
    this.checkValidSettings();
    return this.settings.value;
  }

  setValues(tmp: number[]) {
    this.settings.values = tmp;
    this.setValidValue();
    this.checkValidSettings();
    return this.settings.values;
  }

  setOrientation(tmp: string) {
    this.settings.orientation = tmp;
    this.checkValidSettings();
    return this.settings.orientation;
  }

  setHasTip(tmp: boolean) {
    this.settings.hasTip = Boolean(tmp);
    return this.settings.hasTip;
  }
}

export { SliderSettings };

export default SliderSettings;
