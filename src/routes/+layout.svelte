<script>
	import '../app.pcss';
	import Header from './header.svelte';
	import Footer from './footer.svelte';
</script>

<svelte:head>
	<title>MapMyProject</title>
</svelte:head>

<div class="app">
	<Header />

	<main class="bg-white dark:bg-gray-900" style="min-height: calc(100vh - 145px);">
		<slot />
	</main>

	<Footer />
</div>
