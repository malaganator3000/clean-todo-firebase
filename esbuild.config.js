const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/client/index.tsx'],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: 'public/js/bundle.js',
  loader: {
    '.js': 'jsx',
    '.tsx': 'tsx', '.ts': 'ts'
  },
}).catch(() => process.exit(1));