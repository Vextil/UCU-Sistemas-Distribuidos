<script lang="ts">
	import { Badge, Button, Card } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import type { Sensor } from '$lib/models/sensors';
	import { goto } from '$app/navigation';

	export let data: PageData;

	function sensorNotUpdated(sensor: Sensor) {
		if (!sensor.lastUpdated) return true;
		const now = new Date();
		const lastUpdate = new Date(sensor.lastUpdated);
		const diff = now.getTime() - lastUpdate.getTime();
		const diffMinutes = Math.round(diff / (1000 * 60));
		return diffMinutes > 5;
	}
</script>

<div class="top">
  <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Sensores</h1>
  <Button on:click={() => goto('/sensors/create')}>Crear nuevo</Button>
</div>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
	{#each data.sensors.items as sensor}
		<Card href={'/sensors/' + sensor.id}>
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{sensor.name}

				{#if !sensor.lastUpdated}
					<Badge color="dark">Nunca actualizado</Badge>
				{:else if sensorNotUpdated(sensor)}
					<Badge color="red">Inactivo</Badge>
				{:else if sensor.status == 'leaking'}
					<Badge color="yellow">Perdiendo</Badge>
				{:else}
					<Badge color="green">OK</Badge>
				{/if}
			</h5>
			<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				{sensor.id}
			</p>
			<p class="font-normal text-gray-700 dark:text-gray-600 leading-tight text-sm">
				{sensor.lastUpdated ? new Date(sensor.lastUpdated).toLocaleString() : 'Nunca actualizado'}
			</p>
		</Card>
	{/each}
</div>

<style>
	h5 {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-top: 35px;
    align-items: center;
  }
</style>
