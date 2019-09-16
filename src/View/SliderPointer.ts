import FollowerPoint from './FollowerPoint'

class SliderPointer{

  public thumbHTMLElem: any;
  public sliderHTMLElem: any;
  public _curPos: number;
  public isVertical: boolean;
  public followerPoint: FollowerPoint;

  constructor(elemHTML: any, sliderHTML:any, isVertical: boolean){
    this.thumbHTMLElem = elemHTML;
    this.sliderHTMLElem = sliderHTML;
    this.isVertical = isVertical;
  }

  get currPos():number{
    return this._curPos;
  }
  set currPos(newCurrPos: number){
    this._curPos = newCurrPos;

    this.sliderHTMLElem.dispatchEvent(new CustomEvent('changePointer', {
      bubbles: true,
      detail: this
    }));
  }

  createEventListeners(anotherPointer?: SliderPointer){
    this.thumbHTMLElem.onmousedown = (event:any) => {
      event.preventDefault();
      
      let shift: number = this.isVertical 
        ? event.clientY - this.thumbHTMLElem.getBoundingClientRect().top
        : event.clientX - this.thumbHTMLElem.getBoundingClientRect().left;

      let rightEdge: number = this.isVertical
        ? this.sliderHTMLElem.offsetHeight
        : this.sliderHTMLElem.offsetWidth;
      let leftEdge: number = 0;          
      
      let onMouseMove = (event:any) => {
        if(anotherPointer){
          if(this.currPos < anotherPointer.currPos){
            rightEdge = anotherPointer.currPos;
          }else if(this.currPos > anotherPointer.currPos){
            leftEdge = anotherPointer.currPos;
          }
        }

        let newLeft: number = this.isVertical 
          ? event.clientY - shift - this.sliderHTMLElem.getBoundingClientRect().top 
          : event.clientX - shift - this.sliderHTMLElem.getBoundingClientRect().left 
      
        
        if (newLeft < leftEdge) {
          newLeft = leftEdge;
        }

        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }
        
        this.currPos = newLeft;
      }

      let onMouseUp = () => {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    this.thumbHTMLElem.ondragstart = function() {
      return false;
    };

  }  

  renderCurrentPosInPixels(newPos:number){
    let widthOrHeight: string = this.isVertical 
      ? this.sliderHTMLElem.getBoundingClientRect().height || this.sliderHTMLElem.style.height
      : this.sliderHTMLElem.getBoundingClientRect().width || this.sliderHTMLElem.style.width;

    newPos = newPos * 100 / parseInt(widthOrHeight, 10);

    return this.renderCurrentPosInPercents(newPos);
  }

  renderCurrentPosInPercents(newPos: number){
    let newCssLeftOrTop: string = this.isVertical
      ? this.thumbHTMLElem.style.top = newPos + '%'
      : this.thumbHTMLElem.style.left = newPos + '%';
    return newCssLeftOrTop;
  }


  createFollowerPoint(){
    if(this.isVertical){
      this.sliderHTMLElem.classList.add('j-plugin-slider_with-point_vertical');
    }else{
      this.sliderHTMLElem.classList.add('j-plugin-slider_with-point');
    }
    this.followerPoint = new FollowerPoint(this.thumbHTMLElem, this.isVertical);
  }
  
  deleteFollowerPoint(){
    if(this.followerPoint !== undefined){
      this.followerPoint.destroy();
      this.followerPoint = undefined;
      this.sliderHTMLElem.classList.remove('j-plugin-slider_with-point');
      this.sliderHTMLElem.classList.remove('j-plugin-slider_with-point_vertical');
    }
  }

}
export{
  SliderPointer
}
export default SliderPointer;