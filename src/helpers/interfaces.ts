interface ISliderSettings {
  isRange?: boolean;
  min?: number;
  max?: number;
  step?: number;
  isVertical?: boolean;
  from?: number;
  to?: number;
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
  pointerThatChanged: string;
  updateAttributes: Attribute[];
}

interface CalculatedSettings {
  newFrom: number;
  newTo: number;
  newFromInPercents: number;
  newToInPercents: number;
}

export {
  ISliderSettings, MouseSettings, Attribute, PointerPositionData, CalculatedSettings
};
