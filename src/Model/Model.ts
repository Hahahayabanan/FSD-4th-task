import { isArray } from 'util';
import { SliderSettings } from './SliderSettings';
import { EventObserver } from '../EventObserver/EventObserver';

class Model {
  private settings: SliderSettings;

  public valuesObserver: EventObserver = new EventObserver();

  public settingsObserver: EventObserver = new EventObserver();

  constructor(sett?: object) {
    this.settings = new SliderSettings(sett);
  }

  setSettings(sett: object) {
    this.settings = new SliderSettings(sett);
  }

  getSettings() {
    return this.settings.settings;
  }

  calculateValueWithStep(pos: number[]): number[];

  calculateValueWithStep(pos: number): number;

  calculateValueWithStep(pos: any) {
    const { min, max } = this.settings.settings;
    const { step } = this.settings.settings;

    if (isArray(pos)) {
      const firstCurrentValue = pos[0] - min;
      const secondCurrentValue = pos[1] - min;
      let values: number[] = [firstCurrentValue, secondCurrentValue];

      const firstCurrentValueWithoutStep = Math.round(values[0] / step);
      const secondCurrentValueWithoutStep = Math.round(values[1] / step);

      const currentStep: number[] = [
        firstCurrentValueWithoutStep,
        secondCurrentValueWithoutStep,
      ];

      let firstCurrentValueWithStep = currentStep[0] * step + min;
      let secondCurrentValueWithStep = currentStep[1] * step + min;

      if (firstCurrentValueWithStep > max) firstCurrentValueWithStep = max;
      if (secondCurrentValueWithStep > max) secondCurrentValueWithStep = max;

      values = [firstCurrentValueWithStep, secondCurrentValueWithStep];
      return values;
    }

    let currentValue: number = pos - min;
    const currentStep: number = Math.round(currentValue / step);
    currentValue = currentStep * step;
    currentValue += min;
    if (currentValue > max) currentValue = max;
    return currentValue;
  }

  calculateFromPercentsToValue(curPosInPercents: number): number {
    const { min, max } = this.settings.settings;
    const rangeVal: number = max - min;

    const curPosInValue: number = (rangeVal * curPosInPercents) / 100;

    return curPosInValue + min;
  }

  calculateFromValueToPercents(curPosInValue: number): number {
    const { min, max } = this.settings.settings;
    const rangeVal: number = max - min;

    const currPosInPercents: number = ((curPosInValue - min) * 100) / rangeVal;

    return currPosInPercents;
  }

  calculateValue(curPosInPercents: number, updateObject: string) {
    const curPosInValue: number = this.calculateFromPercentsToValue(curPosInPercents);
    const curPosInValueWithStep: number = this.calculateValueWithStep(
      curPosInValue,
    );
    let currentValueNumber: number;
    switch (updateObject) {
      case 'firstValue': currentValueNumber = 0;
        break;
      case 'secondValue': currentValueNumber = 1;
        break;
      case 'singleValue': currentValueNumber = null;
        break;
      default: return NaN;
    }
    this.setValue(curPosInValueWithStep, currentValueNumber);
    this.dispatchValue();
  }

  calculateStartValues() {
    if (this.getRange()) {
      const values: number[] = this.getValues() as number[];
      const valuesWithStep: number[] = values.map(val => this.calculateValueWithStep(val));
      this.setValues(valuesWithStep);
    } else {
      const curPosInValue: number = this.getValue();
      const curPosInValueWithStep: number = this.calculateValueWithStep(
        curPosInValue,
      );
      this.setValue(curPosInValueWithStep);
    }
    this.dispatchValue();
  }

  dispatchValue() {
    const newValues = this.getRange() ? this.getValues() : this.getValue();
    this.valuesObserver.broadcast({ newValues });
  }

  dispatchSettings() {
    const { range, orientation, hasTip } = this.getSettings();
    this.settingsObserver.broadcast({ range, orientation, hasTip });
    this.dispatchValue();
  }

  setRange(tmp: boolean) {
    this.settings.setRange(tmp);
    this.dispatchSettings();
  }

  setMin(tmp: number) {
    this.settings.setMin(tmp);
    this.dispatchSettings();
  }

  setMax(tmp: number) {
    this.settings.setMax(tmp);
    this.dispatchSettings();
  }

  setStep(tmp: number) {
    this.settings.setStep(tmp);
    this.dispatchSettings();
  }

  setValue(tmp: number, currentValueNumber?: number) {
    this.settings.setValue(tmp, currentValueNumber);
    this.dispatchValue();
  }

  setValues(tmp: number[]) {
    this.settings.setValues(tmp);
  }

  setOrientation(tmp: string) {
    this.settings.setOrientation(tmp);
    this.dispatchSettings();
  }

  setHasTip(tmp: boolean) {
    this.settings.setHasTip(tmp);
    this.dispatchSettings();
  }

  getRange(): boolean {
    return this.settings.settings.range;
  }

  getMin(): number {
    return this.settings.settings.min;
  }

  getMax(): number {
    return this.settings.settings.max;
  }

  getStep(): number {
    return this.settings.settings.step;
  }

  getValue(): number {
    return this.settings.settings.value;
  }

  getValues(number?: number): number[] | number {
    if (number !== undefined) {
      return this.settings.settings.values[number];
    }
    return this.settings.settings.values;
  }

  getOrientation(): string {
    return this.settings.settings.orientation;
  }

  getHasTip(): boolean {
    return this.settings.settings.hasTip;
  }
}

export { Model };

export default Model;
