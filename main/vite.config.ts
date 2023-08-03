import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
	optimizeDeps: {
		esbuildOptions: {
			target: 'es2020',
		},
	},
	esbuild: {
		// https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
		logOverride: { 'this-is-undefined-in-esm': 'silent' },
	},
	plugins: [
		react({
			babel: {
				plugins: ['babel-plugin-macros', 'babel-plugin-styled-components'],
			},
		}),
		federation({
			name: 'main_app',
			// remotes: {
			// 	postsApp: 'http://localhost:3001/assets/remoteEntry.js',
			// },
            remotes: [
                {
                    postsApp: {
                        external: `Promise.resolve('http://localhost:3001/assets/remoteEntry.js')`,
                        from: 'vite',
                        externalType: 'promise'
                    }
                }
            ],
			shared: ['react', 'react-dom', 'react-router-dom'],
		}),
	],
	build: {
		modulePreload: false,
		target: 'esnext',
		minify: false,
		cssCodeSplit: false,
	},
});
