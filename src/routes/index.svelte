<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => {
		if (!session.user) {
			return {
				redirect: '/login',
				status: 302
			};
		}
		return {};
	};
</script>

<h1>Welcome to Soundkit</h1>
