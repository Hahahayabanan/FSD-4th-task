import Checkbox from '../checkbox/checkbox';
import InputTextField from '../input-text-field/input-text-field';
import Slider from '../slider/slider';

class ControlPanel {
  public $controlPanel: JQuery<Object>;

  public slider: Slider;

  public isRangeCheckbox: Checkbox;

  public isVerticalCheckbox: Checkbox;

  public hasTipCheckbox: Checkbox;

  public hasLineCheckbox: Checkbox;

  public minValueField: InputTextField;

  public maxValueField: InputTextField;

  public stepField: InputTextField;

  public firstValueField: InputTextField;

  public secondValueField: InputTextField;

  constructor($container: JQuery<Object>, slider: Slider) {
    this.slider = slider;
    this.initControlPanel($container);
  }

  initControlPanel($container: JQuery<Object>) {
    this.$controlPanel = $container.find('.js-control-panel');
    this.initCheckboxes();
    this.initInputFields();
    this.bindEventListeners();
  }

  initCheckboxes() {
    const $isRangeCheckbox = this.$controlPanel.find('.js-control-panel__is-range-checkbox');
    const $isVerticalCheckbox = this.$controlPanel.find('.js-control-panel__is-vertical-checkbox');
    const $hasTipCheckbox = this.$controlPanel.find('.js-control-panel__has-tip-checkbox');
    const $hasLineCheckbox = this.$controlPanel.find('.js-control-panel__has-line-checkbox');

    this.isRangeCheckbox = new Checkbox($isRangeCheckbox, 'isRange');
    this.isVerticalCheckbox = new Checkbox($isVerticalCheckbox, 'isVertical');
    this.hasTipCheckbox = new Checkbox($hasTipCheckbox, 'hasTip');
    this.hasLineCheckbox = new Checkbox($hasLineCheckbox, 'hasLine');

    const {
      isRange, hasTip, hasLine, isVertical,
    } = this.slider.getProperties();

    this.isRangeCheckbox.toggleChecked(isRange);
    this.hasTipCheckbox.toggleChecked(hasTip);
    this.hasLineCheckbox.toggleChecked(hasLine);
    this.isVerticalCheckbox.toggleChecked(isVertical);
  }

  initInputFields() {
    const $minValueField = this.$controlPanel.find('.js-control-panel__min-value-field');
    const $maxValueField = this.$controlPanel.find('.js-control-panel__max-value-field');
    const $stepField = this.$controlPanel.find('.js-control-panel__step-field');
    const $firstValueField = this.$controlPanel.find('.js-control-panel__first-value-field');
    const $secondValueField = this.$controlPanel.find('.js-control-panel__second-value-field');

    this.minValueField = new InputTextField($minValueField, 'min');
    this.maxValueField = new InputTextField($maxValueField, 'max');
    this.stepField = new InputTextField($stepField, 'step');
    this.firstValueField = new InputTextField($firstValueField, 'from');
    this.secondValueField = new InputTextField($secondValueField, 'to');

    const {
      min, max, step, from, to,
    } = this.slider.getProperties();

    this.minValueField.setValue(`${min}`);
    this.maxValueField.setValue(`${max}`);
    this.stepField.setValue(`${step}`);
    this.firstValueField.setValue(`${from}`);
    this.secondValueField.setValue(`${to}`);

    this.toggleValueFields();
  }

  bindEventListeners() {
    this.hasTipCheckbox.getElement().on('change', this.handleCheckboxChange.bind(this, this.hasTipCheckbox));
    this.isRangeCheckbox.getElement().on('change', this.handleCheckboxChange.bind(this, this.isRangeCheckbox));
    this.hasLineCheckbox.getElement().on('change', this.handleCheckboxChange.bind(this, this.hasLineCheckbox));
    this.isVerticalCheckbox.getElement().on('change', this.handleCheckboxChange.bind(this, this.isVerticalCheckbox));

    this.minValueField.getElement().on('change', this.handleFieldChange.bind(this, this.minValueField));
    this.maxValueField.getElement().on('change', this.handleFieldChange.bind(this, this.maxValueField));
    this.stepField.getElement().on('change', this.handleFieldChange.bind(this, this.stepField));
    this.firstValueField.getElement().on('change', this.handleFieldChange.bind(this, this.firstValueField));
    this.secondValueField.getElement().on('change', this.handleFieldChange.bind(this, this.secondValueField));

    this.slider.getElement().on('changePointer', this.handleSliderChangePointer.bind(this));
  }

  handleCheckboxChange(checkbox: Checkbox) {
    const property: string = checkbox.getProperty();
    const newPropertyValue: boolean = checkbox.isChecked();

    this.slider.setPropertyValue(property, newPropertyValue);
    this.toggleValueFields();
  }

  handleFieldChange(field: InputTextField) {
    const property: string = field.getProperty();
    const newPropertyValue: number = parseFloat(`${field.getValue()}`);
    this.slider.setPropertyValue(property, newPropertyValue);
    const trueValue = `${this.slider.getProperties()[property]}`;
    field.setValue(trueValue);
  }

  handleSliderChangePointer() {
    const { from, to } = this.slider.getProperties();
    this.firstValueField.setValue(`${from}`);
    this.secondValueField.setValue(`${to}`);
  }

  toggleValueFields() {
    if (this.slider.getProperties().isRange) {
      this.secondValueField.toggleInvisible(false);
    } else {
      this.secondValueField.toggleInvisible(true);
    }
  }

  getElement() {
    return this.$controlPanel;
  }
}

export default ControlPanel;
