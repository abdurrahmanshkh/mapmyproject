<script>
	import { Input, Label, Card, Button, Hr } from 'flowbite-svelte';
	//import {register,login,logout} from '../../api/controllers/authenticaton'

	//use these variables for json response
	let username = '';
	let password = '';
	let email = '';
	let manager = false;

	let error = null;
	var account = true;
	function switchtosignup() {
		account = false;
	}
	function switchtologin() {
		account = true;
	}
	function setasmanager() {
		manager = true;
	}

	const registerUser = async () => {
		try {
			const response = await fetch('http://localhost:8080/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username,
					password,
					email
				})
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
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username,
					password
				})
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

{#if account}
	<Card class="w-full border-2 border-gray-300 dark:border-gray-700">
		<form class="flex flex-col space-y-6" action="/">
			<h3 class="text-center text-xl font-medium text-gray-900 dark:text-white">
				Ready to get started? Login to MapMyProject and experience a new era of project management.
			</h3>
			<Hr classHr="my-8 h-1" />
			<Label class="space-y-2">
				<span>Email</span>
				<Input
					type="email"
					name="email"
					placeholder="name@company.com"
					bind:value={email}
					required
				/>
			</Label>
			<Label class="space-y-2">
				<span>Your password</span>
				<Input type="password" name="password" placeholder="•••••" bind:value={password} required />
			</Label>
			<Button on:click={loginUser} href="/dashboard" type="submit" class="w-full">
				Login to your account
			</Button>
		</form>
		<div class="mt-6 text-sm font-medium text-gray-500 dark:text-gray-300">
			{#if $error}
				<p class="text-red-500">{$error}</p>
			{/if}
			Not registered?
			<button
				on:click={switchtosignup}
				class="text-primary-700 hover:underline dark:text-primary-500"
			>
				Create account
			</button>
		</div>
	</Card>
{:else}
	<Card class="w-full border-2 border-gray-300 dark:border-gray-700">
		<form class="flex flex-col space-y-6" action="/">
			<h3 class="text-center text-xl font-medium text-gray-900 dark:text-white">
				Create your MapMyProject account
			</h3>
			<Hr classHr="my-8 h-1" />
			<Label class="space-y-2">
				<span>Full Name</span>
				<Input type="text" name="name" placeholder="John" bind:value={username} required />
			</Label>
			<Label class="space-y-2">
				<span>Email</span>
				<Input
					type="email"
					name="email"
					placeholder="name@company.com"
					bind:value={email}
					required
				/>
			</Label>
			<Label class="space-y-2">
				<span>Your password</span>
				<Input type="password" name="password" placeholder="•••••" bind:value={password} required />
			</Label>
			<Button href="/dashboard" on:click={registerUser} type="submit" class="w-full">
				Signup as Contributor
			</Button>
			<Button
				color="purple"
				href="/dashboard"
				on:click={registerUser}
				on:click={setasmanager}
				type="submit"
				class="w-full"
			>
				Signup as Manager
			</Button>
		</form>
		<div class="mt-6 text-sm font-medium text-gray-500 dark:text-gray-300">
			{#if $error}
				<p class="text-red-500">{$error}</p>
			{/if}
			Already registered?
			<button
				on:click={switchtologin}
				class="text-primary-700 hover:underline dark:text-primary-500"
			>
				Login to your account
			</button>
		</div>
	</Card>
{/if}
