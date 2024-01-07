<script>
	import '../app.pcss';
	import './styles.css';
  	import { Footer, FooterCopyright, Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode} from 'flowbite-svelte';
</script>

<div class="app">

	<header class="flex-none mx-auto w-full bg-white dark:bg-gray-900 fixed left-0 top-0 z-30 border-b border-gray-200 dark:border-gray-700">
	<div class="w-full px-0 py-3 mx-auto lg:flex lg:justify-between max-w-8xl lg:px-3">
		<Navbar>
			<NavBrand href="/">
				<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">MapMyProject</span>
			</NavBrand>
			<NavHamburger />
			<NavUl>
				<NavLi href="/" active={true}>Home</NavLi>
				<NavLi href="/projects">Projects</NavLi>
				<NavLi href="/test">Test</NavLi>
			</NavUl>
			<DarkMode/>
		</Navbar>
	</div>
	</header>
	
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