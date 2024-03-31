<script>
	import Login from './login.svelte';
	import Intro from './intro.svelte';
</script>

<main>
	<div class="container mx-auto grid-cols-3 gap-8 py-10 lg:grid">
		<div class="col-span-2">
			<Intro />
		</div>
		<div class="col-span-1">
			<Login />
		</div>
	</div>
</main>
