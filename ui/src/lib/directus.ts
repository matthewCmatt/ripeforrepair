import { createDirectus, rest } from '@directus/sdk';
export const directus = createDirectus('http://74.208.111.3').with(rest());
