class InputTextField {
  public $inputField: JQuery<Object>;

  public $inputFieldBlock: JQuery<Object>;

  public responsibleProperty: string;

  constructor($container: JQuery<Object>, responsibleProperty?: string) {
    this.initInputField($container);
    this.responsibleProperty = responsibleProperty;
  }

  initInputField($container: JQuery<Object>) {
    this.$inputFieldBlock = $container.find('.js-input-text-field');
    this.$inputField = $container.find('.js-input-text-field__input');
  }

  getProperty(): string {
    return this.responsibleProperty;
  }

  setValue(newValue: string) {
    this.$inputField.val(newValue);
  }

  getValue() {
    return this.$inputField.val();
  }

  getElement() {
    return this.$inputField;
  }

  toggleInvisible(isInvisible: boolean) {
    if (isInvisible) this.$inputFieldBlock.addClass('input-text-field_invisible');
    else this.$inputFieldBlock.removeClass('input-text-field_invisible');
  }
}

export default InputTextField;
