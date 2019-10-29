import { PointerView } from './PointerView';

document.body.innerHTML =
  '<div class="slider"><div class="j-slider-plugin__path"><div id="test" class="j-slider-plugin__thumb"></div></div></div>';

const shadowThumb = document.querySelector(
  '.j-slider-plugin__thumb',
) as HTMLElement;
const shadowPath = document.querySelector(
  '.j-slider-plugin__path',
) as HTMLElement;
const pointer = new PointerView(shadowThumb);

describe('View / Slider Pointer / Test of setting', () => {
  beforeEach(() => {
    shadowPath.style.width = '300px';
  });

  it('Slider pointer should be set', () => {
    expect(pointer).toBeDefined(PointerView);
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
    expect(
      Math.round(parseInt(pointer.pointerHTML.style.left, 10)),
    ).toBeCloseTo(29);
  });

  it('Get path length', () => {
    expect(pointer.getPathLength()).toBeCloseTo(300);
  });

  it('Calc pixels to percents', () => {
    expect(Math.round(pointer.calcPixelsToPercents(150))).toBeCloseTo(50);
  });

  it('Calc percents to pixels', async () => {
    expect(pointer.calcPercentsToPixels(60)).toBeCloseTo(180);
  });

  it('Create and delete follower point', async () => {
    await pointer.createFollowerPoint();
    expect(pointer.followerPoint).toBeDefined();
    expect(pointer.followerPoint.tipHTML).toHaveClass(
      'j-plugin-slider__follower-point',
    );
    pointer.deleteFollowerPoint();
    expect(pointer.followerPoint).toBeUndefined();
  });
});
