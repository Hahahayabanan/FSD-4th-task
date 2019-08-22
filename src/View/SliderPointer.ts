export class SliderPointer{

    public thumb: any;
    public slider: any;
    public _curPos: number;
    public isVertical: boolean;

    constructor(elem: any, slider:any, isVertical: boolean){
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

    createEventListeners(anotherPointer?: any){
        this.thumb.onmousedown = (event:any) => {
            event.preventDefault();
            
            let shift: number = this.isVertical 
                ? event.clientY - this.thumb.getBoundingClientRect().top
                : event.clientX - this.thumb.getBoundingClientRect().left;

            let rightEdge: number = this.isVertical
                ? this.slider.offsetHeight - this.thumb.offsetHeight
                : this.slider.offsetWidth - this.thumb.offsetWidth;
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



    












}

export default SliderPointer;