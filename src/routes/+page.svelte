<script>
  import { Input, Label, Card, Button, Hr} from 'flowbite-svelte';
  //import {register,login,logout} from '../../api/controllers/authenticaton'

  //use these variables for json response
  let username="";
  let password="";
  let email="";
  let isManager=true
  let accountType=[{text:'Manager'},{text:'Contributer'}]
  let selected
  let answer=''
  let error
  var account = true;
    function switchtosignup() {
      account = false;
    }
    function switchtologin() {
      account = true;
    }
    function setAccountType(answer){
      if(answer==='Manager'){
        isManager=true
      }else{
        isManager=false
      }
    }

  const registerUser = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        email,
        isManager
      }),
    }).catch((error) => {
      throw new Error(`Network error: ${error.message}`);
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      error.set(`Registration failed: ${errorMessage}`);
      return;
    }

    const data = await response.json();
    console.log(data);
    error.set(null);
  } catch (err) {
    error.set(err.message);
  }
};

const loginUser = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      credentials:'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).catch((error) => {
      throw new Error(`Network error: ${error.message}`);
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      error.set(`Login failed: ${errorMessage}`);
      return;
    }

    const data = await response.json();
    console.log(data);
    error.set(null);
  } catch (err) {
    error.set(err.message);
  }
};
  
</script>

<main>

  <div class="container mx-auto py-10 items-center lg:grid lg:grid-cols-3 gap-10">
    <Card class="border-gray-300 dark:border-gray-700 border-2 text-center col-span-2" size="" padding="xl">
      <h5 class="mb-0 text-3xl font-bold text-gray-900 dark:text-white">
        MapMyProject
      </h5>
      <Hr classHr="my-4 h-1" />
      <p class="mb-3 text-base text-gray-500 sm:text-lg dark:text-gray-400">
        Welcome to MapMyProject, a cutting-edge project management system designed to streamline 
        your project workflows and elevate collaboration among team members. MapMyProject empowers 
        you to create, organize, and successfully execute projects with ease.
      </p>
      <p class="mb-3 text-base text-gray-500 sm:text-lg dark:text-gray-400">
        MapMyProject is a robust project management solution with user-friendly features. It simplifies project initiation, 
        meticulous task management, and dynamic collaboration. Effortlessly create and define projects, assign tasks, and 
        monitor progress in real-time. Transform your project management experience with MapMyProject's collaborative and 
        efficient approach.
      <p class="mb-0 text-base text-gray-500 sm:text-lg dark:text-gray-400">
        MapMyProject is not just a tool; it's a catalyst for efficient project management.
        Stay in control, enhance collaboration, and witness the transformation of your projects from initiation to completion.
      </p>
    </Card>

    {#if account}
      <Card class="w-full border-gray-300 dark:border-gray-700 border-2">
        <form class="flex flex-col  space-y-6" action="/">
          <h3 class="text-xl font-medium text-gray-900 dark:text-white text-center">
            Ready to get started? Login to MapMyProject and experience a new era of project management.
          </h3>
          <Hr classHr="my-8 h-1" />
          <Label class="space-y-2">
            <span>Email</span>
            <Input type="username" name="username" placeholder="mark" bind:value={username} required />
          </Label>
          <Label class="space-y-2">
            <span>Your password</span>
            <Input type="password" name="password" placeholder="•••••" bind:value={password} required />
          </Label>
          <Button on:click={loginUser} href="/projects" type="submit" class="w-full">
            Login to your account
          </Button>
        </form>
        <div class="mt-6 text-sm font-medium text-gray-500 dark:text-gray-300">
          {#if $error}
            <p class="text-red-500">{$error}</p>
          {/if}
            Not registered?
            <button on:click={switchtosignup} class="text-primary-700 hover:underline dark:text-primary-500">
              Create account
            </button>
        </div>
      </Card>
    {:else}
      <Card class="w-full border-gray-300 dark:border-gray-700 border-2">
        <form class="flex flex-col space-y-6" action="/">
          <h3 class="text-xl font-medium text-gray-900 dark:text-white">
            Create your MapMyProject account
          </h3>
          <Hr classHr="my-8 h-1" />
          <Label class="space-y-2">
            <span>Full Name</span>
            <Input type="text" name="name" placeholder="John" bind:value={username} required />
          </Label>
          <Label class="space-y-2">
            <span>Email</span>
            <Input type="email" name="email" placeholder="name@company.com" bind:value={email} required />
          </Label>
          <Label class="space-y-2">
            <span>Your password</span>
            <Input type="password" name="password" placeholder="•••••" bind:value={password} required />
          </Label>
          <Label class="space-y-2">
            <!-- <span>Account Type</span>
            <select bind:value={selected} on:change={answer=''}>
              {#each accountType as account}
                <option value={account}>
                {account.text}
                </option>
              {/each}
          </select> -->
          </Label>
          <Label>
          <Button href="/projects" on:click={registerUser} type="submit" class="w-full">
            Create account
          </Button>
          </Label>
        <div class="mt-6 text-sm font-medium text-gray-500 dark:text-gray-300">
          {#if $error}
            <p class="text-red-500">{$error}</p>
          {/if}
            Already registered?
            <button on:click={switchtologin} class="text-primary-700 hover:underline dark:text-primary-500">
              Login to your account
            </button>
        </div>
        </form>
      </Card>
    {/if}

  </div>

</main>