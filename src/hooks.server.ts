import type { Handle } from '@sveltejs/kit';
import { locale } from 'svelte-i18n';
import lang from '$lib/stores/langStore';
import {get} from "svelte/store";


export const handle: Handle = async ({ event, resolve }) => {
    const language = event.request.headers.get('accept-language')?.split(',')[0];
    const localLang = get(lang);
    if (localLang !== ""){
        locale.set(localLang);
    }
    else if (language) {
        locale.set(language);
        lang.set(language);
    }
    return resolve(event);
};