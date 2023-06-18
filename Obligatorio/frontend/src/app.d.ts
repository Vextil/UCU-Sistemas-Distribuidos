// See https://kit.svelte.dev/docs/types#app

import type { User } from "./lib/models/user";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
    interface Locals {
      user: User | null;
    }
    interface PageData {
      user: User | null;
    }
		// interface Platform {}
	}
}

export {};
