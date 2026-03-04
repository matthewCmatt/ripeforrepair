import { createDirectus, rest } from "@directus/sdk";

export interface About {
    page_title: string;
    page_subtitle: string;
    hero_image: string;
    page_details: string;
    news_coverage: NewsCoverage[];
}

export interface NewsCoverage {
    title: string;
    href: string;
}

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
    about: About;
    email_signups: EmailSignup;
}

export const directus = createDirectus<Schema>(
    "https://admin.ripe4repair.org",
).with(rest());
