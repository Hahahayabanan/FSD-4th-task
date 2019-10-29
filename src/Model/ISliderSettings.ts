interface ISliderSettings {
  range?: boolean;
  minVal?: number;
  maxVal?: number;
  stepVal?: number;
  orientation?: string;
  value?: number;
  values?: Array<number>;
  followerPoint?: boolean;
}

export { ISliderSettings };

export default ISliderSettings;
