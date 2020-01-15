export interface MousePosition {
  mouseX: number;
  mouseY: number;
}

export interface Attributes {
  [key: string]: boolean | number;
}

export interface ErrorType {
  MIN?: string;
  MAX?: string;
  STEP?: string;
}
