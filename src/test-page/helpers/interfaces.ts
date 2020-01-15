import InputTextField from '../blocks/input-text-field/input-text-field';

export interface ParticleProperties {
  bgWidth?: number;
  bgHeight?: number;
  bgColor?: string;
  color?: string;
  radiusModifier?: number;
  radius?: number;
  count?: number;
  velocityModifier?: number;
  velocityX?: number;
  velocityY?: number;
  x?: number;
  y?: number;
  shadowBlur?: number;
  shadowModifier?: number;
  alpha?: number;
  alphaModifier?: number;
}

export type TextFieldsArray = {
  [key: string] : InputTextField;
};
