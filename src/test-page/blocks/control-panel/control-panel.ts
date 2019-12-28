import Checkbox from '../checkbox/checkbox';
import InputTextField from '../input-text-field/input-text-field';
import Slider from '../slider/slider';

class ControlPanel {
  public $controlPanel: JQuery<Object>;

  public slider: Slider;

  public isRangeCheckbox: Checkbox;

  public firstValueField: InputTextField;

  public secondValueField: InputTextField;

  public $inputFields: JQuery<Object>;

  public $checkboxes: JQuery<Object>;

  constructor($container: JQuery<Object>, slider: Slider) {
    this.slider = slider;
    this.initControlPanel($container);
  }

  initControlPanel($container: JQuery<Object>) {
    this.$controlPanel = $container.find('.js-control-panel');
    this.handleIsRangeCheckboxChange = this.handleIsRangeCheckboxChange.bind(this);
    this.handleSliderChangePointer = this.handleSliderChangePointer.bind(this);
    this.initCheckboxes();
    this.initInputFields();
    this.bindEventListeners();
  }

  initInputFields() {
    this.$inputFields = this.$controlPanel.find('.js-control-panel__input-text-field');
    this.$inputFields.each((index, elem) => {
      const textField = new InputTextField($(elem), this.slider);
      switch (textField.getProperty()) {
        case 'from':
          this.firstValueField = textField;
          break;
        case 'to':
          this.secondValueField = textField;
          break;
        default:
      }
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
    if (this.secondValueField) {
      if (this.slider.getProperties().isRange) {
        this.secondValueField.toggleInvisible(false);
      } else {
        this.secondValueField.toggleInvisible(true);
      }
    }
  }

  getElement() {
    return this.$controlPanel;
  }

  private bindEventListeners() {
    this.isRangeCheckbox.getElement().on('change', this.handleIsRangeCheckboxChange);
    this.slider.getElement().on('changePointer', this.handleSliderChangePointer);
  }

  private handleSliderChangePointer() {
    const { from, to } = this.slider.getProperties();
    if (this.firstValueField && this.secondValueField) {
      this.firstValueField.setValue(`${from}`);
      this.secondValueField.setValue(`${to}`);
    }
  }

  private handleIsRangeCheckboxChange() {
    this.toggleValueFields();
  }
}

export default ControlPanel;
