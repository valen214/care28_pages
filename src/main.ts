import App from './App.svelte';

const app = new App({
	target: document.getElementById("root1"),
	props: {
		name: 'world'
	}
});

export default app;