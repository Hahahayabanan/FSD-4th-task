import Example from './blocks/example/example';

$(() => {
  $('.sliders__element').each((index, val) => {
    const $exampleContainer = $(val);
    new Example($exampleContainer);
  });
});
