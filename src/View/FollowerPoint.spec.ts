import { FollowerPoint } from './FollowerPoint';

document.body.innerHTML =
  '<div id="test" class="j-slider-plugin__thumb"></div>';

const shadowFollower = document.querySelector(
  '.j-slider-plugin__thumb',
) as HTMLElement;
const follower = new FollowerPoint(shadowFollower);

describe('View / Follower point / Test of setting', () => {
  it('Slider pointer should be set', () => {
    expect(follower.elemHTMLElement).toHaveClass(
      'j-plugin-slider__follower-point',
    );
  });
  it('Slider pointer value should be set', () => {
    follower.setValue(25);
    expect(follower.elemHTMLElement.innerHTML).toEqual('25');
  });
  it('Slider pointer should be unset', () => {
    follower.destroy();
    expect(
      document.querySelector('.j-plugin-slider__follower-point'),
    ).toBeNull();
  });
});
