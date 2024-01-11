<script>
	import '../app.pcss';
  	import { Footer, FooterCopyright, Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode} from 'flowbite-svelte';
</script>

<div class="app">

	<header class="flex-none mx-auto w-full bg-white dark:bg-gray-900 left-0 top-0 z-30 border-b border-gray-400 dark:border-gray-600">
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
	
	<main class="bg-white dark:bg-gray-900" style="min-height: calc(100vh - 145px);">
		<slot/>
	</main>


	<footer class="flex-none mx-auto w-full bg-white dark:bg-gray-900 border-t border-gray-400 dark:border-gray-600">
		<div class="w-full px-0 py-2 mx-auto lg:flex lg:justify-between max-w-8xl lg:px-3">
			<Navbar>
				<Footer rounded color="form" class="w-full flex items-center text-center justify-center py-3">
					<FooterCopyright href="/" by="MapMyProject™" year={2024} />
				</Footer>
			</Navbar>
		</div>
	</footer>	

</div>