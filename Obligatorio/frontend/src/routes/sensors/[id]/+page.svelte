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
	import { goto } from '$app/navigation';

	export let data: PageData;
</script>

<div class="top">
	<h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Sensor: {data.id}</h1>
	<!-- <Button on:click={() => goto('/sensors/create')}>Crear nuevo</Button> -->
</div>

<Table color="custom">
	<TableHead class="text-xs uppercase text-gray-700 dark:text-gray-400 bg-gray-50 dark:bg-gray-700">
		<TableHeadCell>Hora</TableHeadCell>
		<TableHeadCell>Cantidad</TableHeadCell>
		<TableHeadCell>Cantidad máxima</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each data.logs.items as log}
			<TableBodyRow
				class={log.amount < log.maxAmount
					? 'bg-red-500 dark:border-gray-700'
					: 'border-b last:border-b-0 bg-white dark:bg-gray-800 dark:border-gray-700'}
			>
				<TableBodyCell>{log.time}</TableBodyCell>
				<TableBodyCell>{log.amount}</TableBodyCell>
				<TableBodyCell>{log.maxAmount}</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
