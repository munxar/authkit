import { db } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';
import crypto from 'node:crypto';
import cookie from 'cookie';

export const post: RequestHandler = async ({ request, locals }) => {
	if (locals.user) {
		return {
			body: {
				errors: [],
				user: locals.user
			}
		};
	}

	const { username, password } = await request.json();

	const user = await db.user.findFirst({
		where: { username, password },
		select: { id: true, username: true }
	});

	if (!user) {
		return {
			status: 400,
			body: {
				errors: ['username / password wrong'],
				user: null
			}
		};
	}

	const session = await db.session.create({ data: { id: crypto.randomUUID(), userId: user.id } });

	return {
		headers: {
			'set-cookie': cookie.serialize('sid', session.id, { httpOnly: true, path: '/' })
		},
		body: {
			errors: [],
			user
		}
	};
};

export const del: RequestHandler = async ({ locals }) => {
	if (locals.sid) {
		await db.session.delete({ where: { id: locals.sid } });
	}

	return {
		headers: {
			'set-cookie': cookie.serialize('sid', '', { httpOnly: true, path: '/', expires: new Date(0) })
		}
	};
};
