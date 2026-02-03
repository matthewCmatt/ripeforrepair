<script lang="ts">
    import { pb } from "../lib/pb";

    let email = $state("");
    let password = $state("");

    let error: string | null = $state(null);
    let loading = $state(false);

    async function handleLogin() {
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
    onsubmit={async (e) => {
        e.preventDefault();
        await handleLogin();
    }}
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
        class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
        {#if loading}
            Logging in…
        {:else}
            Log In
        {/if}
    </button>
</form>
