import App from './App.svelte';

const app = new App({
	target: document.getElementById("root2"),
	props: {
		name: 'Earth'
	}
});

export default app;