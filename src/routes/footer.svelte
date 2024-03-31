<script>
      	import { Footer, FooterCopyright, Navbar } from 'flowbite-svelte';
</script>

<footer class="flex-none mx-auto w-full bg-white dark:bg-gray-900 border-t-2 border-gray-300 dark:border-gray-700">
    <div class="w-full px-0 py-2 mx-auto lg:flex lg:justify-between max-w-8xl lg:px-3">
        <Navbar>
            <Footer rounded color="form" class="w-full flex items-center text-center justify-center py-3">
                <FooterCopyright href="/" by="MapMyProject™" year={2024} />
            </Footer>
        </Navbar>
    </div>
</footer>