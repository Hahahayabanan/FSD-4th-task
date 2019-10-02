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

  setCurPos(newCurrPos: number) {
    this.curPos = newCurrPos;

    this.sliderHTMLElem.dispatchEvent(new CustomEvent('changePointer', {
      bubbles: true,
      detail: this,
    }));
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
    document.removeEventListener('mouseup', this.mouseUp);
    document.removeEventListener('mousemove', this.mouseMove);
  };

  mouseMove = (event:any) => {
    event.preventDefault();
    const {
      rightEdge, leftEdge, mouseX, mouseY
    } = this.mouseMoveParameters;
    let newCurPos: number = this.isVertical
      ? this.endPos - mouseY + event.clientY
      : this.endPos - mouseX + event.clientX;

    if (newCurPos < leftEdge) {
      newCurPos = leftEdge;
    }
    if (newCurPos > rightEdge) {
      newCurPos = rightEdge;
    }
    console.log(this.endPos);
    this.setCurPos(newCurPos);
  };


  calcMoveBorders(event:any) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    let rightEdge: number = this.isVertical
      ? this.sliderHTMLElem.offsetHeight
      : this.sliderHTMLElem.offsetWidth;

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


  renderCurrentPosInPixels(newPos:number) {
    const widthOrHeight: string = this.isVertical
      ? this.sliderHTMLElem.getBoundingClientRect().height || this.sliderHTMLElem.style.height
      : this.sliderHTMLElem.getBoundingClientRect().width || this.sliderHTMLElem.style.width;
    const newPosition = newPos * 100 / parseInt(widthOrHeight, 10);
    return this.renderCurrentPosInPercents(newPosition);
  }

  renderCurrentPosInPercents(newPos: number) {
    const newCssLeftOrTop: string = this.isVertical
      ? this.thumbHTMLElem.style.top = `${newPos}%`
      : this.thumbHTMLElem.style.left = `${newPos}%`;
    return newCssLeftOrTop;
  }


  createFollowerPoint() {
    if (this.isVertical) {
      this.sliderHTMLElem.classList.add('j-plugin-slider_with-point_vertical');
    } else {
      this.sliderHTMLElem.classList.add('j-plugin-slider_with-point');
    }
    this.followerPoint = new FollowerPoint(this.thumbHTMLElem, this.isVertical);
  }

  deleteFollowerPoint() {
    if (this.followerPoint !== undefined) {
      this.followerPoint.destroy();
      this.followerPoint = undefined;
      this.sliderHTMLElem.classList.remove('j-plugin-slider_with-point');
      this.sliderHTMLElem.classList.remove('j-plugin-slider_with-point_vertical');
    }
  }
}
export {
  SliderPointer,
};
export default SliderPointer;
