<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
</script>

<header>

	<Navbar rounded color="form" class="py-auto">
	<NavBrand href="/">
		<img src="src\lib\images\svelte-logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">MapMyProject</span>
	</NavBrand>
	<NavHamburger />
	<NavUl>
		<NavLi href="/" active={true}>Home</NavLi>
		<NavLi href="/about">About</NavLi>
		<NavLi href="/sverdle">Sverdle</NavLi>
		<NavLi href="/mapmyproject">MapMyProject</NavLi>
		<NavLi href="/projects">Projects</NavLi>
		<NavLi href="/test">Test</NavLi>
	</NavUl>
	</Navbar>

</header>