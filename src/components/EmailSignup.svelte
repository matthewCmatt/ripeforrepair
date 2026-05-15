<script lang="ts">
    import { createItem } from "@directus/sdk";
    import { directus } from "../lib/directus";

    let name = $state("");
    let email = $state("");
    let comment = $state("");

    let loading = $state(false);
    let error: string | null = $state(null);
    let success = $state(false);

    async function handleSubmit(event: Event) {
        event.preventDefault();

        error = null;
        success = false;

        if (!name.trim() || !email.trim()) {
            error = "Name and email are required.";
            return;
        }

        loading = true;

        try {
            await directus.request(
                createItem("email_signups", {
                    name,
                    email,
                    comment: comment || undefined,
                }),
            );

            success = true;
            name = "";
            email = "";
            comment = "";
        } catch (err) {
            console.error(err);
            error = "Failed to submit form. Please try again.";
        } finally {
            loading = false;
        }
    }
</script>

<form onsubmit={handleSubmit} class="signup-form">
    <label>
        <span>What's your first & last name? *</span>
        <input type="text" bind:value={name} required placeholder="Jane Doe" />
    </label>

    <label>
        <span>What's your email address? *</span>
        <input
            type="email"
            bind:value={email}
            required
            placeholder="jane@example.com"
        />
    </label>

    <label>
        <span>
            Any repair community hopes/dreams/insights/questions you want to
            share? (optional)
        </span>
        <textarea rows="4" bind:value={comment} placeholder="Your thoughts..."
        ></textarea>
    </label>

    {#if error}
        <output class="error">{error}</output>
    {/if}

    {#if success}
        <output class="success">Thanks for signing up! 🎉</output>
    {/if}

    <button type="submit" disabled={loading} data-umami-event="submit-signup">
        {loading ? "Submitting…" : "Sign Up"}
    </button>
</form>

<style>
    .signup-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    label {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    input,
    textarea {
        padding: 0.5rem 0.6rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 0.95rem;
    }

    button {
        padding: 0.6rem 1rem;
        border: none;
        border-radius: 6px;
        background: #222;
        color: white;
        font-size: 0.95rem;
        cursor: pointer;
    }

    button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .error {
        color: #c0392b;
        font-size: 0.9rem;
    }

    .success {
        color: #000000;
        font-size: 0.9rem;
    }
</style>
