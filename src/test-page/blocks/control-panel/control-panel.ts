import bind from 'bind-decorator';
import Checkbox from '../checkbox/checkbox';
import InputTextField from '../input-text-field/input-text-field';
import Slider from '../slider/slider';
import { TextFieldsArray } from '../../types/interfaces';

class ControlPanel {
  public $controlPanel: JQuery<Object>;

  public slider: Slider;

  public isRangeCheckbox: Checkbox;

  public textFields: TextFieldsArray = {};

  public checkboxes: Checkbox[] = [];

  public $inputFields: JQuery<Object>;

  public $checkboxes: JQuery<Object>;

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

  initInputFields() {
    this.$inputFields = this.$controlPanel.find('.js-control-panel__input-text-field');
    this.$inputFields.each((index, elem) => {
      const textField = new InputTextField($(elem), this.slider);
      this.textFields[textField.getProperty()] = textField;
    });
    this.toggleValueFields();
  }

  initCheckboxes() {
    this.$checkboxes = this.$controlPanel.find('.js-control-panel__checkbox');
    this.$checkboxes.each((index, elem) => {
      const checkbox = new Checkbox($(elem), this.slider);
      if (checkbox.getProperty() === 'isRange') this.isRangeCheckbox = checkbox;
    });
  }

  toggleValueFields() {
    if (this.textFields.to) {
      if (this.slider.getProperties().isRange) {
        this.textFields.to.toggleInvisible(false);
      } else {
        this.textFields.to.toggleInvisible(true);
      }
    }
  }

  getElement() {
    return this.$controlPanel;
  }

  setFieldObserver(field: string, fn: Function) {
    if (this.textFields[field]) this.textFields[field].observer.subscribe(fn);
  }

  private bindEventListeners() {
    this.isRangeCheckbox.getElement().on('change', this.handleIsRangeCheckboxChange);
    this.slider.getElement().on('changePointer', this.handleSliderChangePointer);
  }

  @bind
  private handleSliderChangePointer() {
    if (this.textFields.from && this.textFields.to) {
      this.textFields.from.updateValue();
      this.textFields.to.updateValue();
    }
  }

  @bind
  private handleIsRangeCheckboxChange() {
    this.toggleValueFields();
  }
}

export default ControlPanel;
