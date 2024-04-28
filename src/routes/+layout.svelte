<script>
	import '../app.pcss';
  	import { Footer, FooterCopyright, Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode, Button} from 'flowbite-svelte';
	import { writable } from 'svelte/store';
	import {UserPlusSolid} from 'flowbite-svelte-icons'
	const isLoggedIn = writable(false);
	async function logout() {
    // Replace this URL with your backend endpoint to log out
    	const response = await fetch('http://localhost:8080/api/auth/logout', 
		{ 
			method: 'POST' ,
			credentials:'include'
	});
		localStorage.removeItem('accessToken')
		console.log(response)
	}
</script>

<svelte:head>
		<title>MapMyProject</title>
</svelte:head>

<div class="app">

	<header class="flex-none mx-auto w-full bg-white dark:bg-gray-900 left-0 top-0 z-30 border-b-2 border-gray-300 dark:border-gray-500">
		<div class="w-full px-0 py-3 mx-auto lg:flex lg:justify-between max-w-8xl lg:px-3">
			<Navbar>
				<NavBrand href="/">
					<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">MapMyProject</span>
				</NavBrand>
				<NavHamburger />
				<NavUl>
				</NavUl>
				<Button color="none" class="flex right" href="/">Login</Button>
				<Button color="none" href="/projects">Projects</Button>
				<Button color="none" href="/chart">Chart</Button>
				<Button color="none" on:click={logout} href="/">Logout</Button>
				<DarkMode/>
			</Navbar>
		</div>
	</header>
	
	<main class="bg-white dark:bg-gray-900" style="min-height: calc(100vh - 145px);">
		<slot/>
	</main>


	<footer class="flex-none mx-auto w-full bg-white dark:bg-gray-900 border-t-2 border-gray-300 dark:border-gray-700">
		<div class="w-full px-0 py-2 mx-auto lg:flex lg:justify-between max-w-8xl lg:px-3">
			<Navbar>
				<Footer rounded color="form" class="w-full flex items-center text-center justify-center py-3">
					<FooterCopyright href="/" by="MapMyProject™" year={2024} />
				</Footer>
			</Navbar>
		</div>
	</footer>	

</div>