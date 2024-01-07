<script>
  import { Input, Label, Helper, Button, Checkbox, A, Heading, P} from 'flowbite-svelte';
  import { Card } from 'flowbite-svelte';
</script>

<main>
  <div class="container mx-auto py-10 items-center">

    <div class="flex flex-col space-y-6 sm:space-y-0 sm:flex-row sm:items-center sm:justify-center">

      <Card class="w-full max-w-md">
        <form class="flex flex-col space-y-6" action="/">
          <h3 class="text-xl font-medium text-gray-900 dark:text-white">Create your MapMyProject account</h3>
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
          <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already registered? <a href="/" class="text-primary-700 hover:underline dark:text-primary-500"> Login to your account </a>
          </div>
        </form>
      </Card>
      
    </div>
      
  </div>
</main>