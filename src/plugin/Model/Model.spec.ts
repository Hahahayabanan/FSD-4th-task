import { Model } from './Model';

describe('Model / Test of setting other pointer values', () => {
  const model = new Model({
    min: 20,
    max: 100,
    step: 2,
    isRange: true,
    from: 25,
    to: 55,
  });

  model.setSettings({ step: 5 });

  it('Should change pointer position 65', () => {
    model.applyValue(58, 'second');
    expect(model.getSettings().to).toEqual(65);
  });

  it('Should change pointer position 90', () => {
    expect(model.calculateValueWithStep(92)).toEqual(90);
  });

  describe('Model / Test of calculating value', () => {
    it('calculatePercentsToValue', () => {
      expect(model.calculatePercentsToValue(58)).toEqual(66.4);
    });

    it('calculateValueToPercents', () => {
      expect(model.calculateValueToPercents(58)).toEqual(47.5);
    });
  });
});

describe('Model / Test getters and setters', () => {
  const model: Model = new Model();

  beforeEach(() => {
    model.setSettings({
      isRange: false,
      min: -1000,
      max: 1000,
      step: 1,
    });
  });

  it("Should coincide set values 'step'", () => {
    model.setSettings({ step: 10 });
    expect(model.getSettings().step).toEqual(10);
  });

  it("Should coincide set values 'from'", () => {
    model.setSettings({ from: -20 });
    expect(model.getSettings().from).toEqual(-20);
  });

  it("Should coincide set values 'max'", () => {
    model.setSettings({ max: 100 });
    expect(model.getSettings().max).toEqual(100);
  });

  it("Should coincide set values 'isRange'", () => {
    model.setSettings({ isRange: true });
    expect(model.getSettings().isRange).toBeTruthy();
  });

  it("Should coincide set values 'hasTip'", () => {
    model.setSettings({ hasTip: false });
    expect(model.getSettings().hasTip).toEqual(false);
  });

  it("Should coincide set values 'to'", () => {
    model.setSettings({ isRange: true });
    model.setSettings({ to: 35 });
    expect(model.getSettings().to).toEqual(35);
  });

  it('Should coincide set values \'from and to\'', () => {
    model.setSettings({ isRange: true, from: 35 });
    expect(model.getSettings().from).toEqual(35);
    model.setSettings({ to: 55 });
    expect(model.getSettings().to).toEqual(55);
  });

  it("Should coincide set values 'isVertical'", () => {
    model.setSettings({ isVertical: true });
    expect(model.getSettings().isVertical).toBeTruthy();
  });
});

describe('Model / Test default values setting', () => {
  it('Should init default isVertical', () => {
    const model = new Model({});
    expect(model.getSettings().isVertical).toBeFalsy();
  });

  it('Should init default isRange', () => {
    const model = new Model({});
    expect(model.getSettings().isRange).toBeFalsy();
  });

  it('Should init default minVal', () => {
    const model = new Model({});
    expect(model.getSettings().min).toEqual(0);
  });

  it('Should init default stepVal', () => {
    const model = new Model({});
    expect(model.getSettings().step).toEqual(1);
  });

  it('Should init default from', () => {
    const model = new Model({});
    expect(model.getSettings().from).toEqual(0);
  });

  it('Should init default to', () => {
    const model = new Model({});
    expect(model.getSettings().to).toEqual(null);
  });
});
