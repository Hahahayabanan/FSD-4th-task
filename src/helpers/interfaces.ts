interface MouseSettings {
  mouseX: number;
  mouseY: number;
}

interface Attribute {
  name: string;
  value: string;
}

interface PointerPositionData {
  position: number;
  pointerThatChanged: string;
  updateAttributes: Attribute[];
}

interface CalculatedSettings {
  from: number;
  to: number;
  fromInPercents: number;
  toInPercents: number;
}

interface ErrorType {
  MIN?: string;
  MAX?: string;
  STEP?: string;
}

export {
  MouseSettings, Attribute, PointerPositionData, CalculatedSettings, ErrorType,
};
