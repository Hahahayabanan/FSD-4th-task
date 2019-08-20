import { SliderTemplate } from './View/SliderTemplate';
import { Slider } from './Model/Slider';
import { SliderSettings } from './Model/SliderSettings';
import { SliderTemplateVertical } from './View/SliderTemplateVertical'


import { SliderPresenter } from './Presenter/SliderPresenter';

import * as $ from 'jquery';





describe('Model / Slider / Test initialization', () => {

    let slider = new Slider();

    it('Should initializate slider object', () => {
        
        slider.setSettings({
            range: false, 
            minVal: 1, 
            maxVal: 10, 
            stepVal: 1, 
        });

        expect(slider.settings).toEqual(new SliderSettings({
            range: false, 
            minVal: 1, 
            maxVal: 10, 
            stepVal: 1, 
        }));
    });
       

    it('Should change slider settings', () => {

        slider.settings.setMaxVal(150);
        slider.settings.setMinVal(10);

        expect(slider.settings).toEqual(new SliderSettings({
            range: false, 
            minVal: 10, 
            maxVal: 150, 
            stepVal: 1, 
        }));
    });

    
})

describe('Model / Slider / Test moving', () => {

    
    let slider = new Slider({
        minVal: 20,
        maxVal: 100,
        stepVal: 2
    }); 

    slider.settings.setStepVal(5);
           
    it('Should change pointer position 60', ()=>{
        expect(slider.setPointerPosition(58)).toEqual(60);
    });

    it('Should change pointer position 90', ()=>{
        expect(slider.setPointerPosition(92)).toEqual(90);
    });

})









describe('View / Slider template / Test of setting pointer positions', () => {


    let shadowSlider = document.createElement('div');
    shadowSlider.classList.add('slider');

    
    let slider = new SliderTemplate(shadowSlider);

    // setting style.width because we dont have DOM
    slider.slider.style.cssText = 'width: 300px';

     
    it('Curr position should be set', ()=>{
        slider.currPos = 150;
        expect(slider.currPos).toEqual(150);
    });

    it('Should update value of curr position on change', () => {
        
        slider.renderCurrentPos(100);
        // width  300px - 100 %
        // newPos 100px -  33 %
        expect(slider.thumb.style.left).toEqual('33%');

        slider.renderCurrentPos(236);
        // width  300px - 100 %
        // newPos 236px -  79 %
        expect(slider.thumb.style.left).toEqual('79%');
    });

});

describe('View / Vertical Slider template / Test of setting pointer positions', () => {
    let shadowSlider = document.createElement('div');
    shadowSlider.classList.add('slider');
    
    let slider = new SliderTemplateVertical(shadowSlider);
    slider.slider.style.cssText = 'height: 300px';
     
    it('Curr position should be set', ()=>{
        slider.currPos = 150;
        expect(slider.currPos).toEqual(150);
    });

    it('Should update value of curr position on change', () => {
        slider.renderCurrentPos(100);
        expect(slider.thumb.style.top).toEqual('33%');

        slider.renderCurrentPos(236);
        expect(slider.thumb.style.top).toEqual('79%');
    });

});




describe('Presenter / SliderPresenter / Test initialization', () => {
    
    let shadowSlider = document.createElement('div');
    shadowSlider.classList.add('slider');
    
    shadowSlider.style.cssText = 'width: 300px';
    

    let slider: SliderPresenter = new SliderPresenter(shadowSlider, {
        minVal: 10,
        stepVal: 5,
        maxVal: 100,
        range: false
    });

    it("Should coincide constructor set values 'value'", ()=>{
        slider = new SliderPresenter(shadowSlider, {
            range: false,
            minVal: 10,
            stepVal: 5,
            maxVal: 100,
            value: 53
        });
        expect(slider.model.settings.settings.value).toEqual(55);
    });


    it("Should coincide constructor values 'step'", () => {
        expect(slider.model.settings.settings.stepVal).toEqual(5);
    });
    it("Should coincide constructor values default 'value'", () => {
        expect(slider.model.settings.settings.value).toEqual(10);
    });
   
    
})

