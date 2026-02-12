import { createDirectus, rest } from '@directus/sdk';
export const directus = createDirectus('https://admin.ripe4repair.org').with(rest());
