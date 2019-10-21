import { SliderPointer } from './SliderPointer';

class SliderTemplate {
  public slider: HTMLElement;

  public sliderPath: HTMLElement;

  public thumb0: SliderPointer = undefined;

  public thumb1: SliderPointer = undefined;

  public isVertical: boolean = false;

  public isFollowerPoint: boolean = false;

  public isRange: boolean = false;

  public range: HTMLElement;

  public lastThumbMoved: SliderPointer;

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
    this.slider = rootElem;
    this.isVertical = isVertical;
    this.isFollowerPoint = isFollowerPoint;
    this.isRange = isRange;

    this.createTemplate();
    this.bindEventListeners();
  }

  createTemplate() {
    this.sliderPath = document.createElement('div');
    this.slider.classList.add(this.styleClasses.SLIDER);
    this.sliderPath.classList.add(this.styleClasses.PATH);
    this.slider.append(this.sliderPath);

    let thumb = document.createElement('div');
    this.sliderPath.append(thumb);
    this.thumb0 = new SliderPointer(thumb, this.isVertical);
    this.thumb0.thumbHTMLElem.classList.add(this.styleClasses.THUMB);

    if (this.isRange) {
      thumb = document.createElement('div');
      this.sliderPath.append(thumb);
      this.thumb1 = new SliderPointer(thumb, this.isVertical);
      this.thumb1.thumbHTMLElem.classList.add(this.styleClasses.THUMB);

      this.range = document.createElement('div');
      this.range.classList.add(this.styleClasses.RANGE);
      this.sliderPath.prepend(this.range);
    }

    if (this.isVertical) {
      this.slider.classList.add(this.styleClasses.SLIDER_VERTICAL);
    }
    if (this.isFollowerPoint) {
      this.slider.classList.add(this.styleClasses.SLIDER_WITH_POINT);
    }
    this.lastThumbMoved = this.thumb0;
  }

  bindEventListeners() {
    this.sliderPath.addEventListener('mousedown', this.sliderOnClick);

    this.bindThumbEventListeners();
  }

  bindThumbEventListeners() {
    this.thumb0.thumbHTMLElem.addEventListener('mousedown', this.mouseDown);
    this.thumb0.thumbHTMLElem.ondragstart = function onDragStart() {
      return false;
    };
    if (this.isRange) {
      this.thumb1.thumbHTMLElem.addEventListener('mousedown', this.mouseDown);
      this.thumb1.thumbHTMLElem.ondragstart = function onDragStart() {
        return false;
      };
    }
  }

  mouseDown = (event: any) => {
    event.preventDefault();

    const thisThumb: HTMLElement = event.currentTarget;
    let currentThumb: SliderPointer;

    if (this.isRange && this.thumb0.curPos === this.thumb1.curPos) {
      currentThumb = this.lastThumbMoved;
    } else if (thisThumb === this.thumb0.thumbHTMLElem) {
      currentThumb = this.thumb0;
    } else if (thisThumb === this.thumb1.thumbHTMLElem) {
      currentThumb = this.thumb1;
    }

    this.updateZIndex(currentThumb);

    const { rightEdge, leftEdge, mouseX, mouseY } = this.calcMoveBorders(
      event,
      currentThumb,
    );
    currentThumb.endPos = currentThumb.curPos;

    const mouseMove = (event: any) => {
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
      this.lastThumbMoved = currentThumb;

      document.removeEventListener('mouseup', mouseUp);
      document.removeEventListener('mousemove', mouseMove);
    };

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  };

  calcMoveBorders(event: any, currentThumb: SliderPointer) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    let leftEdge: number = 0;
    let rightEdge: number = currentThumb.getPathLength();

    if (this.isRange) {
      if (
        this.thumb0.curPos === this.thumb1.curPos &&
        currentThumb !== this.lastThumbMoved
      ) {
        leftEdge = currentThumb.calcPercentsToPixels(currentThumb.curPos);
        rightEdge = currentThumb.calcPercentsToPixels(currentThumb.curPos);
      } else if (currentThumb === this.thumb0) {
        leftEdge = 0;
        rightEdge = currentThumb.calcPercentsToPixels(this.thumb1.curPos);
      } else if (currentThumb === this.thumb1) {
        leftEdge = currentThumb.calcPercentsToPixels(this.thumb0.curPos);
        rightEdge = this.thumb1.getPathLength();
      }
    }

    return {
      rightEdge,
      leftEdge,
      mouseX,
      mouseY,
    };
  }

  sliderOnClick = (event: any) => {
    event.preventDefault();
    const curTarget: HTMLElement = event.target;

    const isValidClick =
      curTarget.className === this.styleClasses.PATH ||
      curTarget.className === this.styleClasses.RANGE;
    if (!isValidClick) return;

    const newLeft: number = this.isVertical
      ? event.clientY - this.sliderPath.getBoundingClientRect().top
      : event.clientX - this.sliderPath.getBoundingClientRect().left;

    if (this.isRange) {
      const pointersRange = this.calculatePointersRange();

      if (newLeft < pointersRange) {
        this.thumb0.setCurPosInPixels(newLeft);
      }
      if (newLeft > pointersRange) {
        this.thumb1.setCurPosInPixels(newLeft);
      }
    } else {
      this.thumb0.setCurPosInPixels(newLeft);
    }
  };

  calculateAndApplyRangeLine = () => {
    if (this.isVertical) {
      this.range.style.top = this.thumb0.thumbHTMLElem.style.top;
      const range =
        parseInt(this.thumb1.thumbHTMLElem.style.top, 10) -
        parseInt(this.thumb0.thumbHTMLElem.style.top, 10);
      this.range.style.height = `${range}%`;
    } else {
      this.range.style.left = this.thumb0.thumbHTMLElem.style.left;
      const range =
        parseInt(this.thumb1.thumbHTMLElem.style.left, 10) -
        parseInt(this.thumb0.thumbHTMLElem.style.left, 10);
      this.range.style.width = `${range}%`;
    }
  };

  calculatePointersRange() {
    const res: number =
      (this.thumb1.getCurPosInPixels() - this.thumb0.getCurPosInPixels()) / 2 +
      this.thumb0.getCurPosInPixels();
    return res;
  }

  setDataAttribute(attr: string, value: string) {
    this.slider.dataset[attr] = value;
  }

  updateZIndex(curThumb: SliderPointer) {
    this.thumb0.thumbHTMLElem.classList.remove(
      this.styleClasses.THUMB_SELECTED,
    );
    if (this.isRange)
      this.thumb1.thumbHTMLElem.classList.remove(
        this.styleClasses.THUMB_SELECTED,
      );
    curThumb.thumbHTMLElem.classList.add(this.styleClasses.THUMB_SELECTED);
  }

  destroy() {
    this.thumb0.thumbHTMLElem.remove();
    if (this.isRange) this.thumb1.thumbHTMLElem.remove();
    this.sliderPath.remove();
    this.slider.classList.remove(
      this.styleClasses.SLIDER,
      this.styleClasses.SLIDER_VERTICAL,
      this.styleClasses.SLIDER_WITH_POINT,
    );
  }
}
export { SliderTemplate };
export default SliderTemplate;
