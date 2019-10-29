import * as $ from 'jquery';
import { ISliderSettings } from './ISliderSettings';

class SliderSettings {
  protected defaultSettings: ISliderSettings = {
    range: false,
    minVal: 0,
    maxVal: 100,
    stepVal: 1,
    orientation: 'horizontal',
    value: null,
    values: [null, null],
    followerPoint: false,
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
    this.checkValidValues();
  }

  checkValidValues() {
    const ordersModule = {
      ORIENTATION_VERTICAL: 'vertical',
      ORIENTATION_HORIZONTAL: 'horizontal',
    };
    const isOrientationVertical =
      this.settings.orientation !== ordersModule.ORIENTATION_VERTICAL;
    const isOrientationHorizontal =
      this.settings.orientation !== ordersModule.ORIENTATION_HORIZONTAL;
    const isOrientationSet = isOrientationVertical && isOrientationHorizontal;
    const valueRange = this.settings.maxVal - this.settings.minVal;
    const isStepSmallerNull = this.settings.stepVal < 0;
    const isStepBiggerRange = this.settings.stepVal < valueRange;
    const isValueBiggerMaxVal = this.settings.value > this.settings.maxVal;
    const isValueSmallerMinVal = this.settings.value < this.settings.minVal;
    const isFirstValueSmallerMinVal =
      this.settings.values[0] < this.settings.minVal;
    const isSecondValueBiggerMaxVal =
      this.settings.values[1] > this.settings.maxVal;
    const isFirstValueBiggerMaxVal =
      this.settings.values[0] > this.settings.maxVal;
    const isSecondValueSmallerMinVal =
      this.settings.values[1] < this.settings.minVal;
    const isFirstValueBiggerSecond =
      this.settings.values[0] > this.settings.values[1];
    const isSecondValueSmallerFirst =
      this.settings.values[1] < this.settings.values[0];

    if (this.settings.minVal >= this.settings.maxVal) {
      this.settings.maxVal = this.defaultSettings.maxVal;
      this.settings.minVal = this.defaultSettings.minVal;
      this.settings.value = this.defaultSettings.value;
      this.settings.values = this.defaultSettings.values;
      this.settings.stepVal = this.defaultSettings.stepVal;
    }
    if (isStepSmallerNull && isStepBiggerRange) {
      this.settings.stepVal = this.defaultSettings.stepVal;
    }
    if (valueRange % this.settings.stepVal !== 0) {
      this.settings.stepVal = this.defaultSettings.stepVal;
    }
    if (isValueBiggerMaxVal && !this.settings.range) {
      this.settings.value = this.settings.maxVal;
    }
    if (isValueSmallerMinVal && !this.settings.range) {
      this.settings.value = this.settings.minVal;
    }
    if (isFirstValueSmallerMinVal && this.settings.range) {
      this.settings.values[0] = this.settings.minVal;
    }
    if (isSecondValueBiggerMaxVal && this.settings.range) {
      this.settings.values[1] = this.settings.maxVal;
    }
    if (isFirstValueBiggerMaxVal && this.settings.range) {
      this.settings.values[0] =
        this.settings.maxVal - this.settings.stepVal < this.settings.maxVal
          ? this.settings.maxVal - this.settings.stepVal
          : this.settings.maxVal;
    }
    if (isSecondValueSmallerMinVal && this.settings.range) {
      this.settings.values[1] =
        this.settings.minVal + this.settings.stepVal < this.settings.minVal
          ? this.settings.minVal + this.settings.stepVal
          : this.settings.minVal;
    }
    if (isFirstValueBiggerSecond && this.settings.range) {
      const first = this.settings.values[1];
      this.settings.values[0] = first;
    }
    if (isSecondValueSmallerFirst && this.settings.range) {
      const first = this.settings.values[0];
      this.settings.values[1] = first;
    }
    if (isOrientationSet) {
      this.settings.orientation = this.defaultSettings.orientation;
    }
  }

  setValidValue() {
    const isFirstValueNull = this.settings.values[0] === null;
    const isSecondValueNull = this.settings.values[1] === null;
    const isValuesNull = this.settings.values === [null, null];
    const isValueNull = this.settings.value === null;

    if (!isFirstValueNull && !this.settings.range) {
      const first = this.settings.values[0];
      this.settings.value = first;
      this.settings.values = [null, null];
    }
    if (isValueNull && !this.settings.range) {
      this.settings.value = this.settings.minVal;
    }
    if (isValuesNull && this.settings.range) {
      if (!isValueNull) {
        this.settings.values = [this.settings.value, this.settings.maxVal];
      } else {
        this.settings.values = [this.settings.minVal, this.settings.maxVal];
      }
      this.settings.value = null;
    }
    if (isFirstValueNull && this.settings.range) {
      if (!isValueNull) {
        this.settings.values[0] = this.settings.value;
        this.settings.value = null;
      } else {
        this.settings.values[0] = this.settings.minVal;
      }
    }
    if (isSecondValueNull && this.settings.range) {
      this.settings.values[1] = this.settings.maxVal;
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
    this.checkValidValues();
    return this.settings.range;
  }

  setMinVal(tmp: number) {
    try {
      if (Number(tmp) >= this.settings.maxVal) {
        throw this.errors.minBiggerMax;
      }
      this.settings.minVal = Number(tmp);
      this.checkValidValues();
      return this.settings.minVal;
    } catch (err) {
      console.error(err);
      return this.settings.minVal;
    }
  }

  setMaxVal(tmp: number) {
    try {
      if (Number(tmp) <= this.settings.minVal) {
        throw this.errors.minBiggerMax;
      }
      this.settings.maxVal = Number(tmp);
      this.checkValidValues();
      return this.settings.maxVal;
    } catch (err) {
      console.error(err);
      return this.settings.maxVal;
    }
  }

  setStepVal(tmp: number) {
    try {
      const valueRange = this.settings.maxVal - this.settings.minVal;
      const stepBiggerNull = Number(tmp) > 0;
      const stepSmallerRange = Number(tmp) < valueRange;
      if (stepBiggerNull && stepSmallerRange) {
        this.settings.stepVal = Number(tmp);
        this.checkValidValues();
        return this.settings.stepVal;
      }
      this.settings.stepVal = this.defaultSettings.stepVal;
      throw this.errors.stepBiggerMaxMin;
    } catch (err) {
      console.error(err);
      return this.settings.stepVal;
    }
  }

  setValue(tmp: number) {
    this.settings.value = Number(tmp);
    this.setValidValue();
    this.checkValidValues();
    return this.settings.value;
  }

  setValues(tmp: number[]) {
    this.settings.values = tmp;
    this.setValidValue();
    this.checkValidValues();
    return this.settings.values;
  }

  setOrientation(tmp: string) {
    this.settings.orientation = tmp;
    this.checkValidValues();
    return this.settings.orientation;
  }

  setFollowerPoint(tmp: boolean) {
    this.settings.followerPoint = Boolean(tmp);
    return this.settings.followerPoint;
  }
}

export { SliderSettings };

export default SliderSettings;
