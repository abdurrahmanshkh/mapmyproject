<script>
  import { Input, Label, Card, Button, Hr} from 'flowbite-svelte';
  var account = true;
    function createAccount() {
      account = false;
    }
    function login() {
      account = true;
    }
</script>

<main>

  <div class="container mx-auto py-10 items-center lg:grid lg:grid-cols-3 gap-10">
    <Card class="text-center col-span-2" size="" padding="xl">
      <h5 class="mb-0 text-3xl font-bold text-gray-900 dark:text-white">
        MapMyProject
      </h5>
      <Hr classHr="my-4" />
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
      <Card class="w-full">
        <form class="flex flex-col  space-y-6" action="/">
          <h3 class="text-xl font-medium text-gray-900 dark:text-white text-center">
            Ready to get started? Login to MapMyProject and experience a new era of project management.
          </h3>
          <Hr classHr="my-8" />
          <Label class="space-y-2">
            <span>Email</span>
            <Input type="email" name="email" placeholder="name@company.com" required />
          </Label>
          <Label class="space-y-2">
            <span>Your password</span>
            <Input type="password" name="password" placeholder="•••••" required />
          </Label>
          <Button href="/projects" type="submit" class="w-full">Login to your account</Button>
        </form>
        <div class="mt-6 text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?
            <button on:click={createAccount} class="text-primary-700 hover:underline dark:text-primary-500">
              Create account
            </button>
        </div>
      </Card>
    {:else}
      <Card class="w-full">
        <form class="flex flex-col space-y-6" action="/">
          <h3 class="text-xl font-medium text-gray-900 dark:text-white">
            Create your MapMyProject account
          </h3>
          <Hr classHr="my-8" />
          <Label class="space-y-2">
            <span>Full Name</span>
            <Input type="text" name="name" placeholder="John" required />
          </Label>
          <Label class="space-y-2">
            <span>Email</span>
            <Input type="email" name="email" placeholder="name@company.com" required />
          </Label>
          <Label class="space-y-2">
            <span>Your password</span>
            <Input type="password" name="password" placeholder="•••••" required />
          </Label>
          <Button href="/projects" type="submit" class="w-full">Create account</Button>
        </form>
        <div class="mt-6 text-sm font-medium text-gray-500 dark:text-gray-300">
            Already registered?
            <button href="/" on:click={login} class="text-primary-700 hover:underline dark:text-primary-500">
              Login to your account
            </button>
        </div>
      </Card>
    {/if}

  </div>

</main>