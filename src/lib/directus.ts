import { createDirectus, rest } from "@directus/sdk";

interface Event {
    id: number;
    name: string;
    start_time: Date;
    address: string;
}

interface EmailSignup {
    name: string;
    email: string;
    comment: string;
}

interface Schema {
    events: Event[];
    email_signups: EmailSignup;
}

export const directus = createDirectus<Schema>(
    "https://admin.ripe4repair.org",
).with(rest());
