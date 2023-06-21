import { user } from '$lib/stores/user';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { PUBLIC_API } from '$env/static/public';
import type { UsersResponse } from '$lib/models/user';
import type { PageLoad } from './$types';

export const load = (async ({ }) => {
  const userData = get(user);
  if (!userData) {
    throw redirect(307, '/login');
  }
  return {
    users: fetch(PUBLIC_API + '/GetUsers', {
      headers: {
        Authorization: userData.token
      }
    }).then(res => res.json() as Promise<UsersResponse>)
  };
}) satisfies PageLoad;