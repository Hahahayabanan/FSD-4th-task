import Slider from '../slider/slider';

class Checkbox {
  public $checkbox: JQuery<Object>;

  public responsibleProperty: string;

  public slider: Slider;

  constructor($container: JQuery<Object>, slider: Slider) {
    this.slider = slider;
    this.initCheckbox($container);

    this.bindEventListeners();
  }

  initCheckbox($container: JQuery<Object>) {
    this.$checkbox = $container.find('.js-checkbox__input');
    this.responsibleProperty = this.$checkbox.attr('name');
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    this.toggleChecked(this.slider.getProperties()[this.responsibleProperty]);
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

  private bindEventListeners() {
    this.$checkbox.on('change', this.handleCheckboxChange);
    this.$checkbox.on('click', this.handleCheckboxClick);
  }

  private handleCheckboxChange() {
    this.slider.setPropertyValue(this.responsibleProperty, this.isChecked());
  }

  private handleCheckboxClick() {
    if (this.isChecked()) {
      this.$checkbox.removeClass('checkbox__input_unchecked');
      this.$checkbox.addClass('checkbox__input_checked');
    } else {
      this.$checkbox.removeClass('checkbox__input_checked');
      this.$checkbox.addClass('checkbox__input_unchecked');
    }
  }
}

export default Checkbox;
