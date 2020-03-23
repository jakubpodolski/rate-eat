module.exports = {
    plugins: {
      'postcss-normalize': {},
      'postcss-custom-properties': {
        'preserve': false,
        'importFrom': 'src/Static/variables.css'
      },
      'postcss-custom-media': {
        'preserve': false,
        'importFrom': 'src/Static/media.css'
      },
      'postcss-nested': {},
      'postcss-mixins': {
        'mixinsDir': 'src/Static/mixins/**/**'
      },
      'postcss-preset-env': {},
      'cssnano': {},
    }
  }