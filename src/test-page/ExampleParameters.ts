class ExampleParameters {
  public $exampleContainer: HTMLElement;

  public $controlPanel: any;

  public $slider: any;

  constructor($exampleContainer: any, $slider: any) {
    this.$exampleContainer = $exampleContainer;
    this.$slider = $slider;

    this.init();
  }

  init() {
    this.createContainer();

    this.createCheckbox('Has tip', 'hasTip');
    this.createCheckbox('Is range', 'isRange');
    this.initOrientation();

    this.createInputText('Min', 'min');
    this.createInputText('Max', 'max');
    this.createInputText('Step', 'step');

    this.initValueInputs();
  }

  createContainer() {
    this.$controlPanel = $('<div>', { class: 'control' }).appendTo(this.$exampleContainer);
  }

  createCheckbox(labelText:string, property:string) {
    const $label = $('<label>', { text: `${labelText}` }).appendTo(this.$controlPanel);
    const $checkbox = $('<input>', { type: 'checkbox' }).appendTo($label);

    if (this.$slider.slider('option', `${property}`)) {
      $checkbox.prop('checked', true);
    }

    $checkbox.on('change', () => {
      if ($checkbox.prop('checked')) {
        this.$slider.slider('option', `${property}`, true);
        this.initValueInputs();
      } else {
        this.$slider.slider('option', `${property}`, false);
        this.initValueInputs();
      }
    });
  }

  initOrientation() {
    const $label = $('<label>', { text: 'Is vertical' }).appendTo(this.$controlPanel);
    const $checkbox = $('<input>', { type: 'checkbox' }).appendTo($label);

    if (this.$slider.slider('option', 'orientation') === 'vertical') {
      $checkbox.prop('checked', true);
    }

    $checkbox.on('change', () => {
      if ($checkbox.prop('checked')) {
        this.$slider.slider('option', 'orientation', 'vertical');
      } else {
        this.$slider.slider('option', 'orientation', 'horizontal');
      }
    });
  }

  createInputText(labelText:string, property:string) {
    const $label = $('<label>', { text: `${labelText}` }).appendTo(this.$controlPanel);
    const $inputText = $('<input>', { type: 'text' }).appendTo($label);

    $inputText.val(this.$slider.slider('option', `${property}`) as number);

    $inputText.on('change', () => {
      this.$slider.slider('option', `${property}`, $inputText.val());
      $inputText.val(this.$slider.slider('option', `${property}`) as number);
    });
  }

  initValueInputs() {
    const label = this.$controlPanel.find('.value');
    label.remove();

    const $label = $('<label>', { text: 'Value', class: 'value' }).appendTo(this.$controlPanel);
    const $inputText = $('<input>', { type: 'Text' }).appendTo($label);

    if (this.$slider.slider('option', 'isRange')) {
      $label.get(0).childNodes[0].nodeValue = 'First pointer value';

      const $label2 = $('<label>', { text: 'Second pointer value', class: 'value' }).appendTo(this.$controlPanel);
      const $inputText2 = $('<input>', { type: 'Text' }).appendTo($label2);

      $inputText.val(this.$slider.slider('option', 'values', 0) as number);
      $inputText2.val(this.$slider.slider('option', 'values', 1) as number);

      $inputText.on('change', () => {
        this.$slider.slider('option', 'values', 0, $inputText.val());
        $inputText.val(this.$slider.slider('option', 'values', 0) as number);
      });
      $inputText2.on('change', () => {
        this.$slider.slider('option', 'values', 1, $inputText2.val());
        $inputText2.val(this.$slider.slider('option', 'values', 1) as number);
      });
      this.$slider.on('changePointer', () => {
        $inputText.val(this.$slider.slider('option', 'values', 0) as number);
        $inputText2.val(this.$slider.slider('option', 'values', 1) as number);
      });
    } else {
      $label.get(0).childNodes[0].nodeValue = 'Value';

      $inputText.val(this.$slider.slider('option', 'value') as number);

      $inputText.on('change', () => {
        this.$slider.slider('option', 'value', $inputText.val());
        $inputText.val(this.$slider.slider('option', 'value') as number);
      });
      this.$slider.on('changePointer', () => {
        $inputText.val(this.$slider.slider('option', 'value') as number);
      });
    }
  }
}

export default {
  ExampleParameters,
};

export { ExampleParameters };
