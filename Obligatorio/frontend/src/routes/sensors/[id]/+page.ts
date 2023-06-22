import { user } from '$lib/stores/user';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { get } from 'svelte/store';
import { PUBLIC_API } from '$env/static/public';
import type { LogsResponse } from '$lib/models/logs';

export const load = (async ({ fetch, params }) => {
  const userData = get(user);
  if (!userData) {
    throw redirect(307, '/login');
  }
  return {
    logs: fetch(PUBLIC_API + '/GetData?sensorId=' + params.id, {
      headers: {
        Authorization: userData.token
      }
    }).then(res => res.json() as Promise<LogsResponse>),
    id: params.id
  };
}) satisfies PageLoad;