import { MainView } from './MainView';
import styleClasses from '../styleClasses';

document.body.innerHTML = '<div id="test" class="slider"></div>';

const sliderElement = document.querySelector('#test') as HTMLElement;

describe('View / Main view / Test of initialization', () => {
  const view: MainView = new MainView({
    rootElem: sliderElement,
    isRange: false,
    isVertical: false,
    hasLine: false,
    hasTip: false,
  });

  beforeEach(() => {
    view.update({
      isVertical: true,
      hasTip: true,
    });
  });


  it('Slider class with point should be set', () => {
    expect(view.sliderElement).toHaveClass(
      styleClasses.SLIDER_WITH_TIP,
    );
  });

  it('Slider class vertical should be set', () => {
    expect(view.sliderElement).toHaveClass(styleClasses.SLIDER_VERTICAL);
  });
});

describe('View / Main view / Test of update view', () => {
  const view: MainView = new MainView({
    rootElem: sliderElement,
    isRange: false,
    isVertical: false,
    hasLine: false,
    hasTip: false,
  });

  it('Should coincide set data attributes', () => {
    view.setDataAttributes({ from: 99, isVertical: true });
    expect(view.sliderElement.dataset.from).toEqual('99');
    expect(view.sliderElement.dataset.isVertical).toEqual('true');
  });

  it('Should coincide update value \'isRange\'', () => {
    view.update({
      isRange: true,
    });
    expect(view.path.toValuePointer).toBeDefined();
  });

  it('Should coincide update value \'isVertical\'', () => {
    view.update({
      isVertical: true,
    });
    expect(view.sliderElement.classList.contains(styleClasses.SLIDER_VERTICAL)).toBeTrue();
  });

  it('Should coincide update value \'hasLine\'', () => {
    view.update({
      hasLine: true,
    });
    expect(view.path.lineElement).toBeDefined();
  });

  it('Should coincide update value \'hasTip\'', () => {
    view.update({
      hasTip: true,
    });
    expect(view.path.fromValuePointer.tip).toBeDefined();
    expect(view.sliderElement.classList.contains(styleClasses.SLIDER_WITH_TIP)).toBeTrue();
  });
});
