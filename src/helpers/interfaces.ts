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

interface ErrorType {
  MIN?: string;
  MAX?: string;
  STEP?: string;
}

export {
  MouseSettings, Attribute, PointerPositionData, CalculatedSettings, ErrorType,
};
