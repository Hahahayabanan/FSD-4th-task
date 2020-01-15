import { PointerView } from './PointerView';

document.body.innerHTML = '<div class="slider"><div class="j-slider-plugin__path"><div id="test" class="j-slider-plugin__slider-pointer"></div></div></div>';

const shadowPath = document.querySelector(
  '.j-slider-plugin__path',
) as HTMLElement;
const pointer = new PointerView(shadowPath);

describe('View / Slider Pointer / Test of setting', () => {
  beforeEach(() => {
    shadowPath.style.width = '300Px';
  });

  it('Slider pointer should be set', () => {
    expect(pointer).toBeDefined(PointerView);
  });

  it('currentPosition should be set in percents', () => {
    pointer.applyPointerPosition(33);
    expect(Math.round(pointer.currentPosition)).toEqual(33);
  });

  it('Render in pixels', () => {
    pointer.render(29);
    expect(
      Math.round(parseInt(pointer.pointerElement.style.left, 10)),
    ).toBeCloseTo(29);
  });

  it('Get path length', () => {
    expect(pointer.getPathLength()).toBeCloseTo(300);
  });

  it('Calc pixels to percents', () => {
    expect(Math.round(pointer.calculateToPercents(150))).toBeCloseTo(50);
  });

  it('Calc percents to pixels', () => {
    expect(pointer.calculateToPixels(60)).toBeCloseTo(180);
  });

  it('Create tip', () => {
    pointer.createTip();
    expect(pointer.tip).toBeDefined();
    expect(pointer.tip.tipElement).toHaveClass('j-plugin-slider__tip');
  });
});

describe('View / Slider Pointer / Test methods', () => {
  beforeEach(() => {
    shadowPath.style.width = '300Px';
  });

  it('Get classList as string value', () => {
    expect(pointer.getClassList()).toBeDefined(`${pointer.pointerElement.classList}`);
  });

  it('Add class to classList', () => {
    const personalPointer = new PointerView(shadowPath);
    personalPointer.addClass('test123');
    expect(personalPointer.pointerElement.classList.contains('test123')).toBeTrue();
  });

  it('Remove class from classList', () => {
    const personalPointer = new PointerView(shadowPath);
    personalPointer.addClass('test123');
    personalPointer.removeClass('test123');
    expect(personalPointer.pointerElement.classList.contains('test123')).toBeFalse();
  });
});
