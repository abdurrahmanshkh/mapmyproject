<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode,} from 'flowbite-svelte';
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
</script>

<header class="flex-none mx-auto w-full bg-white dark:bg-gray-900 fixed left-0 top-0 z-30 border-b border-gray-200 dark:border-gray-700">
	<div class="w-full px-0 py-3 mx-auto lg:flex lg:justify-between max-w-8xl lg:px-3">
		<Navbar let:hidden let:toggle>

			<NavBrand href="/">
				<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
					MapMyProject
				</span>
			</NavBrand>

			<NavUl>
				<NavLi href="/" active={true}>Home</NavLi>
				<NavLi href="/about">About</NavLi>
				<NavLi href="/sverdle">Sverdle</NavLi>
				<NavLi href="/mapmyproject">MapMyProject</NavLi>
				<NavLi href="/projects">Projects</NavLi>
				<NavLi href="/test">Test</NavLi>
				
			</NavUl>
			<DarkMode class="m-0 p-0"/>
			
		</Navbar>
	</div>
</header>