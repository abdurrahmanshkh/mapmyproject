<script>
    import 
    import { Input, Label, Card, Button, Hr} from 'flowbite-svelte';
    var email;
    var name;
    var password;
    function submit() {
        console.log('submit');
  }
</script>
      
      
<Card class="w-full">
<form class="flex flex-col space-y-6" action="/">
    <h3 class="text-xl font-medium text-gray-900 dark:text-white">
    Create your MapMyProject account
    </h3>
    <Hr classHr="my-8" />
    <Label class="space-y-2">
    <span>Full Name</span>
    <Input type="text" name="name" placeholder="John" required bind:value={name}/>
    </Label>
    <Label class="space-y-2">
    <span>Email</span>
    <Input type="email" name="email" placeholder="name@company.com" required bind:value={email}/>
    </Label>
    <Label class="space-y-2">
    <span>Your password</span>
    <Input type="password" name="password" placeholder="•••••" required bind:value={password}/>
    </Label>
    <Button href="/projects" on:click{submit} type="submit" class="w-full">Create account</Button>
</form>
<div class="mt-6 text-sm font-medium text-gray-500 dark:text-gray-300">
    Already registered?
    <button href="/" class="text-primary-700 hover:underline dark:text-primary-500">
        Login to your account
    </button>
</div>
</Card>