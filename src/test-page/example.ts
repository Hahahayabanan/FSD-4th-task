import '../slider';
import { ExampleParameters } from './ExampleParameters';

$(() => {
  $('.slider1').slider({
    minVal: 200,
    maxVal: 500,
    stepVal: 100,
    value: 349,
    followerPoint: true,
  });
  $('.slider2').slider({
    minVal: 10,
    maxVal: 20,
    stepVal: 1,
    value: 18,
    orientation: 'vertical',
  });
  $('.slider3').slider({
    minVal: 10,
    maxVal: 20,
    stepVal: 1,
    range: true,
    values: [12, 15],
    followerPoint: true,
    orientation: 'vertical',
  });
  $('.slider4').slider({
    range: true,
  });
  $('.slider5').slider();
  $('.slider6').slider();

  $('.slider').each((i, val) => {
    new ExampleParameters(val);
  });
});
