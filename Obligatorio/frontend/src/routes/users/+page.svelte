<script lang="ts">
	import { Button, Card } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;
</script>

<div class="top">
  <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Usuarios</h1>
  <Button on:click={() => goto('/users/create')}>Crear nuevo</Button>
</div>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
	{#each data.users.items as user}
		<Card>
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{user.username}
			</h5>
		</Card>
	{/each}
</div>

<style>
	h5 {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
