<script lang="ts">
	import { PUBLIC_API } from '$env/static/public';
	import type { User } from '$lib/models/user';
	import { user } from '$lib/stores/user';
	import { Label, Input, Helper, Button, Alert } from 'flowbite-svelte';
	import { get } from 'svelte/store';

	const userData = get(user) as User;

	let name = '';
	let createdName = '';
  let createdId = '';
	let createdToken = '';
	let copyTokenText = 'Copiar token';

	function login() {
		fetch(PUBLIC_API + '/CreateSensor', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: userData.token
			},
			body: JSON.stringify({
				name
			})
		})
			.then((response) => response.json())
			.then((data) => {
				createdName = name;
        createdId = data.id;
				createdToken = data.token;
				copyTokenText = 'Copiar token';
				name = '';
			});
	}

	function copyToken() {
		navigator.clipboard.writeText(createdToken);
		copyTokenText = 'Copiado';
	}
</script>

<div class="top">
  <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Crear sensor</h1>
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
			<span class="text-lg font-medium">Sensor creado exitosamente!</span>
		</div>
		<p class="mt-2 mb-4 text-sm">
			<b>Nombre:</b>
			{createdName}<br>
      <b>ID:</b>
			{createdId}
		</p>
		<div class="flex gap-2">
			<Button size="xs" color="green" on:click={copyToken}>{copyTokenText}</Button>
		</div>
	</Alert>
{/if}

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
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
	}
</style>
