<script lang="ts">
	import {
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

<Table>
	<TableHead>
		<TableHeadCell>Time</TableHeadCell>
		<TableHeadCell>Amount</TableHeadCell>
		<TableHeadCell>Max amount</TableHeadCell>
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
