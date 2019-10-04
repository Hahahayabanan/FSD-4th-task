import './test-page/example';


function importAll(resolve: any) {
  resolve.keys().forEach(resolve);
}
importAll(require.context('./', true, /\.(css|scss)$/));
