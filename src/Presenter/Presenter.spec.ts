import { Presenter } from './Presenter';

document.body.innerHTML = '<div id="test" class="slider"></div>';

const shadowSlider = document.querySelector('#test') as HTMLElement;

describe('Presenter / Test initialization default options', () => {
  shadowSlider.style.cssText = 'width: 300px';

  let presenter: Presenter = new Presenter(shadowSlider, {
    min: 10,
    step: 5,
    max: 100,
    isRange: false,
    hasTip: true,
  });

  it("Should coincide constructor set values 'from'", () => {
    presenter = new Presenter(shadowSlider, {
      isRange: false,
      min: 10,
      step: 5,
      max: 100,
      from: 53,
    });
    expect(presenter.getSetting('from')).toEqual(55);
  });

  it("Should coincide constructor values 'step'", () => {
    presenter = new Presenter(shadowSlider, {
      step: 5,
    });
    expect(presenter.getSetting('step')).toEqual(5);
  });

  it("Should coincide constructor values default 'from'", () => {
    presenter = new Presenter(shadowSlider, {
      min: 10,
      max: 100,
      isRange: false,
    });
    expect(presenter.getSetting('from')).toEqual(10);
  });

  it('Should coincide follower pointer value', () => {
    presenter = new Presenter(shadowSlider, {
      hasTip: true,
    });
    expect(presenter.model.getSetting('from')).toEqual(
      parseInt(presenter.view.pointer0.tip.tipHTML.innerHTML, 10),
    );
  });
});

describe('Presenter / Test initialization options', () => {
  shadowSlider.style.cssText = 'width: 300px';

  const presenter: Presenter = new Presenter(shadowSlider, {
    min: 10,
    max: 100,
    step: 5,
    isRange: true,
    from: 50,
    to: 75,
  });

  it("Should coincide constructor set values 'range'", () => {
    expect(presenter.getSetting('isRange')).toBeTruthy();
  });

  it("Should coincide constructor set values 'from'", () => {
    expect(presenter.getSetting('from')).toEqual(50);
  });

  it("Should coincide constructor set values 'to'", () => {
    expect(presenter.getSetting('to')).toEqual(75);
  });

  it('Should coincide constructor set values on range line', () => {
    expect(presenter.view.lineHTML.style.left).toEqual(
      presenter.view.pointer0.pointerHTML.style.left,
    );
  });
});

describe('Presenter / Test methods', () => {
  shadowSlider.style.cssText = 'width: 300px';
  let presenter: Presenter;

  beforeEach(() => {
    presenter = new Presenter(shadowSlider, {
      min: 10,
      step: 5,
      max: 100,
      isRange: true,
      from: 25,
      to: 35,
    });
  });

  it('updateViewWithNewSettings', async () => {
    await presenter.updateViewSettings({ isRange: false, hasTip: true });
    expect(presenter.view.isRange).toBeFalsy();
    expect(presenter.view.pointer0.tip).toBeDefined();
    expect(presenter.view.pointer1).toBeNull();
  });

  it('checkOrientationIsVertical', async () => {
    expect(presenter.checkOrientationIsVertical()).toEqual(
      presenter.model.getSetting('orientation') === 'vertical',
    );
  });

  // it('getOrSetOption', async () => {
  //   await presenter.getOrSetOption({ setting: 'values', value: [35, 65] });
  //   expect(presenter.model.getSetting('values')).toEqual([35, 65]);
  // });

  // it('getOrSetOption', async () => {
  //   await presenter.getOrSetOption({ setting: 'isRange', value: false });
  //   expect(presenter.model.getSetting('isRange')).toBeFalsy();
  // });
});
