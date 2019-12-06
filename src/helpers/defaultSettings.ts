import { ISliderSettings } from './interfaces';

const defaultSettings: ISliderSettings = {
  isRange: false,
  min: 0,
  max: 100,
  step: 1,
  isVertical: false,
  from: null,
  to: null,
  hasTip: false,
  hasLine: true,
};

export default defaultSettings;
