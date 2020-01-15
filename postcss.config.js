const autoPrefixer = require('autoprefixer');
const cssNano = require('cssnano');

module.exports = {
  plugins: [
    autoPrefixer,
    cssNano({
      preset: [
        'default', {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    }),
  ],
};
