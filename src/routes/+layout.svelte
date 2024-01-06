<script>
	import '../app.pcss';
	import Header from './Header.svelte';
	import './styles.css';
  	import { Footer, FooterCopyright, Navbar,P} from 'flowbite-svelte';
</script>

<div class="app">

	<Header></Header>

	
	<main>
		<slot/>
	</main>

	<Navbar rounded color="form">
		<Footer rounded color="form" class="w-full flex items-center text-center justify-center py-3">
			<FooterCopyright href="/" by="MapMyProject™" year={2024} />
		</Footer>
	</Navbar>

</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 0px;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}
	
</style>