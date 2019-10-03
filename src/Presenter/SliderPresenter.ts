import { SliderTemplate } from '../View/SliderTemplate';
import { Slider } from '../Model/Slider';
import { ISliderSettings } from '../Model/ISliderSettings';
import { SliderPointer } from '../View/SliderPointer';
import { SliderTemplateRange } from '../View/SliderTemplateRange';


class SliderPresenter {
  public model:Slider;

  public view: any;

  constructor(rootElement: HTMLElement, options: ISliderSettings) {
    this.model = new Slider(options);

    this.createView(rootElement);

    this.view.slider.addEventListener('changePointer', this.onChangePointer.bind(this));
    this.initStartValue();
  }

  onChangePointer(event:any) {
    const currThumb = event.detail;

    const curPosInPercents:number = currThumb.curPos;
    const curPosInVal:number = this.calculateFromPercentsToValue(curPosInPercents);
    const curPosInValWithStep = this.model.calcPointerPosition(curPosInVal);

    const curPosInPercentsWithStep = this.calculateFromValueToPercents(curPosInValWithStep);

    this.render(currThumb, curPosInPercentsWithStep);
    this.setFollowerPointValue(currThumb, curPosInValWithStep);

    if (currThumb === this.view.thumb1) {
      this.model.settings.settings.values[0] = curPosInValWithStep;
    }
    if (currThumb === this.view.thumb2) {
      this.model.settings.settings.values[1] = curPosInValWithStep;
    }
  }

  createView(rootElement:any) {
    if (this.model.settings.settings.range) {
      this.view = new SliderTemplateRange(
        rootElement,
        this.checkOrientationIsVertical(),
        this.model.settings.settings.followerPoint,
      );
    } else {
      this.view = new SliderTemplate(
        rootElement,
        this.checkOrientationIsVertical(),
        this.model.settings.settings.followerPoint,
      );
    }
  }

  initStartValue() {
    if (this.model.settings.settings.range) {
      const curPosInValues:number[] = this.model.settings.settings.values;
      const curPosInValsWithStep:number[] = this.model.calcPointerPosition(curPosInValues);

      const curPosInPercentsWithStep: number[] = [0, 0];
      curPosInPercentsWithStep[0] = this.calculateFromValueToPercents(curPosInValsWithStep[0]);
      curPosInPercentsWithStep[1] = this.calculateFromValueToPercents(curPosInValsWithStep[1]);

      this.view.initRangeLine();

      this.view.thumb1.setCurPosInPercents(curPosInPercentsWithStep[0]);
      this.view.thumb2.setCurPosInPercents(curPosInPercentsWithStep[1]);
    } else {
      const curPosInValue:number = this.model.settings.settings.value;
      const curPosInValWithStep:number = this.model.calcPointerPosition(curPosInValue);

      const curPosInPercentsWithStep:number = this.calculateFromValueToPercents(curPosInValWithStep);

      this.view.thumb.setCurPosInPercents(curPosInPercentsWithStep);
    }
  }

  render(curThumb:SliderPointer, curPos: number) {
    curThumb.renderCurrentPosInPercents(curPos);
  }

  setFollowerPointValue(curThumb:SliderPointer, currPosInValWithStep: number) {
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


  calculateFromPercentsToValue(curPosInPercents:number):number {
    const { minVal } = this.model.settings.settings;
    const { maxVal } = this.model.settings.settings;
    const rangeVal:number = maxVal - minVal;

    const curPosInValue:number = rangeVal * curPosInPercents / 100;

    return curPosInValue + minVal;
  }

  calculateFromValueToPercents(curPosInValue:number):number {
    const { minVal } = this.model.settings.settings;
    const { maxVal } = this.model.settings.settings;
    const rangeVal:number = maxVal - minVal;

    const currPosInPercents:number = (curPosInValue - minVal) * 100 / rangeVal;

    return currPosInPercents;
  }


  checkOrientationIsVertical():boolean {
    const ordersModule = {
      ORIENTATION: 'vertical',
    };
    if (this.model.settings.settings.orientation === ordersModule.ORIENTATION) {
      return true;
    }
    return false;
  }
}


export {
  SliderPresenter,
};
export default SliderPresenter;
