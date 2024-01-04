<!-- Home.svelte -->
<script>
  //export let user; // Assuming you pass the user information as a prop
  var user= "Abdur Rehman";
  var pname= "Project 1";
</script>

<style>
  /* Add your styles here */
</style>

{#if user}
  <main>
    <h1>Welcome to the Project Management System</h1>
    <p>Hello, {user}!</p>
    <p>Start managing your projects efficiently.</p>
  </main>
{:else}
  <main>
    <p>Please log in to access the project management system.</p>
    <!-- Add login form or a login button/link here -->
  </main>
{/if}
