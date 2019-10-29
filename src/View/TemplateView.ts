import { PointerView } from './PointerView';

class TemplateView {
  public sliderHTML: HTMLElement;

  public pathHTML: HTMLElement;

  public pointer0: PointerView = undefined;

  public pointer1: PointerView = undefined;

  public isVertical: boolean = false;

  public isFollowerPoint: boolean = false;

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
    isFollowerPoint?: boolean;
    isRange?: boolean;
  }) {
    const { rootElem, isVertical, isFollowerPoint, isRange } = options;
    this.sliderHTML = rootElem;
    this.isVertical = isVertical;
    this.isFollowerPoint = isFollowerPoint;
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
    if (this.isFollowerPoint) {
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
    let currentThumb: PointerView;

    if (this.isRange && this.pointer0.curPos === this.pointer1.curPos) {
      currentThumb = this.lastPointerMoved;
    } else if (thisThumb === this.pointer0.pointerHTML) {
      currentThumb = this.pointer0;
    } else if (thisThumb === this.pointer1.pointerHTML) {
      currentThumb = this.pointer1;
    }

    this.updateZIndex(currentThumb);

    const { rightEdge, leftEdge, mouseX, mouseY } = this.calcMoveBorders(
      event,
      currentThumb,
    );
    currentThumb.endPos = currentThumb.curPos;

    const mouseMove = () => {
      event.preventDefault();
      const endPosInPixels = currentThumb.calcPercentsToPixels(
        currentThumb.endPos,
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

      currentThumb.setCurPosInPercents(
        currentThumb.calcPixelsToPercents(newCurPos),
      );
    };

    const mouseUp = () => {
      this.lastPointerMoved = currentThumb;

      document.removeEventListener('mouseup', mouseUp);
      document.removeEventListener('mousemove', mouseMove);
    };

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  };

  private calcMoveBorders(event: any, currentThumb: PointerView) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    let leftEdge: number = 0;
    let rightEdge: number = currentThumb.getPathLength();

    if (this.isRange) {
      if (
        this.pointer0.curPos === this.pointer1.curPos &&
        currentThumb !== this.lastPointerMoved
      ) {
        leftEdge = currentThumb.calcPercentsToPixels(currentThumb.curPos);
        rightEdge = currentThumb.calcPercentsToPixels(currentThumb.curPos);
      } else if (currentThumb === this.pointer0) {
        leftEdge = 0;
        rightEdge = currentThumb.calcPercentsToPixels(this.pointer1.curPos);
      } else if (currentThumb === this.pointer1) {
        leftEdge = currentThumb.calcPercentsToPixels(this.pointer0.curPos);
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
