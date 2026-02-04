<script lang="ts">
    import { pb } from "../lib/pb";

    let email = $state("");
    let password = $state("");

    let error: string | null = $state(null);
    let loading = $state(false);

    async function handleLogin(e: Event) {
        e.preventDefault();

        error = null;
        loading = true;

        try {
            const user = await pb
                .collection("users")
                .authWithPassword(email, password);

            console.log("Logged in:", user);
        } catch (err) {
            console.error(err);
            error = "Login failed — check your email/password";
        } finally {
            loading = false;
        }
    }
</script>

<form
    onsubmit={handleLogin}
>
    <h2>Login</h2>

    {#if error}
        <p>{error}</p>
    {/if}

    <div>
        <label
            >Email
            <input type="email" bind:value={email} required />
        </label>
    </div>

    <div>
        <label
            >Password
            <input type="password" bind:value={password} required />
        </label>
    </div>

    <button
        type="submit"
        disabled={loading}
    >
        {#if loading}
            Logging in…
        {:else}
            Log In
        {/if}
    </button>
</form>
