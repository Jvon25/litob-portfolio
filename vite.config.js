import { defineConfig } from 'vite';

export default defineConfig({
    base: '/litob-portfolio/',  // 👈 add this line
    server: {
        port: 5173,
        host: true,
        strictPort: false
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'esbuild'
    },
    optimizeDeps: {
        include: ['three', 'gsap']
    },
    assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.mp3', '**/*.wav']
});