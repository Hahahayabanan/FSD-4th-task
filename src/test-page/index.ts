import Example from './blocks/example/example';

$(() => {
  function importAll(resolve: any) {
    resolve.keys().forEach(resolve);
  }
  importAll(require.context('./', true, /\.(ts)$/));

  $('.sliders__element').each((index, val) => {
    const $exampleContainer = $(val);
    new Example($exampleContainer);
  });
});
