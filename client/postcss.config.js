module.exports = {
    plugins: {
      'autoprefixer': true,
      'postcss-normalize': true,
      'postcss-mixins': {
        'mixinsDir': 'src/Static/mixins/**/**'
      },
      'postcss-custom-media': {
        'preserve': false,
        'importFrom': './src/Static/media.css'
      },
      'postcss-custom-properties': {
        'preserve': false,
        'importFrom': 'src/Static/variables.css'
      },
      'postcss-nesting': true,
      'postcss-preset-env': true,
      'cssnano': true,
    }
  }