<script>
  // import { onMount } from 'svelte';
  // import { goto } from '$app/navigation';
  // import { isAuthenticated, login } from '../auth'; // replace with your authentication logic

  // let loggedIn = isAuthenticated(); // replace with your authentication logic

  // onMount(() => {
  //   loggedIn = isAuthenticated(); // update the login status when the component is mounted
  // });

  // function navigateToProjects() {
  //   goto('/projects');
  // }

  // function handleLogin() {
  //   login(); // replace with your login logic
  // }
  import { Input, Label, Helper, Button, Checkbox, A, Heading, P} from 'flowbite-svelte';
  import { ArrowRightOutline } from 'flowbite-svelte-icons';
  var loggedIn="";
  var navigateToProjects="";
  var handleLogin="";
</script>

<main>
  <div class="container mx-auto mt-8 items-center">
    <div class="text-center items-center">
      <Heading tag="h1" class="mb-8" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">MapMyProject</Heading>
      <P class="mb-6 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        Welcome to MapMyProject, a cutting-edge project management system designed to streamline 
        your project workflows and elevate collaboration among team members. MapMyProject empowers 
        you to create, organize, and successfully execute projects with ease.
      </P>
      <P class="mb-6 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        MapMyProject is not just a tool; it's a catalyst for efficient project management.
        Stay in control, enhance collaboration, and witness the transformation of your projects from initiation to completion.
      </P>
      <P class="mb-6 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
      Ready to get started? Login to MapMyProject and experience a new era of project management.
      </P>
    </div>

    <P class="mb-6 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
    {#if loggedIn}
      <Button href="/">
        Go to Projects
        <ArrowRightOutline class="w-3.5 h-3.5 ms-2" />
      </Button>        
    
    {:else}

      <form>
        <div class="grid gap-6 mb-0 md:grid-cols-2">

          <div>
            <Label for="first_name" class="mb-2">Full Name</Label>
            <Input type="text" id="first_name" placeholder="John" required />
          </div>

          <div class="mb-6">
          <Label for="email" class="mb-2">Email address</Label>
          <Input type="email" id="email" placeholder="john.doe@company.com" required />
          </div>

        </div>

        <div class="mb-6">
          <Label for="password" class="mb-2">Password</Label>
          <Input type="password" id="password" placeholder="•••••••••" required />
        </div>
        
        <Checkbox class="mb-6 space-x-1 rtl:space-x-reverse" required>
          I agree with the <A href="/" class="text-primary-700 dark:text-primary-600 hover:underline">terms and conditions</A>.
        </Checkbox>

        <Button type="submit">Submit</Button>
      </form>    
      {/if}
    </P>
  </div>
</main>

<style>
  /* Add your styles here using Flowbite CSS components */
</style>
