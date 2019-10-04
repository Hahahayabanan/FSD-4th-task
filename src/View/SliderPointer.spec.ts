import { SliderPointer } from './SliderPointer';

document.body.innerHTML = '<div class="j-slider-plugin__path"><div id="test" class="j-slider-plugin__thumb"></div></div>';

const shadowSlider = document.querySelector('.j-slider-plugin__thumb') as HTMLElement;
const shadowpath = document.querySelector('.j-slider-plugin__path') as HTMLElement;


describe('View / Slider Pointer / Test of setting', () => {
  const pointer = new SliderPointer(shadowSlider);
  beforeEach(() => {
    shadowpath.style.width = '300px';
  });

  it('Slider pointer should be set', () => {
    expect(pointer).toBeDefined(SliderPointer);
  });
  it('Curpos should be set in percents', async () => {
    await pointer.setCurPosInPercents(33);
    expect(Math.round(pointer.curPos)).toEqual(33);
  });
  it('Curpos should be set in pixels', async () => {
    await pointer.setCurPosInPixels(100);
    expect(Math.round(pointer.curPos)).toBeCloseTo(33);
  });
  it('Get curpos in pixels', async () => {
    await pointer.setCurPosInPixels(55);
    expect(Math.round(pointer.getCurPosInPixels())).toBeCloseTo(55);
  });
  it('Render in pixels', async () => {
    await pointer.renderCurrentPosInPercents(29);
    expect(Math.round(parseInt(pointer.thumbHTMLElem.style.left, 10))).toBeCloseTo(29);
  });
});
