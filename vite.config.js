import {fileURLToPath, URL} from 'url';

import {defineConfig} from "vite";
import vue from '@vitejs/plugin-vue';
import PkgConfig from 'vite-plugin-package-config';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-auto-import/vite';
import OptimizationPersist from 'vite-plugin-optimize-persist';
import {AntDesignVueResolver} from "unplugin-vue-components/resolvers";
import {visualizer} from 'rollup-plugin-visualizer';

export default defineConfig(() => {
  const lifecycle = process.env.npm_lifecycle_event;

  return {
    plugins: [
      vue(),
      PkgConfig(),
      OptimizationPersist(),
      lifecycle === 'report' ? visualizer({ open: true, brotliSize: true, filename: 'report.html' }) : null,
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            // hack: `true; @import 'ant-design-vue/dist/antd.variable.less'`,
            // '@primary-color': '#eb2f96', // 全局主色
          },
        }
      }
    },
    optimizeDeps: {
      include: ['@ant-design/icons-vue', 'ant-design-vue']
    },
  }
})
