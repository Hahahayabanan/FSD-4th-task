import Checkbox from '../checkbox/checkbox';
import InputTextField from '../input-text-field/input-text-field';
import Slider from '../slider/slider';

class ControlPanel {
  public $controlPanel: JQuery<Object>;

  public slider: Slider;

  public isRangeCheckbox: Checkbox;

  public orientationCheckbox: Checkbox;

  public hasTipCheckbox: Checkbox;

  public hasLineCheckbox: Checkbox;

  public minValueField: InputTextField;

  public maxValueField: InputTextField;

  public stepField: InputTextField;

  public valueField: InputTextField;

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
    this.orientationCheckbox = new Checkbox($isVerticalCheckbox, 'orientation');
    this.hasTipCheckbox = new Checkbox($hasTipCheckbox, 'hasTip');
    this.hasLineCheckbox = new Checkbox($hasLineCheckbox, 'hasLine');

    let value: boolean = this.slider.getPropertyValue('isRange') as boolean;
    this.isRangeCheckbox.toggleChecked(value);
    value = this.slider.getPropertyValue('hasTip') as boolean;
    this.hasTipCheckbox.toggleChecked(value);
    value = this.slider.getPropertyValue('hasLine') as boolean;
    this.hasLineCheckbox.toggleChecked(value);

    const orientationProperty: string = this.slider.getPropertyValue('orientation') as string;
    if (orientationProperty === 'vertical') this.orientationCheckbox.toggleChecked(true);
    else this.orientationCheckbox.toggleChecked(false);
  }

  initInputFields() {
    const $minValueField = this.$controlPanel.find('.js-control-panel__min-value-field');
    const $maxValueField = this.$controlPanel.find('.js-control-panel__max-value-field');
    const $stepField = this.$controlPanel.find('.js-control-panel__step-field');
    const $valueField = this.$controlPanel.find('.js-control-panel__value-field');
    const $firstValueField = this.$controlPanel.find('.js-control-panel__first-value-field');
    const $secondValueField = this.$controlPanel.find('.js-control-panel__second-value-field');

    this.minValueField = new InputTextField($minValueField, 'min');
    this.maxValueField = new InputTextField($maxValueField, 'max');
    this.stepField = new InputTextField($stepField, 'step');
    this.valueField = new InputTextField($valueField, 'value');
    this.firstValueField = new InputTextField($firstValueField, 'values');
    this.secondValueField = new InputTextField($secondValueField, 'values');

    let value: string = `${this.slider.getPropertyValue('min')}`;
    this.minValueField.setValue(value);
    value = `${this.slider.getPropertyValue('max')}`;
    this.maxValueField.setValue(value);
    value = `${this.slider.getPropertyValue('step')}`;
    this.stepField.setValue(value);
    value = `${this.slider.getPropertyValue('value')}`;
    this.valueField.setValue(value);
    value = `${this.slider.getPropertyValue('values', 0)}`;
    this.firstValueField.responsiblePropertyVariant = 0;
    this.firstValueField.setValue(value);
    value = `${this.slider.getPropertyValue('values', 1)}`;
    this.secondValueField.responsiblePropertyVariant = 1;
    this.secondValueField.setValue(value);

    this.toggleValueFields();
  }

  bindEventListeners() {
    this.hasTipCheckbox.getElement().on('change', this.handleCheckboxChange.bind(this, this.hasTipCheckbox));
    this.isRangeCheckbox.getElement().on('change', this.handleCheckboxChange.bind(this, this.isRangeCheckbox));
    this.hasLineCheckbox.getElement().on('change', this.handleCheckboxChange.bind(this, this.hasLineCheckbox));
    this.orientationCheckbox.getElement().on('change', this.handleCheckboxChange.bind(this, this.orientationCheckbox));

    this.minValueField.getElement().on('change', this.handleFieldChange.bind(this, this.minValueField));
    this.maxValueField.getElement().on('change', this.handleFieldChange.bind(this, this.maxValueField));
    this.stepField.getElement().on('change', this.handleFieldChange.bind(this, this.stepField));
    this.valueField.getElement().on('change', this.handleFieldChange.bind(this, this.valueField));
    this.firstValueField.getElement().on('change', this.handleFieldChange.bind(this, this.firstValueField));
    this.secondValueField.getElement().on('change', this.handleFieldChange.bind(this, this.secondValueField));

    this.slider.getElement().on('changePointer', this.handleSliderChangePointer.bind(this));
  }

  handleCheckboxChange(checkbox: Checkbox) {
    const property: string = checkbox.getProperty();
    let newPropertyValue: boolean | string;
    if (property === 'orientation') {
      newPropertyValue = checkbox.isChecked() ? 'vertical' : 'horizontal';
    } else {
      newPropertyValue = !!checkbox.isChecked();
    }
    this.slider.setPropertyValue(property, newPropertyValue);

    if (property === 'isRange') {
      this.toggleValueFields();
    }
  }

  handleFieldChange(field: InputTextField) {
    const property: string = field.getProperty();
    const newPropertyValue: number = parseFloat(`${field.getValue()}`);

    if (property === 'values') {
      const { responsiblePropertyVariant } = field;
      this.slider.setPropertyValue(property, responsiblePropertyVariant, newPropertyValue);
      const trueValue = `${this.slider.getPropertyValue('values', responsiblePropertyVariant)}`;
      field.setValue(trueValue);
    } else {
      this.slider.setPropertyValue(property, newPropertyValue);
      const trueValue = `${this.slider.getPropertyValue(property)}`;
      field.setValue(trueValue);
    }
  }

  handleSliderChangePointer() {
    let value = `${this.slider.getPropertyValue('values', 0)}`;
    this.firstValueField.setValue(value);
    value = `${this.slider.getPropertyValue('values', 1)}`;
    this.secondValueField.setValue(value);
    value = `${this.slider.getPropertyValue('value')}`;
    this.valueField.setValue(value);
  }

  toggleValueFields() {
    if (this.slider.getPropertyValue('isRange')) {
      this.valueField.toggleInvisible(true);
      this.firstValueField.toggleInvisible(false);
      this.secondValueField.toggleInvisible(false);
    } else {
      this.valueField.toggleInvisible(false);
      this.firstValueField.toggleInvisible(true);
      this.secondValueField.toggleInvisible(true);
    }
  }

  getElement() {
    return this.$controlPanel;
  }
}

export default ControlPanel;
