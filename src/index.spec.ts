import { SliderTemplate } from './View/SliderTemplate';
import { Slider } from './Model/Slider';
import { SliderSettings } from './Model/SliderSettings';





describe('Model / Slider / Test initialization', () => {

    let slider = new Slider();



    it('Should to initializate slider object', () => {
        
        slider.setSettings({
            type: 'single', 
            minVal: 1, 
            maxVal: 10, 
            stepVal: 1, 
            followerVal: false
        });

        expect(slider.settings).toEqual(new SliderSettings({
            type: 'single', 
            minVal: 1, 
            maxVal: 10, 
            stepVal: 1, 
            followerVal: false
        }));
    });
       

    it('Should to change slider settings', () => {
        slider.settings.setType('range');
        slider.settings.setMaxVal(100);

        expect(slider.settings).toEqual(new SliderSettings({
            type: 'range', 
            minVal: 1, 
            maxVal: 100, 
            stepVal: 1, 
            followerVal: false
        }))
    });


})











describe('View / Slider template / Test initialization', () => {

    let slider = function createSlider(){

        let shadowSlider = document.createElement('div');

        let shadowSliderThumb = document.createElement('div');
        shadowSlider.appendChild(shadowSliderThumb);
        
        return new SliderTemplate();
    }


  it('A ', () => {
    
  });

});