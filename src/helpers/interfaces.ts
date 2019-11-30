interface ISliderSettings {
  isRange?: boolean;
  min?: number;
  max?: number;
  step?: number;
  orientation?: string;
  value?: number;
  values?: Array<number>;
  hasTip?: boolean;
  hasLine?: boolean;
}

interface MouseSettings {
  mouseX: number;
  mouseY: number;
}

interface Attribute {
  name: string;
  value: string;
}

interface PointerPositionData {
  newCurPos: number;
  updateObject: string;
  updateAttributes: Attribute[];
}

interface CalculatedSettings {
  newValue: number;
  newValues: number[];
  newValueInPercents: number;
  newValuesInPercents: number[];
}

export {
  ISliderSettings, MouseSettings, Attribute, PointerPositionData, CalculatedSettings
};
