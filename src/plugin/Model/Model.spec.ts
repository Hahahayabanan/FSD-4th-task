import { Model } from './Model';

describe('Model / Test of setting pointer values', () => {
  const model = new Model({
    min: 20,
    max: 100,
    step: 2,
    isRange: true,
    from: 25,
    to: 55,
  });

  model.setSettings({ step: 5 });

  it('Should change toValue pointer position 65', () => {
    model.applyValue(58, 'toValue');
    expect(model.getSettings().to).toEqual(65);
  });

  it('Method calculateValueWithStep', () => {
    expect(model.calculateValueWithStep(92)).toEqual(90);
  });

  describe('Model / Test of calculating value', () => {
    it('Method calculatePercentsToValue', () => {
      expect(model.calculatePercentsToValue(58)).toEqual(66.4);
    });

    it('Method calculateValueToPercents', () => {
      expect(model.calculateValueToPercents(58)).toEqual(47.5);
    });
  });
});

describe('Model / Test of getters and setters', () => {
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

  it("Should coincide set values 'isVertical'", () => {
    model.setSettings({ isVertical: true });
    expect(model.getSettings().isVertical).toBeTruthy();
  });
});

describe('Model / Test of getters and setters from and to values', () => {
  const model: Model = new Model();

  beforeEach(() => {
    model.setSettings({
      isRange: false,
      min: -1000,
      max: 1000,
      step: 1,
    });
  });

  it('Should coincide set values \'from and to\'', () => {
    model.setSettings({ isRange: true, from: 200, to: 550 });
    expect(model.getSettings().isRange).toEqual(true);
    expect(model.getSettings().from).toEqual(200);
    expect(model.getSettings().to).toEqual(550);
  });
});

describe('Model / Test of default values setting', () => {
  it('Should initialize default \'isVertical\'', () => {
    const model = new Model({});
    expect(model.getSettings().isVertical).toBeFalsy();
  });

  it('Should initialize default \'isRange\'', () => {
    const model = new Model({});
    expect(model.getSettings().isRange).toBeFalsy();
  });

  it('Should initialize default \'minVal\'', () => {
    const model = new Model({});
    expect(model.getSettings().min).toEqual(0);
  });

  it('Should initialize default \'stepVal\'', () => {
    const model = new Model({});
    expect(model.getSettings().step).toEqual(1);
  });

  it('Should initialize default \'from\'', () => {
    const model = new Model({});
    expect(model.getSettings().from).toEqual(0);
  });

  it('Should initialize default \'to\'', () => {
    const model = new Model({});
    expect(model.getSettings().to).toEqual(null);
  });
});
