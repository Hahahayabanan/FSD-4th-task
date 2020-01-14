interface MouseSettings {
  mouseX: number;
  mouseY: number;
}

interface Attributes {
  [key: string]: boolean | number;
}

interface ErrorType {
  MIN?: string;
  MAX?: string;
  STEP?: string;
}

export {
  MouseSettings, Attributes, ErrorType,
};
