import './test-page/example';


function importAll(resolve: any) {
  resolve.keys().forEach(resolve);
}
importAll(require.context('./', true, /\.(css|scss)$/));
importAll(require.context('./static/favicons/', true, /\.(svg|png|ico|xml|json)$/));
