<script>
      	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode } from 'flowbite-svelte';
</script>

<header class="flex-none mx-auto w-full bg-white dark:bg-gray-900 left-0 top-0 z-30 border-b-2 border-gray-300 dark:border-gray-700">
    <div class="w-full px-0 py-3 mx-auto lg:flex lg:justify-between max-w-8xl lg:px-3">
        <Navbar>
            <NavBrand href="/">
                <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">MapMyProject</span>
            </NavBrand>
            <NavHamburger />
            <NavUl>
                <NavLi href="/" active={true}>Home</NavLi>
                <NavLi href="/projects">Projects</NavLi>
                <NavLi href="/dashboard">Dashboard</NavLi>					
            </NavUl>
            <DarkMode/>
        </Navbar>
    </div>
</header>