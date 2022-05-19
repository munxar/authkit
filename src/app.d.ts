/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		user: User | null;
		sid: string | null;
	}
	// interface Platform {}
	interface Session {
		user: User | null;
	}
	// interface Stuff {}
}
