import { browser } from "$app/environment";
import type { User } from "$lib/models/user";
import { writable } from "svelte/store";

export const user = writable<User | null>(null);

if (browser) {
  const userData = localStorage.getItem('user');
  if (userData) {
    user.set(JSON.parse(userData));
  }
}