import { FollowerPoint } from './FollowerPoint';

class SliderPointer {
  public thumbHTMLElem: any;

  public sliderHTMLElem: any;

  public curPos: number;

  public isVertical: boolean;

  public followerPoint: FollowerPoint;

  public anotherPointer:SliderPointer;

  public mouseMoveParameters: { rightEdge:number, leftEdge:number, mouseX: number, mouseY:number};

  public endPos: number;

  constructor(elemHTML: any, sliderHTML:any, isVertical: boolean) {
    this.thumbHTMLElem = elemHTML;
    this.sliderHTMLElem = sliderHTML;
    this.isVertical = isVertical;
  }

  setCurPosInPercents(newCurrPos: number) {
    this.curPos = newCurrPos;

    this.sliderHTMLElem.dispatchEvent(new CustomEvent('changePointer', {
      bubbles: true,
      detail: this,
    }));
  }

  setCurPosInPixels(newCurrPos: number) {
    this.curPos = this.calcPixelsToPercents(newCurrPos);

    this.sliderHTMLElem.dispatchEvent(new CustomEvent('changePointer', {
      bubbles: true,
      detail: this,
    }));
  }

  getCurPosInPixels() {
    return this.calcPercentsToPixels(this.curPos);
  }

  bindEventListeners(anotherPoint?: SliderPointer) {
    this.anotherPointer = anotherPoint;
    this.thumbHTMLElem.addEventListener('mousedown', this.mouseDown);
    this.thumbHTMLElem.ondragstart = function onDragStart() {
      return false;
    };
  }

  mouseDown = (event:any) => {
    event.preventDefault();
    this.endPos = this.curPos;
    this.mouseMoveParameters = this.calcMoveBorders(event);
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  };

  mouseUp = () => {
    this.endPos = this.curPos;
    document.removeEventListener('mouseup', this.mouseUp);
    document.removeEventListener('mousemove', this.mouseMove);
  };

  mouseMove = (event:any) => {
    event.preventDefault();
    const {
      rightEdge, leftEdge, mouseX, mouseY
    } = this.mouseMoveParameters;

    const endPosInPixels = this.calcPercentsToPixels(this.endPos);

    let newCurPos: number = this.isVertical
      ? endPosInPixels - mouseY + event.clientY
      : endPosInPixels - mouseX + event.clientX;
    if (newCurPos < leftEdge) {
      newCurPos = leftEdge;
    }
    if (newCurPos > rightEdge) {
      newCurPos = rightEdge;
    }
    this.setCurPosInPercents(this.calcPixelsToPercents(newCurPos));
  };


  calcMoveBorders(event:any) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    let rightEdge: number = this.getPathLength();

    let leftEdge: number = 0;

    if (this.anotherPointer) {
      if (this.curPos < this.anotherPointer.curPos) {
        rightEdge = this.anotherPointer.curPos;
      } else if (this.curPos > this.anotherPointer.curPos) {
        leftEdge = this.anotherPointer.curPos;
      }
    }

    return {
      rightEdge, leftEdge, mouseX, mouseY,
    };
  }

  getPathLength() {
    const widthOrHeight: number = this.isVertical
      ? parseInt(this.sliderHTMLElem.getBoundingClientRect().height || this.sliderHTMLElem.style.height, 10)
      : parseInt(this.sliderHTMLElem.getBoundingClientRect().width || this.sliderHTMLElem.style.width, 10);
    return widthOrHeight;
  }

  calcPixelsToPercents(valueInPixels: number) {
    const lengthInPixels = this.getPathLength();
    const valueInPercents = valueInPixels * 100 / lengthInPixels;
    return valueInPercents;
  }

  calcPercentsToPixels(valueInPercents: number) {
    const lengthInPixels = this.getPathLength();
    const valueInPixels = valueInPercents / 100 * lengthInPixels;
    return valueInPixels;
  }

  renderCurrentPosInPixels(newPos:number) {
    const length = this.getPathLength();
    const newPosition = newPos * 100 / length;
    return this.renderCurrentPosInPercents(newPosition);
  }

  renderCurrentPosInPercents(newPos: number) {
    const newCssLeftOrTop: string = this.isVertical
      ? this.thumbHTMLElem.style.top = `${newPos}%`
      : this.thumbHTMLElem.style.left = `${newPos}%`;
    return newCssLeftOrTop;
  }


  createFollowerPoint() {
    this.sliderHTMLElem.parentNode.classList.add('j-plugin-slider_with-point');
    this.followerPoint = new FollowerPoint(this.thumbHTMLElem, this.isVertical);
  }

  deleteFollowerPoint() {
    if (this.followerPoint !== undefined) {
      this.followerPoint.destroy();
      this.followerPoint = undefined;
      this.sliderHTMLElem.parentNode.classList.remove('j-plugin-slider_with-point');
    }
  }
}
export {
  SliderPointer,
};
export default SliderPointer;
