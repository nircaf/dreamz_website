-- Newsletter sign-ups from the homepage form.
-- RLS is on with no policies, so the anon/authenticated roles can't read or write;
-- only the newsletter-subscribe edge function (service role) touches this table.
create table if not exists public.newsletter_subscribers (
    id uuid primary key default gen_random_uuid(),
    email text not null,
    source text not null default 'homepage',
    created_at timestamptz not null default now(),
    constraint newsletter_subscribers_email_format check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
    constraint newsletter_subscribers_email_length check (char_length(email) <= 254)
);

create unique index if not exists newsletter_subscribers_email_key
    on public.newsletter_subscribers (lower(email));

alter table public.newsletter_subscribers enable row level security;

revoke all on public.newsletter_subscribers from anon, authenticated;
