import { Presenter } from './Presenter';

document.body.innerHTML = '<div id="test" class="slider"></div>';

const shadowSlider = document.querySelector('#test') as HTMLElement;

describe('Presenter / Presenter / Test initialization', () => {
  shadowSlider.style.cssText = 'width: 300px';

  let presenter: Presenter = new Presenter(shadowSlider, {
    min: 10,
    step: 5,
    max: 100,
    isRange: false,
    hasTip: true,
  });

  it("Should coincide constructor set values 'value'", () => {
    presenter = new Presenter(shadowSlider, {
      isRange: false,
      min: 10,
      step: 5,
      max: 100,
      value: 53,
    });
    expect(presenter.model.getSetting('value')).toEqual(55);
  });

  it("Should coincide constructor values 'step'", () => {
    presenter = new Presenter(shadowSlider, {
      step: 5,
    });
    expect(presenter.model.getSetting('step')).toEqual(5);
  });

  it("Should coincide constructor values default 'value'", () => {
    presenter = new Presenter(shadowSlider, {
      min: 10,
      max: 100,
      isRange: false,
    });
    expect(presenter.model.getSetting('value')).toEqual(10);
  });

  it('Should coincide follower pointer value', () => {
    presenter = new Presenter(shadowSlider, {
      hasTip: true,
    });
    expect(presenter.model.getSetting('value')).toEqual(
      parseInt(presenter.view.pointer0.tip.tipHTML.innerHTML, 10),
    );
  });
});

describe('Presenter / Presenter / Test initialization', () => {
  shadowSlider.style.cssText = 'width: 300px';

  const presenter: Presenter = new Presenter(shadowSlider, {
    min: 10,
    step: 5,
    max: 100,
    isRange: true,
    values: [25, 35],
  });

  it("Should coincide constructor set values 'range'", () => {
    expect(presenter.model.getSetting('isRange')).toBeTruthy();
  });

  it("Should coincide constructor set values 'values'", () => {
    expect(presenter.model.getSetting('values')).toEqual([25, 35]);
  });

  it('Should coincide constructor set values on range line', () => {
    expect(presenter.view.lineHTML.style.left).toEqual(
      presenter.view.pointer0.pointerHTML.style.left,
    );
  });
});

describe('Presenter / Presenter / Test methods', () => {
  shadowSlider.style.cssText = 'width: 300px';
  let presenter: Presenter;

  beforeEach(() => {
    presenter = new Presenter(shadowSlider, {
      min: 10,
      step: 5,
      max: 100,
      isRange: true,
      values: [25, 75],
    });
  });

  it('updateViewWithNewSettings', async () => {
    await presenter.updateViewWithNewSettings({ isRange: false, hasTip: true });
    expect(presenter.view.isRange).toBeFalsy();
    expect(presenter.view.pointer0.tip).toBeDefined();
    expect(presenter.view.pointer1).toBeNull();
  });

  it('checkOrientationIsVertical', async () => {
    expect(presenter.checkOrientationIsVertical()).toEqual(
      presenter.model.getSetting('orientation') === 'vertical',
    );
  });

  it('updateDataAttributes', async () => {
    await presenter.model.setSetting('min', 0);
    expect(presenter.view.sliderHTML.dataset.min).toEqual('0');
  });

  it('updateValueDataAttributes', async () => {
    await presenter.model.setSetting('values', [35, 65]);
    expect(presenter.view.sliderHTML.dataset.values).toEqual('[35,65]');
  });

  it('getOrSetOption', async () => {
    await presenter.getOrSetOption({ setting: 'values', value: [35, 65] });
    expect(presenter.model.getSetting('values')).toEqual([35, 65]);
  });

  it('getOrSetOption', async () => {
    await presenter.getOrSetOption({ setting: 'isRange', value: false });
    expect(presenter.model.getSetting('isRange')).toBeFalsy();
  });
});
