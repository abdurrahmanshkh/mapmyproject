<!-- App.svelte -->
<script>
    let username = '';
    let password = '';
    let email='';

    const registerUser = async () => {
        const response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                email
            }),
        });

        const data = await response.json();
        console.log(data);
    };
</script>

<form on:submit={registerUser}>
    <label for="username">Username:</label>
    <input type="text" bind:value={username} />

    <label for="password">Password:</label>
    <input type="password" bind:value={password} />

    <label for="email">Email:</label>
    <input type="email" bind:value={email} />


    <button type="submit">Register</button>
</form>