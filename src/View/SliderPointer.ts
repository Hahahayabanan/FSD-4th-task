import FollowerPoint from './FollowerPoint'

export class SliderPointer{

    public thumb: any;
    public slider: any;
    public _curPos: number;
    public isVertical: boolean;
    public followerPoint: FollowerPoint;

    constructor(elem: any, slider:any, isVertical: boolean, isFollowerPoint: boolean){
        this.thumb = elem;
        this.slider = slider;
        this.isVertical = isVertical;
    }

    get currPos():number{
        return this._curPos;
    }
    set currPos(newCurrPos: number){
        this._curPos = newCurrPos;

        this.slider.dispatchEvent(new CustomEvent('changePointer', {
            bubbles: true,
            detail: this
        }));
    }

    createEventListeners(anotherPointer?: SliderPointer){
        this.thumb.onmousedown = (event:any) => {
            event.preventDefault();
            
            let shift: number = this.isVertical 
                ? event.clientY - this.thumb.getBoundingClientRect().top
                : event.clientX - this.thumb.getBoundingClientRect().left;

            let rightEdge: number = this.isVertical
                ? this.slider.offsetHeight
                : this.slider.offsetWidth;
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
                    ? event.clientY - shift - this.slider.getBoundingClientRect().top 
                    : event.clientX - shift - this.slider.getBoundingClientRect().left 
              
               
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

        this.thumb.ondragstart = function() {
            return false;
        };

    }  

    renderCurrentPosInPixels(newPos:number){
        let widthOrHeight: string = this.isVertical 
            ? this.slider.getBoundingClientRect().height || this.slider.style.height
            : this.slider.getBoundingClientRect().width || this.slider.style.width;

        newPos = newPos * 100 / parseInt(widthOrHeight, 10);

        return this.renderCurrentPosInPercents(newPos);
    }

    renderCurrentPosInPercents(newPos: number){
        let newCssLeftOrTop: string = this.isVertical
            ? this.thumb.style.top = newPos + '%'
            : this.thumb.style.left = newPos + '%';
        return newCssLeftOrTop;
    }


    createFollowerPoint(){
        if(this.isVertical)this.slider.classList.add('j-plugin-slider_with-point_vertical');
        else this.slider.classList.add('j-plugin-slider_with-point');
        this.followerPoint = new FollowerPoint(this.thumb, this.isVertical);
    }
    
    deleteFollowerPiont(){
        if(this.followerPoint !== undefined){
            this.followerPoint.destroy();
            this.followerPoint = undefined;
            this.slider.classList.remove('j-plugin-slider_with-point');
            this.slider.classList.remove('j-plugin-slider_with-point_vertical');
        }
    }











}

export default SliderPointer;