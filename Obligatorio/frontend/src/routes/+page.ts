import { user } from '$lib/stores/user';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from "./$types";
import { get } from 'svelte/store';
import { PUBLIC_API } from '$env/static/public';
import type { SensorsResponse } from '$lib/models/sensors';

export const load = (async ({ fetch }) => {
  const userData = get(user);
  if (!userData) {
    throw redirect(307, '/login');
  }
  return {
    sensors: fetch(PUBLIC_API + '/GetSensors', {
      headers: {
        Authorization: userData.token
      }
    }).then(res => res.json() as Promise<SensorsResponse>)
  };
}) satisfies PageLoad;