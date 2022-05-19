import { db } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals }) => {
	if (locals.user) {
		const where = locals.user.username === 'admin' ? {} : { userId: locals.user?.id };
		const notes = await db.notes.findMany({
			where
		});
		return {
			body: {
				notes
			}
		};
	}
	return {};
};
