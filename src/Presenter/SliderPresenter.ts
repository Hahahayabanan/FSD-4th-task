import { SliderTemplate } from '../View/SliderTemplate';
import { Slider } from '../Model/Slider';
import { ISliderSettings } from '../Model/ISliderSettings';
import { SliderPointer } from '../View/SliderPointer';

class SliderPresenter {
  public model: Slider;

  public view: any;

  constructor(rootElement: HTMLElement, options: ISliderSettings) {
    this.model = new Slider(options);

    this.createView(rootElement);

    this.view.slider.addEventListener(
      'changePointer',
      this.onChangePointer.bind(this),
    );
    this.updateValue();
  }

  onChangePointer(event: any) {
    const currThumb = event.detail;

    const curPosInPercents: number = currThumb.curPos;
    const curPosInVal: number = this.model.calculateFromPercentsToValue(
      curPosInPercents,
    );
    const curPosInValWithStep = this.model.calcPointerPosition(curPosInVal);

    const curPosInPercentsWithStep = this.model.calculateFromValueToPercents(
      curPosInValWithStep,
    );
    this.render(currThumb, curPosInPercentsWithStep);
    this.setFollowerPointValue(currThumb, curPosInValWithStep);

    if (this.model.settings.settings.range) {
      this.view.calculateAndApplyRangeLine();

      if (currThumb === this.view.thumb0) {
        this.model.settings.settings.values[0] = curPosInValWithStep;
      }
      if (currThumb === this.view.thumb1) {
        this.model.settings.settings.values[1] = curPosInValWithStep;
      }
    } else {
      this.model.settings.settings.value = curPosInValWithStep;
    }
    this.updateValuesDataAttributes();
  }

  createView(rootElement: any) {
    this.view = new SliderTemplate({
      rootElem: rootElement,
      isVertical: this.checkOrientationIsVertical(),
      isFollowerPoint: this.model.settings.settings.followerPoint,
      isRange: this.model.settings.settings.range,
    });
  }

  updateValue() {
    if (this.model.settings.settings.range) {
      const curPosInValues: number[] = this.model.settings.settings.values;
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

      this.view.thumb0.setCurPosInPercents(curPosInPercentsWithStep[0]);
      this.view.thumb1.setCurPosInPercents(curPosInPercentsWithStep[1]);
      this.updateDataAttributes();
    } else {
      const curPosInValue: number = this.model.settings.settings.value;
      const curPosInValWithStep: number = this.model.calcPointerPosition(
        curPosInValue,
      );

      const curPosInPercentsWithStep: number = this.model.calculateFromValueToPercents(
        curPosInValWithStep,
      );

      this.view.thumb0.setCurPosInPercents(curPosInPercentsWithStep);
      this.updateDataAttributes();
    }
  }

  render(curThumb: SliderPointer, curPos: number) {
    curThumb.renderCurrentPosInPercents(curPos);
  }

  setFollowerPointValue(curThumb: SliderPointer, currPosInValWithStep: number) {
    if (this.model.settings.settings.followerPoint) {
      if (curThumb.followerPoint !== undefined) {
        curThumb.followerPoint.setValue(currPosInValWithStep);
      } else {
        curThumb.createFollowerPoint();
        curThumb.followerPoint.setValue(currPosInValWithStep);
      }
    } else {
      curThumb.deleteFollowerPoint();
    }
  }

  checkOrientationIsVertical(): boolean {
    const ordersModule = {
      ORIENTATION: 'vertical',
    };
    if (this.model.settings.settings.orientation === ordersModule.ORIENTATION) {
      return true;
    }
    return false;
  }

  updateDataAttributes() {
    this.view.setDataAttribute(
      'minVal',
      `${this.model.settings.settings.minVal}`,
    );
    this.view.setDataAttribute(
      'minVal',
      `${this.model.settings.settings.maxVal}`,
    );
    this.view.setDataAttribute(
      'followerPoint',
      `${this.model.settings.settings.followerPoint}`,
    );
    this.view.setDataAttribute(
      'orientation',
      `${this.model.settings.settings.orientation}`,
    );
    this.view.setDataAttribute(
      'range',
      `${this.model.settings.settings.range}`,
    );
    this.view.setDataAttribute(
      'stepVal',
      `${this.model.settings.settings.stepVal}`,
    );
  }

  updateValuesDataAttributes() {
    if (this.model.settings.settings.range) {
      this.view.setDataAttribute(
        'values',
        `[${this.model.settings.settings.values}]`,
      );
    } else {
      this.view.setDataAttribute(
        'value',
        `${this.model.settings.settings.value}`,
      );
    }
  }
}

export { SliderPresenter };
export default SliderPresenter;
