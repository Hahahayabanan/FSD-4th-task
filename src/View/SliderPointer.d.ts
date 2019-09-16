import FollowerPoint from './FollowerPoint';
export declare class SliderPointer {
  thumb: any;
  slider: any;
  _curPos: number;
  isVertical: boolean;
  followerPoint: FollowerPoint;
  constructor(elem: any, slider: any, isVertical: boolean, isFollowerPoint: boolean);
  currPos: number;
  createEventListeners(anotherPointer?: SliderPointer): void;
  renderCurrentPosInPixels(newPos: number): string;
  renderCurrentPosInPercents(newPos: number): string;
  createFollowerPoint(): void;
  deleteFollowerPiont(): void;
}
export default SliderPointer;
