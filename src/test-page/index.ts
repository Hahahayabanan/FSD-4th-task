import Example from './blocks/example/example';

$(() => {
  $('.sliders__element').each((index, val) => {
    const $exampleContainer = $(val);
    new Example($exampleContainer);
  });

  function importAll(resolve: any) {
    resolve.keys().forEach(resolve);
  }
  importAll(require.context('./', true, /\.(ts)$/));
});
