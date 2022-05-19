<script lang="ts">
	import { session } from '$app/stores';
	const logout = async () => {
		const res = await fetch('/api/auth', { method: 'delete' });
		session.set({ user: null });
	};
</script>

<nav>
	<a href="/">Home</a>
	{#if $session.user}
		Hello {$session.user.username}!
		<button on:click={logout}>Logout</button>
	{:else}
		<a href="/login">Login</a>
	{/if}
</nav>
<slot />
