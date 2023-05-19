import * as path from 'path';

export default {
  mode: 'production',
  entry: {
    carousel: './src/carousel/bundle.ts',
    core: './src/core/bundle.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.scss'],
  },
};
