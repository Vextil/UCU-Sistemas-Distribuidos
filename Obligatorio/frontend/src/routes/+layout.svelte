<script lang="ts">
	import { NavBrand, NavHamburger, NavLi, NavUl, Navbar } from 'flowbite-svelte';
	import '../app.postcss';
	import { user } from '$lib/stores/user';
	import { goto } from '$app/navigation';

	function logout() {
		user.set(null);
		localStorage.removeItem('user');
		goto('/login');
	}
</script>

<div class="container">
	<Navbar let:hidden let:toggle rounded color="form">
		<NavBrand href="/">
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
				App Sensores
			</span>
		</NavBrand>
		<NavHamburger on:click={toggle} />
		<NavUl {hidden}>
			{#if $user}
				<NavLi href="/" active={true}>Sensores</NavLi>
				<NavLi href="#" on:click={logout}>Salir</NavLi>
			{/if}
		</NavUl>
	</Navbar>
</div>

<div class="container mt-8">
	<slot />
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		margin-top: 20px;
	}
</style>
