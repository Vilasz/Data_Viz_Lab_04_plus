<script>
	import * as d3 from "d3";
	import { afterUpdate, createEventDispatcher } from "svelte";

	/** Props **/
	export let commits = [];
	export let selectedCommits = [];
    export let shownCommits = [];

	const dispatch = createEventDispatcher();

    export let xScale;
	export let yScale;
    let pctScale = d3.scaleLinear()
        .domain([0, 100])
    // export let hoveredIndex = -1;
	// export let cursor       = { x:0, y:0 };

	/** Dimensões **/
	let width  = 800;
	let height = 400;
	const margin = { top: 20, right: 20, bottom: 40, left: 60 };

	/** Tooltip state **/
	let hoveredCommit = null;
	let tooltipX = 0;
	let tooltipY = 0;

	/** Escalas reativas **/
	$: xScale = d3.scaleTime()
		.domain(d3.extent(commits, d => d.datetime))
		.range([margin.left, width - margin.right]);

	// eixo Y dummy (todos no meio); ajuste como quiser
	$: yScale = d3.scaleLinear()
		.domain([-1, 1])
		.range([height - margin.bottom, margin.top]);

	let svgEl;
	afterUpdate(() => {
		if (!svgEl) return;
		d3.select(svgEl).select(".x-axis")
			.call(d3.axisBottom(xScale));
		d3.select(svgEl).select(".y-axis")
			.call(d3.axisLeft(yScale));
	});

	function toggle(c) {
		selectedCommits = selectedCommits.some(s => s.id === c.id)
			? selectedCommits.filter(s => s.id !== c.id)
			: [...selectedCommits, c];
		dispatch("update", { selectedCommits });
	}
</script>

<div class="chart-container">
	<svg bind:this={svgEl} {width} {height}>
		<g class="x-axis"
		   transform={`translate(0,${height - margin.bottom})`} />
		<g class="y-axis"
		   transform={`translate(${margin.left},0)`} />

		{#each shownCommits as c (c.id)}
			<circle
				cx={xScale(c.datetime)}
				cy={yScale(0)}
				r={selectedCommits.some(s => s.id === c.id) ? 6 : 4}
				style="--r: {selectedCommits.some(s => s.id === c.id) ? 6 : 4}"
				class="dot"

				tabindex="0"
				role="button"
				aria-label={`Toggle commit ${c.id?.slice(0,7)}`}

				on:click={() => toggle(c)}
				on:keydown={e => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						toggle(c);
					}
				}}

				on:mouseover={() => (hoveredCommit = c)}
				on:focus={() => (hoveredCommit = c)}
				on:mousemove={(e) => {
					// e.offsetX/Y são relativos ao <svg>
					tooltipX = e.offsetX + 10;
					tooltipY = e.offsetY - 10;
				}}
				on:mouseleave={() => (hoveredCommit = null)}
			/>
		{/each}
	</svg>

	{#if hoveredCommit}
		<div
			class="tooltip"
			style="
				left: {tooltipX}px;
				top:  {tooltipY}px;
			"
		>
			<strong>{hoveredCommit.id.slice(0,7)}</strong><br/>
			<em>{hoveredCommit.datetime.toLocaleString()}</em><br/>
			{hoveredCommit.message}
		</div>
	{/if}
</div>

<style>
	.chart-container {
		position: relative;
	}

	svg {
		width: 100%;
		height: auto;
		font: 10px sans-serif;
	}

	.dot {
		fill: steelblue;
		stroke: #fff;
		cursor: pointer;

		/* transições: radius proporcional a --r */
		transition: all 200ms,
		            r calc(var(--r) * 100ms);
	}

	/* entrada suave */
	@starting-style {
		.dot { r: 0; }
	}

	/* Tooltip */
	.tooltip {
		position: absolute;
		background: rgba(0, 0, 0, 0.75);
		color: #fff;
		padding: 0.5rem;
		border-radius: 4px;
		pointer-events: none;
		font-size: 0.8rem;
		white-space: nowrap;
		transform: translate(-50%, -100%); /* desloca um pouco pra cima e centraliza */
		z-index: 10;
	}
</style>
