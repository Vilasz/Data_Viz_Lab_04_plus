<script>
import * as d3 from 'd3';
export let data = [];


let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

let arc = arcGenerator({
    startAngle: 0,
    endAngle: 2 * Math.PI
});



let colors = d3.scaleOrdinal(d3.schemeTableau10);
let pieGenerator = d3.pie().value(d => d);
let sliceGenerator = d3.pie().value(d => d.value);
// let arcData = sliceGenerator(data);
// Define arcData and arcs outside the reactive block
let arcData;
let arcs;

    $: {
        // Reactively calculate arcData and arcs the same way we did before with sliceGenerator and arcGenerator
        let sliceGenerator = d3.pie().value(d => d.value);
        arcData = sliceGenerator(data);

        let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
        arcs = arcData.map(d => arcGenerator(d));
    }

    export let selectedIndex = -1;


    

</script>

<div class="container">
    <svg viewBox="-50 -50 100 100">
        {#each arcs as arc, index}
        <path d={arc} fill={colors(index)}
              class:selected={selectedIndex === index}
              on:click={() => selectedIndex = index}
              on:keydown={e => e.key === 'Enter' && (selectedIndex = index)}
              tabindex="0" />
        {/each}
    
        <text x="0" y="0" text-anchor="middle" dominant-baseline="middle" font-size="10">Pie Chart</text>
    </svg>
    <ul class="legend">
        {#each data as d, index}
            <li style="--color: { colors(index) }">
                <span class="swatch"></span>
                {d.label} <em>({d.value})</em>
            </li>
        {/each}
    </ul>
</div>


<style>
    svg {
    max-width: 20em;
    margin-block: 2em;

    /* Do not clip shapes outside the viewBox */
    overflow: visible;
}
svg {
	max-width: 20em;
	margin-block: 2em;

    /* Do not clip shapes outside the viewBox */
    overflow: visible;
}

svg:has(path:hover) path:not(:hover) {
	opacity: 50%;
}

path {
	transition: 300ms;
}

.container{
    display: flex;
    align-items: center;
    gap: 0.6em;
}

.legend{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(8em, 1fr));
    border: 1px solid black;
    padding: 1em;
    margin: 1em;
    flex: 1;
}

.legend li{
    display:flex;
    align-items: center;
    gap: 0.6em;
}

.swatch{
    display: inline-block;
    background-color: var(--color);
    width: 1em;
    height: 1em;
}

/* When a path is selected, make all non-selected paths 50% opacity */
svg:has(.selected) path:not(.selected) {
   opacity: 50%;
}

.selected {
	--color: oklch(60% 45% 0) !important;
	
	&:is(path) {
		fill: var(--color) !important;
	}
	
	&:is(li) {
		color: var(--color);
	}
}

ul:has(.selected) li:not(.selected) {
	color: gray;
}

path:hover {
	opacity: 100% !important;
}




</style>
