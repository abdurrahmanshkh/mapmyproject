<script>
	import { Footer, FooterCopyright, Navbar } from 'flowbite-svelte';
</script>

<footer
	class="mx-auto w-full flex-none border-t-2 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900"
>
	<div class="max-w-8xl mx-auto w-full px-0 py-2 lg:flex lg:justify-between lg:px-3">
		<Navbar>
			<Footer rounded color="form" class="flex w-full items-center justify-center py-3 text-center">
				<FooterCopyright href="/" by="MapMyProject™" year={2024} />
			</Footer>
		</Navbar>
	</div>
</footer>
