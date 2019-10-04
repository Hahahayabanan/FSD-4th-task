import '../slider';

$(() => {
  $('.slider1').slider({
    minVal: 200,
    maxVal: 500,
    stepVal: 100,
    value: 349,
    followerPoint: true
  });
  $('.slider2').slider({
    minVal: 10,
    maxVal: 20,
    stepVal: 1,
    value: 18,
    orientation: 'vertical'
  });
  $('.slider3').slider({
    minVal: 10,
    maxVal: 20,
    stepVal: 1,
    range: true,
    values: [12, 15],
    followerPoint: true,
    orientation: 'vertical'
  });
  $('.slider4').slider({
    range: true,
  });
  $('.slider5').slider();


  class ExampleParameters {
    public exampleContainer: HTMLElement;

    public $container: JQuery<Object>;

    public $slider: JQuery<Object>;

    constructor(exampleContainer: HTMLElement) {
      this.exampleContainer = exampleContainer;

      this.createContainer();
      this.$slider = $(this.exampleContainer.firstElementChild);

      this.initFollowerPointCheckboxes();
      this.initRange();
      this.initOrientation();

      this.initMinMax();
      this.initStep();
      this.initValueInputs();
    }

    createContainer() {
      const container = document.createElement('div');
      container.classList.add('control');
      $(this.exampleContainer).append(container);
      this.$container = $(container);
    }

    initFollowerPointCheckboxes() {
      const label = document.createElement('label');
      label.innerHTML = 'Follower point';
      this.$container.append(label);

      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      $(label).append(checkbox);

      if (this.$slider.slider('option', 'followerPoint')) {
        checkbox.checked = true;
      }

      $(checkbox).change(() => {
        if (checkbox.checked) {
          this.$slider.slider('option', 'followerPoint', true);
        } else {
          this.$slider.slider('option', 'followerPoint', false);
        }
      });
    }

    initRange() {
      const label = document.createElement('label');
      label.innerHTML = 'Is range';
      this.$container.append(label);

      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      $(label).append(checkbox);

      if (this.$slider.slider('option', 'range')) {
        checkbox.checked = true;
      }

      $(checkbox).change(() => {
        if (checkbox.checked) {
          this.$slider.slider('option', 'range', true);
          this.initValueInputs();
        } else {
          this.$slider.slider('option', 'range', false);
          this.initValueInputs();
        }
      });
    }

    initOrientation() {
      const label = document.createElement('label');
      label.innerHTML = 'Is vertical';
      this.$container.append(label);

      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      $(label).append(checkbox);

      if (this.$slider.slider('option', 'orientation') === 'vertical') {
        checkbox.checked = true;
      }

      $(checkbox).change(() => {
        if (checkbox.checked) {
          this.$slider.slider('option', 'orientation', 'vertical');
        } else {
          this.$slider.slider('option', 'orientation', 'horizontal');
        }
      });
    }

    initMinMax() {
      const ilabel1 = document.createElement('label');
      ilabel1.innerHTML = 'Max';
      this.$container.append(ilabel1);

      const newInput1 = document.createElement('input');
      newInput1.setAttribute('type', 'text');
      $(ilabel1).append(newInput1);

      const ilabel2 = document.createElement('label');
      ilabel2.innerHTML = 'Min';
      this.$container.append(ilabel2);

      const newInput2 = document.createElement('input');
      newInput2.setAttribute('type', 'text');
      $(ilabel2).append(newInput2);


      $(newInput1).val(this.$slider.slider('option', 'maxVal') as number);
      $(newInput2).val(this.$slider.slider('option', 'minVal') as number);
      $(newInput1).on('change', () => {
        this.$slider.slider('option', 'maxVal', $(newInput1).val());
      });
      $(newInput2).on('change', () => {
        this.$slider.slider('option', 'minVal', $(newInput2).val());
      });
    }

    initStep() {
      const ilabel1 = document.createElement('label');
      ilabel1.innerHTML = 'Step';
      this.$container.append(ilabel1);

      const newInput1 = document.createElement('input');
      newInput1.setAttribute('type', 'text');
      $(ilabel1).append(newInput1);

      $(newInput1).val(this.$slider.slider('option', 'stepVal') as number);
      $(newInput1).on('change', () => {
        this.$slider.slider('option', 'stepVal', $(newInput1).val());
      });
    }

    initValueInputs() {
      const label = this.$container.find('.value');
      label.remove();

      const ilabel = document.createElement('label');
      this.$container.append(ilabel);
      ilabel.innerText = 'Value';
      ilabel.classList.add('value');

      const newInput = document.createElement('input');
      newInput.setAttribute('type', 'text');
      $(ilabel).append(newInput);


      if (this.$slider.slider('option', 'range')) {
        ilabel.childNodes[0].nodeValue = 'First pointer value';
        const ilabel2 = document.createElement('label');
        ilabel2.classList.add('value');
        ilabel2.innerText = 'Second pointer value';
        this.$container.append(ilabel2);

        const newInput2 = document.createElement('input');
        newInput2.setAttribute('type', 'text');
        $(ilabel2).append(newInput2);

        $(newInput).val(this.$slider.slider('option', 'values', 0) as number);
        $(newInput2).val(this.$slider.slider('option', 'values', 1) as number);

        $(newInput).on('change', () => {
          this.$slider.slider('option', 'values', 0, $(newInput).val());
        });
        $(newInput2).on('change', () => {
          this.$slider.slider('option', 'values', 1, $(newInput2).val());
        });

        this.$slider.on('changePointer', () => {
          $(newInput).val(this.$slider.slider('option', 'values', 0) as number);
          $(newInput2).val(this.$slider.slider('option', 'values', 1) as number);
        });
      } else {
        ilabel.childNodes[0].nodeValue = 'Value';
        $(newInput).val(this.$slider.slider('option', 'value') as number);
        $(newInput).on('change', () => {
          this.$slider.slider('option', 'value', $(newInput).val());
        });
        this.$slider.on('changePointer', () => {
          $(newInput).val(this.$slider.slider('option', 'value') as number);
        });
      }
    }
  }


  $('.slider').each((i, val) => {
    new ExampleParameters(val);
  });
});
