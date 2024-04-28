<script>
	import { goto } from '$app/navigation';
  import { Input, Label, Card, Button, Hr} from 'flowbite-svelte';

  let username="";
  let password="";
  let email="";
  let isManager=true
  let accountType=[{text:'Manager'},{text:'Contributer'}]
  let selected
  let answer=''
  let error=null
  export let accounter
  var account = true;
    function switchtosignup() {
      account = false;
      error=null
      username="";
      password="";
      email="";
    }
    function switchtologin() {
      account = true;
      error=null
      username="";
      password="";
      email="";
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
    });


    if (!response.ok) {
      error = await response.text();
      
      return;
    }
    loginUser()
  } catch (err) {
    error.set(err.message);
  }
};

function userType(event){
  isManager=event.target.value==='manager'
}

export const loginUser = async () => {
  console.log("in login : ",username,password)
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
    });
    console.log("session ",sessionStorage.getItem('accessToken'))
    console.log("local ",localStorage.getItem('accessToken'))
    console.log("session key ",sessionStorage.key(0))
    if (!response.ok) {
      error = await response.text();
      console.log("Error",error)
      return;
    }

    const data = await response.json();
    accounter=data.isManager
    console.log(data);
    goto('/projects')
  } catch (err) {
    console.log(err)
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
          {#if error!=null}
          <div class="rounded-lg bg-red-200 p-3 dark:bg-red-150">
            <center><dd class="text-sm font-medium text-red-600 dark:text-red-700">{error}</dd></center>
          </div>
            {/if}
          <Hr classHr="my-8 h-1" />
          <Label class="space-y-2">
            <span>Username</span>
            <Input type="username" name="username" placeholder="mark" bind:value={username} required />
          </Label>
          <Label class="space-y-2">
            <span>Your password</span>
            <Input type="password" name="password" placeholder="•••••" bind:value={password} required />
          </Label>
          <Button on:click={loginUser}  type="submit" class="w-full">
            Login to your account
          </Button>
        </form>
        <div class="mt-6 text-sm font-medium text-gray-500 dark:text-gray-300">
       
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
          {#if error!=null}
          <div class="rounded-lg bg-red-200 p-3 dark:bg-red:400">
            <center><dd class="text-sm font-medium text-red-600 dark:text-red-300">{error}</dd></center>
          </div>
            {/if}
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
         <span>Account Type</span>
         <br>
            <select class="mt-2 dark:bg-gray-800 dark:text-white" on:change={userType}>
              <option value="manager">Manager</option>
              <option value="contributer">Contributer</option>
            </select>
          </Label>
          <Label>
          <Button on:click={registerUser} type="submit" class="w-full">
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