import App from './App.svelte';

let root = document.createElement("div");
document.body.appendChild(root);

const app = new App({
	target: root,
	props: {
		name: 'world'
	}
});

export default app;