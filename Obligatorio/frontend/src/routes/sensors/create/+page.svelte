<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_API } from '$env/static/public';
	import { user } from '$lib/stores/user';
	import { Label, Input, Helper, Button } from 'flowbite-svelte';

	let name = '';

	function login() {
		fetch(PUBLIC_API + '/CreateSensor', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
			})
		})
			.then((response) => response.json())
			.then((data) => {
				if (!data.token) {
					alert('Usuario o contraseña incorrectos');
					return;
				}
				const userObject = {
					username: data.username,
					token: data.token
				};
				user.set(userObject);
				localStorage.setItem('user', JSON.stringify(userObject));
				goto('/');
			});
	}
</script>

<div class="form-container">
	<div class="mb-6">
		<Label for="name" class="block mb-2">Nombre</Label>
		<Input id="name" placeholder="Nombre" bind:value={name} />
	</div>

	<div class="flex flex-col items-center">
		<Button on:click={login}>Crear</Button>
	</div>
</div>

<style>
	.form-container {
		width: 400px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
