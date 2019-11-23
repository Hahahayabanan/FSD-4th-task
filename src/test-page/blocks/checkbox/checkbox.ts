class Checkbox {
  public $checkbox: JQuery<Object>;

  public responsibleProperty: string;

  constructor($container: JQuery<Object>, responsibleProperty?: string) {
    this.initCheckbox($container);
    this.responsibleProperty = responsibleProperty;
  }

  initCheckbox($container: JQuery<Object>) {
    this.$checkbox = $container.find('.js-checkbox__input');
  }

  getElement(): JQuery<Object> {
    return this.$checkbox;
  }

  getProperty(): string {
    return this.responsibleProperty;
  }

  isChecked(): boolean {
    return this.$checkbox.prop('checked');
  }

  toggleChecked(newValue: boolean) {
    this.$checkbox.prop('checked', newValue);
  }
}

export default Checkbox;
