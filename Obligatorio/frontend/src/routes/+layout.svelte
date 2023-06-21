<script lang="ts">
	import { NavBrand, NavHamburger, NavLi, NavUl, Navbar } from 'flowbite-svelte';
	import '../app.postcss';
	import { user } from '$lib/stores/user';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

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
				<NavLi href="/" active={$page.url.pathname === '/' }>Sensores</NavLi>
        <NavLi href="/users" active={$page.url.pathname === '/users' }>Usuarios</NavLi>
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
