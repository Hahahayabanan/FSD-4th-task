interface ISliderSettings {
  isRange?: boolean;
  min?: number;
  max?: number;
  step?: number;
  orientation?: string;
  value?: number;
  values?: Array<number>;
  hasTip?: boolean;
}

export { ISliderSettings };

export default ISliderSettings;
