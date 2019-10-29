import { TemplateView } from '../View/TemplateView';
import { Model } from '../Model/Model';
import { ISliderSettings } from '../Model/ISliderSettings';
import { PointerView } from '../View/PointerView';

class Presenter {
  public model: Model;

  public view: any;

  constructor(rootElement: HTMLElement, options: ISliderSettings) {
    this.model = new Model(options);

    this.createView(rootElement);

    this.view.sliderHTML.addEventListener(
      'changePointer',
      this.onChangePointer.bind(this),
    );
    this.updateValue();
  }

  onChangePointer(event: any) {
    const curPointer = event.detail;

    const curPosInPercents: number = curPointer.curPos;
    const curPosInVal: number = this.model.calculateFromPercentsToValue(
      curPosInPercents,
    );
    const curPosInValWithStep = this.model.calcPointerPosition(curPosInVal);

    const curPosInPercentsWithStep = this.model.calculateFromValueToPercents(
      curPosInValWithStep,
    );
    this.render(curPointer, curPosInPercentsWithStep);
    this.setTipValue(curPointer, curPosInValWithStep);

    if (this.model.getRange()) {
      this.view.calculateAndApplyRangeLine();

      if (curPointer === this.view.pointer0) {
        this.model.setValue(0, curPosInValWithStep);
      }
      if (curPointer === this.view.pointer1) {
        this.model.setValue(1, curPosInValWithStep);
      }
    } else {
      this.model.setValue(curPosInValWithStep);
    }
    this.updateValuesDataAttributes();
  }

  createView(rootElement: any) {
    this.view = new TemplateView({
      rootElem: rootElement,
      isVertical: this.checkOrientationIsVertical(),
      hasTip: this.model.getHasTip(),
      isRange: this.model.getRange(),
    });
    return this.view;
  }

  updateValue() {
    if (this.model.getRange()) {
      const curPosInValues: number[] = this.model.getValues() as number[];
      const curPosInValsWithStep: number[] = this.model.calcPointerPosition(
        curPosInValues,
      );

      const curPosInPercentsWithStep: number[] = [0, 0];
      curPosInPercentsWithStep[0] = this.model.calculateFromValueToPercents(
        curPosInValsWithStep[0],
      );
      curPosInPercentsWithStep[1] = this.model.calculateFromValueToPercents(
        curPosInValsWithStep[1],
      );

      this.view.pointer0.setCurPosInPercents(curPosInPercentsWithStep[0]);
      this.view.pointer1.setCurPosInPercents(curPosInPercentsWithStep[1]);
      this.updateDataAttributes();
    } else {
      const curPosInValue: number = this.model.getValue();
      const curPosInValWithStep: number = this.model.calcPointerPosition(
        curPosInValue,
      );

      const curPosInPercentsWithStep: number = this.model.calculateFromValueToPercents(
        curPosInValWithStep,
      );

      this.view.pointer0.setCurPosInPercents(curPosInPercentsWithStep);
      this.updateDataAttributes();
    }
  }

  render(curPointer: PointerView, curPos: number) {
    curPointer.renderCurrentPosInPercents(curPos);
  }

  setTipValue(curPointer: PointerView, curPosInValWithStep: number) {
    if (this.model.getHasTip()) {
      if (curPointer.tip !== undefined) {
        curPointer.tip.setValue(curPosInValWithStep);
      } else {
        curPointer.createTip();
        curPointer.tip.setValue(curPosInValWithStep);
      }
    } else {
      curPointer.deleteTip();
    }
  }

  checkOrientationIsVertical(): boolean {
    const ordersModule = {
      ORIENTATION: 'vertical',
    };
    if (this.model.getOrientation() === ordersModule.ORIENTATION) {
      return true;
    }
    return false;
  }

  updateDataAttributes() {
    this.view.setDataAttribute('min', `${this.model.getMin()}`);
    this.view.setDataAttribute('max', `${this.model.getMax()}`);
    this.view.setDataAttribute('hasTip', `${this.model.getHasTip()}`);
    this.view.setDataAttribute('orientation', `${this.model.getOrientation()}`);
    this.view.setDataAttribute('range', `${this.model.getRange()}`);
    this.view.setDataAttribute('step', `${this.model.getStep()}`);
  }

  updateValuesDataAttributes() {
    if (this.model.getRange()) {
      this.view.setDataAttribute('values', `[${this.model.getValues()}]`);
    } else {
      this.view.setDataAttribute('value', `${this.model.getValue()}`);
    }
  }
}

export { Presenter };
export default Presenter;
