export class SliderPointer{

    public thumb: any;
    public slider: any;
    public _curPos: number;

    constructor(elem: any, slider:any){
        this.thumb = elem;
        this.slider = slider;
    }

    get currPos():number{
        return this._curPos;
    }
    set currPos(newCurrPos: number){
        this._curPos = newCurrPos;

        this.thumb.dispatchEvent(new CustomEvent('changePointer', {
            bubbles: true,
            detail: this.currPos
        }));
    }




    createEventListeners(anotherPointer?: any){
        this.thumb.onmousedown = (event:any) => {
            event.preventDefault();

            let shiftX = event.clientX - this.thumb.pointer.getBoundingClientRect().left;
           
            let onMouseMove = (event:any) => {

                let newLeft: number = event.clientX - shiftX - this.slider.getBoundingClientRect().left;
               
                if (newLeft < 0) {
                    newLeft = 0;
                }

                let rightEdge: number = this.slider.offsetWidth - this.thumb.offsetWidth;

                if (newLeft > rightEdge) {
                    newLeft = rightEdge;
                }

                if(anotherPointer){
                    rightEdge = anotherPointer.currPos;

                    if (newLeft > rightEdge) {
                        newLeft = rightEdge;
                    }

                    if (newLeft < rightEdge) {
                        newLeft = rightEdge;
                    }
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

    createEventListenersVertical(anotherPointer?: any){
        this.thumb.onmousedown = (event:any) => {
            event.preventDefault();

            let shiftY = event.clientY - this.thumb.pointer.getBoundingClientRect().top;
           
            let onMouseMove = (event:any) => {

                let newTop: number = event.clientY - shiftY - this.slider.getBoundingClientRect().top;
               
                if (newTop < 0) {
                    newTop = 0;
                }

                let topEdge: number = this.slider.offsetHeight - this.thumb.offsetHeight;

                if (newTop > topEdge) {
                    newTop = topEdge;
                }

                if(anotherPointer){
                    topEdge = anotherPointer.currPos;

                    if (newTop > topEdge) {
                        newTop = topEdge;
                    }

                    if (newTop < topEdge) {
                        newTop = topEdge;
                    }
                }
                

                this.currPos = newTop;
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
        let width = this.slider.getBoundingClientRect().width || this.slider.style.width;
        newPos = newPos * 100 / parseInt(width, 10);

        return this.renderCurrentPosInPercents(newPos);
    }
    renderCurrentPosInPixelsVertical(newPos:number){
        let height = this.slider.getBoundingClientRect().height || this.slider.style.height;
        newPos = newPos * 100 / parseInt(height, 10);

        return this.renderCurrentPosInPercentsVertical(newPos);
    }


    renderCurrentPosInPercents(newPos: number){
        this.thumb.style.left = newPos + '%';
        return this.thumb.style.left;
    }
    renderCurrentPosInPercentsVertical(newPos: number){
        this.thumb.style.top = newPos + '%';
        return this.thumb.style.top;
    }



    












}

export default SliderPointer;