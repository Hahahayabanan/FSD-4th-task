export interface SliderTemplate {
    
}
  
export class SliderTemplate implements SliderTemplate {

    public $slider: any;
    public thumb: any;
    protected _currPos: number;

    constructor($elem: any){
        this.$slider = $elem;

        this.createTemplate();
        this.createEventListeners();
    }

    get currPos():number{
        return this._currPos;
    }
    set currPos(newCurrPos: number){
        this._currPos = newCurrPos;
        this.renderCurrentPos();
    }

    createTemplate(){
        this.$slider.classList.add('j-plugin-slider');

        this.thumb = document.createElement('div');
        this.thumb.classList.add('j-plugin-slider__thumb');

        this.$slider.appendChild(this.thumb);   
    }

    createEventListeners(){
        this.thumb.onmousedown = function(event:any) {
            event.preventDefault(); // предотвратить запуск выделения (действие браузера)

            let shiftX = event.clientX - this.$slider.getBoundingClientRect().left;

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            function onMouseMove(event:any) {
                let newLeft = event.clientX - shiftX - this.$slider.getBoundingClientRect().left;
               
                // курсор вышел из слайдера => оставить бегунок в его границах.
                if (newLeft < 0) {
                    newLeft = 0;
                }

                let rightEdge = this.$slider.offsetWidth - this.thumb.offsetWidth;

                if (newLeft > rightEdge) {
                    newLeft = rightEdge;
                }

                this.currPos = newLeft;
            }

            function onMouseUp() {
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);
            }

        };

        this.thumb.ondragstart = function() {
            return false;
        };

        this.$slider.click = function(event:any) {
            event.preventDefault(); // предотвратить запуск выделения (действие браузера)

            let newLeft = event.clientX - this.$slider.getBoundingClientRect().left;
           
            this.currPos = newLeft;           
        }
    }

    renderCurrentPos(){
        this.thumb.style.left = this.calculateCurrPosInPercents(this.currPos) + '%';
        return this.thumb.style.left;
    }



    // exapmle
    // slider.width  300 px - 100%
    // thumb newPos  50  px - ? %
    calculateCurrPosInPercents(newPos:number){
        let sliderStyle = this.$slider.getBoundingClientRect().width || this.$slider.style.width;

        return Math.round(newPos * 100 / parseInt(sliderStyle, 10));
    }

    

    
}

export default SliderTemplate;
  