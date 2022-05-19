<script context="module" lang="ts">
	export const load: Load = async ({ session }) => {
		if (session.user) {
			return {
				redirect: '/',
				status: 302
			};
		}
		return {};
	};
</script>

<script lang="ts">
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { Load } from '@sveltejs/kit';

	const submit = async () => {
		const res = await fetch('/api/auth', { method: 'post', body: JSON.stringify(user) });

		const data = await res.json();
		errors = data.errors;
		session.set({ user: data.user });
		goto('/');
	};
	let errors = [] as string[];
	let user = {
		username: '',
		password: ''
	};
</script>

<h1>Login</h1>
<form on:submit|preventDefault={submit}>
	<input type="text" bind:value={user.username} />
	<input type="password" bind:value={user.password} />
	<button type="submit">Login</button>
</form>
{#each errors as error}
	<div>{error}</div>
{/each}
