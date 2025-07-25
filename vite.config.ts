import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api/resend': {
        target: 'https://api.resend.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/resend/, ''),
        headers: {
          'Authorization': `Bearer ${process.env.VITE_RESEND_API_KEY || 're_iimmbzxq_KMibbhVVEhLqSqSQnqY1BLAv'}`
        }
      }
    }
  }
});
