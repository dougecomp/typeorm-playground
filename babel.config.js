module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }]
    /* ['module-resolver', {
        alias: {
          '@controllers': './src/controllers',
          '@models': './src/models',
          '@services': './src/services'
        }
      }] */
  ],
  ignore: [
    '**/*.spec.ts',
    '**/*.spec.js'
  ]
}
