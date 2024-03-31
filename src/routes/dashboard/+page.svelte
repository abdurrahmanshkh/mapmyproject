<script>
	import Timeline from './timeline.svelte';
	import Graph from './graph.svelte';
	import Projectlist from './projectlist.svelte';
</script>

<main>
	<div class="container mx-auto grid-cols-5 gap-8 py-10 lg:grid">
		<div class="col-span-3">
			<Projectlist />
		</div>
		<div class="col-span-2">
			<Graph />
		</div>
	</div>
</main>
