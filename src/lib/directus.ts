import { createDirectus, rest } from "@directus/sdk";

export interface Event {
    id: number;
    name: string;
    date: Date;
    start_time: string;
    end_time: string;
    address: string;
    repairs_available: string[];
    description: string;
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
