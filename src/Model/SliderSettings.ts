import * as $ from 'jquery';
import { ISliderSettings } from './ISliderSettings';

class SliderSettings {
  protected defaultSettings: ISliderSettings = {
    isRange: false,
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

  constructor(settings: ISliderSettings) {
    this.settings = $.extend(this.defaultSettings, settings);

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
    if (isValueBiggerMax && !this.settings.isRange) {
      this.settings.value = this.settings.max;
    }
    if (isValueSmallerMin && !this.settings.isRange) {
      this.settings.value = this.settings.min;
    }
    if (isFirstValueSmallerMin && this.settings.isRange) {
      this.settings.values[0] = this.settings.min;
    }
    if (isSecondValueBiggerMax && this.settings.isRange) {
      this.settings.values[1] = this.settings.max;
    }
    if (isFirstValueBiggerMax && this.settings.isRange) {
      this.settings.values[0] = this.settings.max - this.settings.step < this.settings.max
        ? this.settings.max - this.settings.step
        : this.settings.max;
    }
    if (isSecondValueSmallerMin && this.settings.isRange) {
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

    if (!isFirstValueNull && !this.settings.isRange) {
      const first = this.settings.values[0];
      this.settings.value = first;
      this.settings.values = [null, null];
    }
    if (isValueNull && !this.settings.isRange) {
      this.settings.value = this.settings.min;
    }
    if (isValuesNull && this.settings.isRange) {
      if (!isValueNull) {
        this.settings.values = [this.settings.value, this.settings.max];
      } else {
        this.settings.values = [this.settings.min, this.settings.max];
      }
      this.settings.value = null;
    }
    if (isFirstValueNull && this.settings.isRange) {
      if (!isValueNull) {
        this.settings.values[0] = this.settings.value;
        this.settings.value = null;
      } else {
        this.settings.values[0] = this.settings.min;
      }
    }
    if (isSecondValueNull && this.settings.isRange) {
      this.settings.values[1] = this.settings.max;
    }
    if (!isValueNull && this.settings.isRange) {
      this.settings.value = null;
    }
    if (!isValuesNull && !this.settings.isRange) {
      this.settings.values = [null, null];
    }
  }

  setIsRange(tmp: boolean) {
    this.settings.isRange = Boolean(tmp);
    this.setValidValue();
    this.checkValidSettings();
  }

  setMin(tmp: number) {
    try {
      if (Number(tmp) >= this.settings.max) {
        throw this.errors.minBiggerMax;
      }
      this.settings.min = Number(tmp);
      this.checkValidSettings();
    } catch (err) {
      console.error(err);
    }
  }

  setMax(tmp: number) {
    try {
      if (Number(tmp) <= this.settings.min) {
        throw this.errors.minBiggerMax;
      }
      this.settings.max = Number(tmp);
      this.checkValidSettings();
    } catch (err) {
      console.error(err);
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
      }
      this.settings.step = this.defaultSettings.step;
      throw this.errors.stepBiggerMaxMin;
    } catch (err) {
      console.error(err);
    }
  }

  setValue(newValue: number, currentValueNumber?: number) {
    if (currentValueNumber !== undefined && currentValueNumber !== null) {
      this.setValidValue(newValue, currentValueNumber);
    } else {
      this.settings.value = newValue;
    }
    this.checkValidSettings();
  }

  setValues(tmp: number[]) {
    this.settings.values = tmp;
    this.setValidValue();
    this.checkValidSettings();
  }

  setOrientation(tmp: string) {
    this.settings.orientation = tmp;
    this.checkValidSettings();
  }

  setHasTip(tmp: boolean) {
    this.settings.hasTip = Boolean(tmp);
  }
}

export { SliderSettings };

export default SliderSettings;
