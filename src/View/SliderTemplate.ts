export class SliderTemplate{

    public slider: any;
    public thumb: any;
    protected _currPos: number;

    constructor(elem: any){
        this.slider = elem;

        this.createTemplate();
        this.createEventListeners();

    }

    get currPos():number{
        return this._currPos;
    }
    set currPos(newCurrPos: number){
        this._currPos = newCurrPos;

        this.slider.dispatchEvent(new CustomEvent('changePointer', {
            bubbles: true,
            detail: this.currPos
        }));
    }

    createTemplate(){
        this.slider.classList.add('j-plugin-slider');

        this.thumb = document.createElement('div');
        this.thumb.classList.add('j-plugin-slider__thumb');

        this.slider.appendChild(this.thumb);   

    }

    createEventListeners(){
        this.thumb.onmousedown = (event:any) => {
            event.preventDefault();

            let shiftX = event.clientX - this.thumb.getBoundingClientRect().left;
           

            let onMouseMove = (event:any) => {
                let newLeft: number = event.clientX - shiftX - this.slider.getBoundingClientRect().left;
               

                if (newLeft < 0) {
                    newLeft = 0;
                }

                let rightEdge: number = this.slider.offsetWidth - this.thumb.offsetWidth;

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

        this.slider.onclick = (event:any) => {
            event.preventDefault();
            let newLeft: number = event.clientX - this.slider.getBoundingClientRect().left;
            this.currPos = newLeft;           
        }
    }

    renderCurrentPos(newPos: number){
        this.thumb.style.left = this.calculateCurrPosInPercents(newPos) + '%';
        return this.thumb.style.left;
    }



    // exapmle
    // slider.width  300 px - 100%
    // thumb newPos  50  px - ? %

    calculateCurrPosInPercents(newPos:number){
        let sliderStyle: string = this.slider.getBoundingClientRect().width || this.slider.style.width;
        return Math.round(newPos * 100 / parseInt(sliderStyle, 10));
    }

    renderCurrentPosInPercents(newPos: number){
        this.thumb.style.left = newPos + '%';
        return this.thumb.style.left;
    }

    
}

export default SliderTemplate;
  