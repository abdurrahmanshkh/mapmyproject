@ -1,47 +0,0 @@
<script>
  import { Input, Label, Card, Button, Hr} from 'flowbite-svelte';
</script>

<main>

  <div class="container mx-auto py-10 items-center lg:grid lg:grid-cols-2 gap-10">
    <Card class="text-center" size="" padding="xl">
      <h5 class="mb-0 text-3xl font-bold text-gray-900 dark:text-white">
        MapMyProject
      </h5>
      <Hr classHr="my-4" />
      <p class="mb-3 text-base text-gray-500 sm:text-lg dark:text-gray-400">
        Welcome to MapMyProject, a cutting-edge project management system designed to streamline 
        your project workflows and elevate collaboration among team members. MapMyProject empowers 
        you to create, organize, and successfully execute projects with ease.
      </p>
      <p class="mb-0 text-base text-gray-500 sm:text-lg dark:text-gray-400">
        MapMyProject is not just a tool; it's a catalyst for efficient project management.
        Stay in control, enhance collaboration, and witness the transformation of your projects from initiation to completion.
      </p>
    </Card>

    <Card class="w-full max-w-md">
      <form class="flex flex-col space-y-6" action="/">
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
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered? <a href="/createaccount" class="text-primary-700 hover:underline dark:text-primary-500"> Create account </a>
        </div>
      </form>
    </Card>

  </div>

</main>