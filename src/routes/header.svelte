<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode } from 'flowbite-svelte';
</script>

<header
	class="left-0 top-0 z-30 mx-auto w-full flex-none border-b-2 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900"
>
	<div class="max-w-8xl mx-auto w-full px-0 py-3 lg:flex lg:justify-between lg:px-3">
		<Navbar>
			<NavBrand href="/">
				<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
					>MapMyProject</span
				>
			</NavBrand>
			<NavHamburger />
			<NavUl>
				<NavLi href="/" active={true}>Home</NavLi>
				<NavLi href="/dashboard">Dashboard</NavLi>
				<NavLi href="/projects">Projects</NavLi>
			</NavUl>
			<DarkMode />
		</Navbar>
	</div>
</header>
