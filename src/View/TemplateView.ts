import { PointerView } from './PointerView';

class TemplateView {
  public sliderHTML: HTMLElement;

  public pathHTML: HTMLElement;

  public pointer0: PointerView = undefined;

  public pointer1: PointerView = undefined;

  public isVertical: boolean = false;

  public hasTip: boolean = false;

  public isRange: boolean = false;

  public range: HTMLElement;

  public lastPointerMoved: PointerView;

  public styleClasses = {
    SLIDER: 'j-plugin-slider',
    PATH: 'j-plugin-slider__path',
    THUMB: 'j-plugin-slider__thumb',
    THUMB_SELECTED: 'j-plugin-slider__thumb_selected',
    RANGE: 'j-plugin-slider__range',
    SLIDER_VERTICAL: 'j-plugin-slider_vertical',
    SLIDER_WITH_POINT: 'j-plugin-slider_with-point',
  };

  constructor(options: {
    rootElem: HTMLElement;
    isVertical?: boolean;
    hasTip?: boolean;
    isRange?: boolean;
  }) {
    const { rootElem, isVertical, hasTip, isRange } = options;
    this.sliderHTML = rootElem;
    this.isVertical = isVertical;
    this.hasTip = hasTip;
    this.isRange = isRange;

    this.createTemplate();
    this.bindEventListeners();
  }

  createTemplate() {
    this.pathHTML = document.createElement('div');
    this.sliderHTML.classList.add(this.styleClasses.SLIDER);
    this.pathHTML.classList.add(this.styleClasses.PATH);
    this.sliderHTML.append(this.pathHTML);

    let thumb = document.createElement('div');
    this.pathHTML.append(thumb);
    this.pointer0 = new PointerView(thumb, this.isVertical);
    this.pointer0.pointerHTML.classList.add(this.styleClasses.THUMB);

    if (this.isRange) {
      thumb = document.createElement('div');
      this.pathHTML.append(thumb);
      this.pointer1 = new PointerView(thumb, this.isVertical);
      this.pointer1.pointerHTML.classList.add(this.styleClasses.THUMB);

      this.range = document.createElement('div');
      this.range.classList.add(this.styleClasses.RANGE);
      this.pathHTML.prepend(this.range);
    }

    if (this.isVertical) {
      this.sliderHTML.classList.add(this.styleClasses.SLIDER_VERTICAL);
    }
    if (this.hasTip) {
      this.sliderHTML.classList.add(this.styleClasses.SLIDER_WITH_POINT);
    }
    this.lastPointerMoved = this.pointer0;
  }

  bindEventListeners() {
    this.pathHTML.addEventListener('mousedown', this.sliderOnClick);

    this.bindPointerEventListeners();
  }

  bindPointerEventListeners() {
    this.pointer0.pointerHTML.addEventListener('mousedown', this.mouseDown);
    this.pointer0.pointerHTML.ondragstart = function onDragStart() {
      return false;
    };
    if (this.isRange) {
      this.pointer1.pointerHTML.addEventListener('mousedown', this.mouseDown);
      this.pointer1.pointerHTML.ondragstart = function onDragStart() {
        return false;
      };
    }
  }

  private mouseDown = (event: any) => {
    event.preventDefault();

    const thisThumb: HTMLElement = event.currentTarget;
    let currentPointer: PointerView;

    if (this.isRange && this.pointer0.curPos === this.pointer1.curPos) {
      currentPointer = this.lastPointerMoved;
    } else if (thisThumb === this.pointer0.pointerHTML) {
      currentPointer = this.pointer0;
    } else if (thisThumb === this.pointer1.pointerHTML) {
      currentPointer = this.pointer1;
    }

    this.updateZIndex(currentPointer);

    const { rightEdge, leftEdge, mouseX, mouseY } = this.calcMoveBorders(
      event,
      currentPointer,
    );
    currentPointer.endPos = currentPointer.curPos;

    const mouseMove = (event: any) => {
      event.preventDefault();
      const endPosInPixels = currentPointer.calcPercentsToPixels(
        currentPointer.endPos,
      );

      let newCurPos: number = this.isVertical
        ? endPosInPixels - mouseY + event.clientY
        : endPosInPixels - mouseX + event.clientX;

      if (newCurPos < leftEdge) {
        newCurPos = leftEdge;
      }
      if (newCurPos > rightEdge) {
        newCurPos = rightEdge;
      }

      currentPointer.setCurPosInPercents(
        currentPointer.calcPixelsToPercents(newCurPos),
      );
    };

    const mouseUp = () => {
      this.lastPointerMoved = currentPointer;

      document.removeEventListener('mouseup', mouseUp);
      document.removeEventListener('mousemove', mouseMove);
    };

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  };

  private calcMoveBorders(event: any, currentPointer: PointerView) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    let leftEdge: number = 0;
    let rightEdge: number = currentPointer.getPathLength();

    if (this.isRange) {
      if (
        this.pointer0.curPos === this.pointer1.curPos &&
        currentPointer !== this.lastPointerMoved
      ) {
        leftEdge = currentPointer.calcPercentsToPixels(currentPointer.curPos);
        rightEdge = currentPointer.calcPercentsToPixels(currentPointer.curPos);
      } else if (currentPointer === this.pointer0) {
        leftEdge = 0;
        rightEdge = currentPointer.calcPercentsToPixels(this.pointer1.curPos);
      } else if (currentPointer === this.pointer1) {
        leftEdge = currentPointer.calcPercentsToPixels(this.pointer0.curPos);
        rightEdge = this.pointer1.getPathLength();
      }
    }

    return {
      rightEdge,
      leftEdge,
      mouseX,
      mouseY,
    };
  }

  private sliderOnClick = (event: any) => {
    event.preventDefault();
    const curTarget: HTMLElement = event.target;

    const isValidClick =
      curTarget.className === this.styleClasses.PATH ||
      curTarget.className === this.styleClasses.RANGE;
    if (!isValidClick) return;

    const newLeft: number = this.isVertical
      ? event.clientY - this.pathHTML.getBoundingClientRect().top
      : event.clientX - this.pathHTML.getBoundingClientRect().left;

    if (this.isRange) {
      const pointersRange = this.calculatePointersRange();

      if (newLeft < pointersRange) {
        this.pointer0.setCurPosInPixels(newLeft);
      }
      if (newLeft > pointersRange) {
        this.pointer1.setCurPosInPixels(newLeft);
      }
    } else {
      this.pointer0.setCurPosInPixels(newLeft);
    }
  };

  calculateAndApplyRangeLine = () => {
    if (this.isVertical) {
      this.range.style.top = this.pointer0.pointerHTML.style.top;
      const range =
        parseInt(this.pointer1.pointerHTML.style.top, 10) -
        parseInt(this.pointer0.pointerHTML.style.top, 10);
      this.range.style.height = `${range}%`;
    } else {
      this.range.style.left = this.pointer0.pointerHTML.style.left;
      const range =
        parseInt(this.pointer1.pointerHTML.style.left, 10) -
        parseInt(this.pointer0.pointerHTML.style.left, 10);
      this.range.style.width = `${range}%`;
    }
  };

  calculatePointersRange() {
    const res: number =
      (this.pointer1.getCurPosInPixels() - this.pointer0.getCurPosInPixels()) /
        2 +
      this.pointer0.getCurPosInPixels();
    return res;
  }

  setDataAttribute(attr: string, value: string) {
    this.sliderHTML.dataset[attr] = value;
  }

  updateZIndex(curThumb: PointerView) {
    this.pointer0.pointerHTML.classList.remove(
      this.styleClasses.THUMB_SELECTED,
    );
    if (this.isRange)
      this.pointer1.pointerHTML.classList.remove(
        this.styleClasses.THUMB_SELECTED,
      );
    curThumb.pointerHTML.classList.add(this.styleClasses.THUMB_SELECTED);
  }

  destroy() {
    this.pointer0.pointerHTML.remove();
    this.pointer0 = undefined;
    if (this.isRange) {
      this.pointer1.pointerHTML.remove();
      this.pointer1 = undefined;
    }
    this.pathHTML.remove();
    this.pathHTML = undefined;
    this.sliderHTML.classList.remove(
      this.styleClasses.SLIDER,
      this.styleClasses.SLIDER_VERTICAL,
      this.styleClasses.SLIDER_WITH_POINT,
    );
    this.sliderHTML.remove();
    this.sliderHTML = undefined;
  }
}
export { TemplateView };
export default TemplateView;
