import { db } from '$lib/db';
import type { GetSession, Handle } from '@sveltejs/kit';
import cookie from 'cookie';

export const handle: Handle = async ({ event, resolve }) => {
	const { sid } = cookie.parse(event.request.headers.get('cookie') || '');
	if (sid) {
		const session = await db.session.findUnique({
			where: { id: sid },
			include: { user: { select: { id: true, username: true } } }
		});
		event.locals.user = session?.user || null;
		event.locals.sid = session?.id || null;
	}

	return resolve(event);
};

export const getSession: GetSession = async ({ locals }) => {
	return {
		user: locals.user
	};
};
