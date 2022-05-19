<script lang="ts">
	import type { Notes } from '@prisma/client';
	export let notes = [] as Notes[];
</script>

<h1>Notes</h1>
{#each notes as note}
	<div>
		{note.id}
		{note.title}
		{note.content}
	</div>
{/each}
