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
  var loggedIn="";
  var navigateToProjects="";
  var handleLogin="";
</script>

<main>
  <div class="container mx-auto mt-16">
      <div>
        <h1 class="text-4xl font-bold mb-4">Welcome to MapMyProject</h1>
        <p class="text-lg mb-4">
          Welcome to MapMyProject, a cutting-edge project management system designed to streamline 
          your project workflows and elevate collaboration among team members. MapMyProject empowers 
          you to create, organize, and successfully execute projects with ease.
        </p>
      </div>
    {#if loggedIn}
      <button class="btn btn-primary" on:click={navigateToProjects}>
        Go to Projects
      </button>
    {:else}
      <button class="btn btn-primary" on:click={handleLogin}>
        Login
        
<label for="input-group-1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
<div class="relative mb-6">
  <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
    </svg>
  </div>
  <input type="text" id="input-group-1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com">
</div>
<label for="website-admin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
<div class="flex">
  <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
    </svg>
  </span>
  <input type="text" id="website-admin" class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="elonmusk">
</div>

      </button>
    {/if}
  </div>
</main>

<style>
  /* Add your styles here using Flowbite CSS components */
</style>
