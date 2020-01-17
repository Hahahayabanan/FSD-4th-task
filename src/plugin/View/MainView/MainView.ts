import bind from 'bind-decorator';
import { PathView } from '../PathView/PathView';
import { Attributes } from '../../helpers/interfaces';
import styleClasses from '../styleClasses';

class MainView {
  public sliderElement: HTMLElement;

  public path: PathView;

  constructor(options: {
    rootElem: HTMLElement;
    isVertical: boolean;
    hasTip: boolean;
    isRange: boolean;
    hasLine: boolean;
  }) {
    const {
      isVertical, hasTip, isRange, hasLine, rootElem,
    } = options;
    this.sliderElement = rootElem;

    this.createTemplate();
    this.update({
      isRange, isVertical, hasLine, hasTip,
    });
  }

  @bind
  setPointerPosition(data: {
    fromValue?: number,
    toValue?: number,
    fromValueTipValue?: number,
    toValueTipValue?: number,
    attributes?: Attributes,
  }) {
    const {
      fromValue, toValue, fromValueTipValue, toValueTipValue, attributes,
    } = data;
    this.path.setPointerPosition({
      fromValue,
      toValue,
      fromValueTipValue,
      toValueTipValue,
    });
    this.setDataAttributes(attributes);
  }

  setDataAttributes(attributes: Attributes = {}) {
    Object.keys(attributes).forEach((key) => {
      this.sliderElement.dataset[key] = `${attributes[key]}`;
    });
  }

  update(data: {
    isRange?: boolean,
    isVertical?: boolean,
    hasTip?: boolean,
    hasLine?: boolean,
    attributes?: Attributes
  }) {
    const {
      isVertical, hasTip, hasLine, isRange, attributes,
    } = data;
    if (isVertical !== undefined) {
      this.toggleOrientation(isVertical);
      this.path.updateLine();
    }
    if (hasTip !== undefined) {
      if (this.sliderElement.classList.contains(styleClasses.SLIDER_WITH_TIP) && !hasTip) {
        this.sliderElement.classList.remove(styleClasses.SLIDER_WITH_TIP);
      } else {
        this.sliderElement.classList.add(styleClasses.SLIDER_WITH_TIP);
      }
      this.path.toggleTip(hasTip);
    }
    if (hasLine !== undefined) {
      this.path.toggleLine(hasLine);
    }
    if (isRange !== undefined) {
      this.path.toggleRange(isRange);
      this.path.updateLine();
    }

    this.setDataAttributes(attributes);
  }

  private createTemplate() {
    this.sliderElement.classList.add(styleClasses.SLIDER);
    this.path = new PathView();
    this.sliderElement.append(this.path.pathElement);
  }

  private toggleOrientation(isVertical: boolean) {
    if (isVertical) {
      this.sliderElement.classList.add(styleClasses.SLIDER_VERTICAL);
    } else {
      this.sliderElement.classList.remove(styleClasses.SLIDER_VERTICAL);
    }
    this.path.toggleOrientation(isVertical);
  }
}

export { MainView };
export default MainView;
