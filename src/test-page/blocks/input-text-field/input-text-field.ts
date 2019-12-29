import Slider from '../slider/slider';
import { EventObserver } from '../../../EventObserver/EventObserver';

class InputTextField {
  public $inputField: JQuery<Object>;

  public $inputFieldBlock: JQuery<Object>;

  public responsibleProperty: string;

  public slider: Slider;

  public observer = new EventObserver();

  constructor($container: JQuery<Object>, slider: Slider) {
    this.slider = slider;
    this.initInputField($container);

    this.bindEventListeners();
  }

  initInputField($container: JQuery<Object>) {
    this.$inputFieldBlock = $container.find('.js-input-text-field');
    this.$inputField = $container.find('.js-input-text-field__input');

    this.responsibleProperty = this.$inputField.attr('name');
    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);

    this.updateValue();
  }

  getProperty(): string {
    return this.responsibleProperty;
  }

  updateValue() {
    const newValue = this.slider.getProperties()[this.responsibleProperty];
    this.$inputField.val(newValue);
    this.observer.broadcast({ responsibleProperty: this.responsibleProperty, value: newValue });
  }

  getValue(): number | string {
    const value = this.$inputField.val();
    if (value instanceof Array) {
      return `${value}`;
    }
    return value;
  }

  getElement() {
    return this.$inputField;
  }

  toggleInvisible(isInvisible: boolean) {
    if (isInvisible) this.$inputFieldBlock.addClass('input-text-field_invisible');
    else this.$inputFieldBlock.removeClass('input-text-field_invisible');
  }

  private bindEventListeners() {
    this.$inputField.on('change', this.handleInputFieldChange);
  }

  private handleInputFieldChange() {
    this.slider.setPropertyValue(this.responsibleProperty, this.getValue());
    this.updateValue();
  }
}

export default InputTextField;
