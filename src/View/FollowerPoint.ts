class FollowerPoint{
  public elemHTMLElement: any;
  public isVertical: boolean;
  public thumbHTMLElement: any;

  constructor(thumbHTML: any, isVertical: boolean){
    this.elemHTMLElement = document.createElement('div');
    this.isVertical = isVertical;
    this.thumbHTMLElement = thumbHTML;
    
    this.createTemplate();
  }

  createTemplate(){
    if(this.isVertical){
      this.elemHTMLElement.classList.add('j-slider__follower-point_vertical');
    }else{
      this.elemHTMLElement.classList.add('j-slider__follower-point');
    }
    this.thumbHTMLElement.appendChild(this.elemHTMLElement);
  }

  setValue(value: number){
    this.elemHTMLElement.innerHTML = value;
  }

  destroy(){
    this.elemHTMLElement.remove();
  }

}
export{
  FollowerPoint
}
export default FollowerPoint;