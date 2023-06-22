<script lang="ts">
	import {
	Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="top">
	<h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Sensor: {data.id}</h1>
	<Button on:click={() => goto('/sensors/create')}>Crear nuevo</Button>
</div>

<Table>
	<TableHead>
		<TableHeadCell>Hora</TableHeadCell>
		<TableHeadCell>Cantidad</TableHeadCell>
		<TableHeadCell>Cantidad máxima</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each data.logs.items as log}
			<TableBodyRow>
				<TableBodyCell>{log.time}</TableBodyCell>
				<TableBodyCell>{log.amount}</TableBodyCell>
				<TableBodyCell>{log.maxAmount}</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
