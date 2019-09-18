import SliderPointer from './SliderPointer';

class SliderTemplate {
  public slider: any;

  public thumb: SliderPointer;

  public isVertical: boolean = false;

  public isFollowerPoint: boolean = false;

  constructor(elem: any, isVertical?:boolean, isFollowerPoint?:boolean) {
    this.slider = elem;
    this.isVertical = isVertical;
    this.isFollowerPoint = isFollowerPoint;

    this.createTemplate();
    this.thumb.createEventListeners();
    this.addEventToSliderClick();
  }

  private sliderOnClick = (event:any) => {
    event.preventDefault();
    const newLeft: number = this.isVertical
      ? event.clientY - this.slider.getBoundingClientRect().top
      : event.clientX - this.slider.getBoundingClientRect().left;
    this.thumb.currPos = newLeft;
  };

  createTemplate() {
    this.thumb = new SliderPointer(document.createElement('div'), this.slider, this.isVertical);
    this.slider.append(this.thumb.thumbHTMLElem);

    if (this.isVertical) {
      this.slider.classList.add('j-plugin-slider_vertical');
      this.thumb.thumbHTMLElem.classList.add('j-plugin-slider__thumb_vertical');
      if (this.isFollowerPoint) {
        this.slider.classList.add('j-plugin-slider_with-point_vertical');
      }
    } else {
      this.slider.classList.add('j-plugin-slider');
      this.thumb.thumbHTMLElem.classList.add('j-plugin-slider__thumb');
      if (this.isFollowerPoint) {
        this.thumb.createFollowerPoint();
      }
    }
  }

  addEventToSliderClick() {
    this.slider.addEventListener('click', this.sliderOnClick);
  }

  destroy() {
    this.slider.removeEventListener('click', this.sliderOnClick);
    this.thumb.thumbHTMLElem.remove();
    this.thumb = undefined;
    this.slider.classList.remove('j-plugin-slider', 'j-plugin-slider_vertical');
  }
}
export {
  SliderTemplate,
};
export default SliderTemplate;
