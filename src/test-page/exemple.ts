import * as $ from 'jquery';
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


  function initStep(container:HTMLElement, slider:HTMLElement) {
    const ilabel1 = document.createElement('label');
    ilabel1.innerHTML = 'Step';
    $(container).append(ilabel1);

    const newInput1 = document.createElement('input');
    newInput1.setAttribute('type', 'text');
    $(ilabel1).append(newInput1);

    $(newInput1).val($(slider).slider('option', 'stepVal') as number);
    $(newInput1).on('change', () => {
      $(slider).slider('option', 'stepVal', $(newInput1).val());
    });
  }

  function initMinMax(container:HTMLElement, slider:HTMLElement) {
    const ilabel1 = document.createElement('label');
    ilabel1.innerHTML = 'Max';
    $(container).append(ilabel1);

    const newInput1 = document.createElement('input');
    newInput1.setAttribute('type', 'text');
    $(ilabel1).append(newInput1);

    const ilabel2 = document.createElement('label');
    ilabel2.innerHTML = 'Min';
    $(container).append(ilabel2);

    const newInput2 = document.createElement('input');
    newInput2.setAttribute('type', 'text');
    $(ilabel2).append(newInput2);


    $(newInput1).val($(slider).slider('option', 'maxVal') as number);
    $(newInput2).val($(slider).slider('option', 'minVal') as number);
    $(newInput1).on('change', () => {
      $(slider).slider('option', 'maxVal', $(newInput1).val());
    });
    $(newInput2).on('change', () => {
      $(slider).slider('option', 'minVal', $(newInput2).val());
    });
  }

  function initRange(container:HTMLElement, slider:HTMLElement) {
    const ilabel1 = document.createElement('label');
    ilabel1.innerHTML = 'single';
    $(container).append(ilabel1);

    const newInput1 = document.createElement('input');
    newInput1.setAttribute('type', 'radio');
    newInput1.setAttribute('name', `range${String(slider.classList).substring(0, 7)}`);
    $(ilabel1).append(newInput1);

    const ilabel2 = document.createElement('label');
    ilabel2.innerHTML = 'range';
    $(container).append(ilabel2);

    const newInput2 = document.createElement('input');
    newInput2.setAttribute('type', 'radio');
    newInput2.setAttribute('name', `range${String(slider.classList).substring(0, 7)}`);
    $(ilabel2).append(newInput2);


    if ($(slider).slider('option', 'range') === true) {
      newInput2.checked = true;
    } else {
      newInput1.checked = true;
    }

    $(ilabel1).change(() => {
      $(slider).slider('option', 'range', false);
      $(`.val${String(slider.classList).substring(0, 7)}`).remove();
      initValueInputs(container, slider);
    });
    $(ilabel2).change(() => {
      $(slider).slider('option', 'range', true);
      $(`.val${String(slider.classList).substring(0, 7)}`).remove();
      initValueInputs(container, slider);
    });
  }

  function initOrientation(container:HTMLElement, slider:HTMLElement) {
    const ilabel1 = document.createElement('label');
    ilabel1.innerHTML = 'Horizontal';
    $(container).append(ilabel1);

    const newInput1 = document.createElement('input');
    newInput1.setAttribute('type', 'radio');
    newInput1.setAttribute('name', `ori${String(slider.classList).substring(0, 7)}`);
    $(ilabel1).append(newInput1);

    const ilabel2 = document.createElement('label');
    ilabel2.innerHTML = 'Vertical';
    $(container).append(ilabel2);

    const newInput2 = document.createElement('input');
    newInput2.setAttribute('type', 'radio');
    newInput2.setAttribute('name', `ori${String(slider.classList).substring(0, 7)}`);
    $(ilabel2).append(newInput2);

    if ($(slider).slider('option', 'orientation') === 'horizontal') {
      newInput1.checked = true;
    } else {
      newInput2.checked = true;
    }

    $(ilabel1).change(() => {
      $(slider).slider('option', 'orientation', 'horizontal');
    });
    $(ilabel2).change(() => {
      $(slider).slider('option', 'orientation', 'vertical');
    });
  }

  function initFollowerPintCheckboxes(container:HTMLElement, slider:HTMLElement) {
    const ilabel = document.createElement('label');
    ilabel.innerHTML = 'Follower point';
    $(container).append(ilabel);

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    $(ilabel).append(checkbox);

    if ($(slider).slider('option', 'followerPoint')) {
      checkbox.checked = true;
    }

    $(checkbox).change(() => {
      if (checkbox.checked) {
        $(slider).slider('option', 'followerPoint', true);
      } else {
        $(slider).slider('option', 'followerPoint', false);
      }
    });
  }


  function initValueInputs(container:HTMLElement, slider:HTMLElement) {
    const ilabel = document.createElement('label');
    ilabel.setAttribute('class', `val${String(slider.classList).substring(0, 7)}`);
    ilabel.innerHTML = 'First pointer';
    $(container).append(ilabel);

    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    $(ilabel).append(newInput);


    if ($(slider).slider('option', 'range')) {
      const ilabel2 = document.createElement('label');
      ilabel2.setAttribute('class', `val${String(slider.classList).substring(0, 7)}`);
      ilabel2.innerHTML = 'Second pointer';
      $(container).append(ilabel2);

      const newInput2 = document.createElement('input');
      newInput2.setAttribute('type', 'text');
      $(ilabel2).append(newInput2);

      $(newInput).val($(slider).slider('option', 'values', 0) as number);
      $(newInput2).val($(slider).slider('option', 'values', 1) as number);

      $(newInput).on('change', () => {
        $(slider).slider('option', 'values', 0, $(newInput).val());
      });
      $(newInput2).on('change', () => {
        $(slider).slider('option', 'values', 1, $(newInput2).val());
      });

      $(slider).on('changePointer', () => {
        $(newInput).val($(slider).slider('option', 'values', 0) as number);
        $(newInput2).val($(slider).slider('option', 'values', 1) as number);
      });
    } else {
      $(newInput).val($(slider).slider('option', 'value') as number);
      $(newInput).on('change', () => {
        $(slider).slider('option', 'value', $(newInput).val());
      });
      $(slider).on('changePointer', () => {
        $(newInput).val($(slider).slider('option', 'value') as number);
      });
    }
  }

  $('.slider').each(function (i, val) {
    const container = document.createElement('div');
    container.classList.add('control');
    $(this).append(container);
    const slider = this.firstElementChild as HTMLElement;

    initFollowerPintCheckboxes(container, slider);
    initOrientation(container, slider);
    initRange(container, slider);
    initMinMax(container, slider);
    initStep(container, slider);
    initValueInputs(container, slider);
  });
});
