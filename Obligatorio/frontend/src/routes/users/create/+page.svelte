<script lang="ts">
	import { PUBLIC_API } from '$env/static/public';
	import type { User } from '$lib/models/user';
	import { user } from '$lib/stores/user';
	import { Label, Input, Helper, Button, Alert } from 'flowbite-svelte';
	import { get } from 'svelte/store';

	const userData = get(user) as User;

	let username = '';
	let email = '';
	let password = '';
	let createdName = '';
	let createdEmail = '';

	function login() {
		fetch(PUBLIC_API + '/CreateUser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: userData.token
			},
			body: JSON.stringify({
				username,
				email,
				password
			})
		})
			.then((response) => response.json())
			.then((data) => {
				createdName = username;
				createdEmail = email;
				username = '';
				email = '';
			});
	}
</script>

<div class="top">
	<h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Crear usuario</h1>
</div>

{#if createdName}
	<Alert color="green">
		<div class="flex items-center gap-3">
			<svg
				aria-hidden="true"
				class="w-5 h-5"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
					clip-rule="evenodd"
				/></svg
			>
			<span class="text-lg font-medium">Usuario creado exitosamente!</span>
		</div>
		<p class="mt-2 mb-4 text-sm">
			<b>Nombre:</b>
			{createdName}<br />
			<b>Email:</b>
			{createdEmail}
		</p>
	</Alert>
{/if}

<div class="form-container">
	<div class="mb-6">
		<Label for="username" class="block mb-2">Username</Label>
		<Input id="username" placeholder="Username" bind:value={username} />
	</div>
	<div class="mb-6">
		<Label for="email" class="block mb-2">Email</Label>
		<Input id="email" type="email" placeholder="Email" bind:value={email} />
	</div>
	<div class="mb-6">
		<Label for="password" class="block mb-2">Contraseña</Label>
		<Input id="password" type="password" placeholder="Contraseña" bind:value={password} />
	</div>

	<div class="flex flex-col items-center">
		<Button on:click={login}>Crear</Button>
	</div>
</div>

<style>
	.form-container {
		width: 400px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
	}
</style>
