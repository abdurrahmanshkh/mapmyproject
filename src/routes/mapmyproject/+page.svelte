<script>
  import { Input, Label, Helper, Button, Checkbox, A, Heading, P} from 'flowbite-svelte';
  import { Card } from 'flowbite-svelte';
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

    <div class="flex flex-col space-y-6 sm:space-y-0 sm:flex-row sm:items-center sm:justify-center">

      <Card class="w-full max-w-md">
        <form class="flex flex-col space-y-6" action="/">
          <h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
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
  </div>

</main>