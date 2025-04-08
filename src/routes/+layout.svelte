<script>
	import { base } from "$app/paths";
	import { page } from "$app/stores";
	import { onMount } from "svelte";

	let pages = [
		{ url: "/", title: "Home" },
		{ url: "/projects", title: "Projects" },
		{ url: "/contact", title: "Contact" },
		{ url: "/resume", title: "Resume" },
		{url:"/meta", title: "Meta"}
	];

	// Use "auto" to indicate automatic (OS) preference.
	let colorScheme = "auto";
	let root = globalThis?.document?.documentElement;

	onMount(() => {
		// Retrieve saved theme or default to "auto"
		colorScheme = localStorage.getItem("colorScheme") ?? "auto";
		applyColorScheme();
	});

	// Call applyColorScheme() on each change
	function applyColorScheme() {
		if (!root) return;
		// "auto" clears manual overrides so the OS theme is used
		if (colorScheme === "auto") {
			root.style.setProperty("color-scheme", "light dark");
			root.classList.remove("light-theme", "dark-theme");
		} else {
			// When a manual option is chosen, use that value
			root.style.setProperty("color-scheme", colorScheme);
			root.classList.remove("light-theme", "dark-theme");
			root.classList.add(colorScheme === "light" ? "light-theme" : "dark-theme");
		}
		localStorage.setItem("colorScheme", colorScheme);
	}
</script>

<nav>
	<div class="nav-links">
		{#each pages as p}
			<a
				href={p.url.startsWith("http") ? p.url : `${base}${p.url}`}
				class:active={$page.route.id === p.url}
				target={p.url.startsWith("http") ? "_blank" : undefined}
			>
				{p.title}
			</a>
		{/each}
	</div>

	<div class="theme-switcher">
		<label for="theme-select">Theme:</label>
		<select id="theme-select" bind:value={colorScheme} on:change={applyColorScheme}>
			<option value="auto">Automatic</option>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
		</select>
	</div>
</nav>

<slot />

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--grey, oklch(80% 3% 200));
		padding-bottom: 0.5rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.nav-links {
		display: flex;
		gap: 1rem;
	}

	a {
		text-decoration: none;
		color: inherit;
		text-align: center;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		transition: background-color 0.3s ease, color 0.3s ease;
	}

	a:hover {
		color: var(--white);
		background-color: var(--grey, oklch(80% 3% 200));
	}

	a.active {
		border-bottom: 2px solid var(--skyblue, deepskyblue);
	}

	.theme-switcher {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	select {
		padding: 0.4rem;
		border-radius: 0.4rem;
		border: 1px solid #ccc;
	}
</style>
