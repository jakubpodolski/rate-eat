module.exports = {
    plugins: {
      
      'postcss-normalize': true,
      'postcss-nesting': true,
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
      'postcss-preset-env': {
        'stage': 1
      },
      'autoprefixer': {
        "overrideBrowserslist": [
          "last 2 versions"
        ],
      },
      'cssnano': true,
    }
  }