import '../slider';
import { ExampleParameters } from './ExampleParameters';

$(() => {
  $('.slider1').slider({
    min: 200,
    max: 500000000,
    step: 100,
    value: 349000000,
    hasTip: true,
  });

  $('.slider2').slider({
    min: 10,
    max: 20,
    step: 1,
    value: 18,
    orientation: 'vertical',
  });
  $('.slider3').slider({
    min: 10,
    max: 20,
    step: 1,
    range: true,
    values: [12, 15],
    hasTip: true,
    orientation: 'vertical',
  });
  $('.slider4').slider({
    range: true,
  });
  $('.slider5').slider();
  $('.slider6').slider();

  $('.slider').each((i, val) => {
    const $val = $(val);
    const $slider = $(val).children().first();

    new ExampleParameters($val, $slider);
  });
});
