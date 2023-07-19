import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@/app': path.resolve(__dirname, './src/app'),
        '@/common': path.resolve(__dirname, './src/common'),
        '@/modules': path.resolve(__dirname, './src/modules'),
        '@/features': path.resolve(__dirname, './src/features'),
        '@/layouts': path.resolve(__dirname, './src/layouts'),
        '@/widgets': path.resolve(__dirname, './src/widgets'),
        '@/services': path.resolve(__dirname, './src/services'),
        '@/styles': path.resolve(__dirname, './src/styles'),
        '@/static': path.resolve(__dirname, './src/static'),
      }
    },
    server: {
      proxy: {
        '/stand': {
          target: process.env.VITE_API_TARGET,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/stand/, '')
        }
      }
    },
    css: {
      modules: {
        generateScopedName: "[name]__[local]-[hash:base64:5]",
      }
    }
  });
}
