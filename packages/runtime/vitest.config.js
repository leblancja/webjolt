import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		reports: 'verbose',
		environment: 'jsdom',
	},
})
