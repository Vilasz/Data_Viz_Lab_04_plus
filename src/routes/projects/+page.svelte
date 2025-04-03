<svelte:head>
  <title>Projects</title>
</svelte:head>

<script>

import Pie from '$lib/Pie.svelte';
import projects from "$lib/projects.json";
import Project from "$lib/Project.svelte";
import * as d3 from 'd3';

// let pieData = [
//     { value: 1, label: "apples" },
//     { value: 2, label: "oranges" },
//     { value: 3, label: "mangos" },
//     { value: 4, label: "pears" },
//     { value: 5, label: "limes" },
//     { value: 5, label: "cherries" }
// ];
let query = "";

let rolledData = d3.rollups(projects, v => v.length, d => d.year);

// Make sure the variable definition is *outside* the block
let pieData;

    $: {
        // Initialize to an empty object every time this runs
        pieData = {};
        
        // Calculate rolledData and pieData based on filteredProjects here
        let rolledData = d3.rollups(filteredProjects, v => v.length, d => d.year);

        // We don't need 'let' anymore since we already defined pieData
        pieData = rolledData.map(([year, count]) => {
            return { value: count, label: year };
        });
    }

// let filteredProjects;
$: filteredProjects = projects.filter(project => {
    let values = Object.values(project).join("\n").toLowerCase();
    return values.includes(query.toLowerCase());
});






</script>

<!-- Navigation menu: -->
<h1>Projects</h1>
<Pie data={pieData}/>

<input type="search" bind:value={query} aria-label="Search projects" placeholder="🔍 Search projects..." />




<div class="projects">

    <article>
        <h2>Lorem ipsum dolor</h2>
        <img src="https://www.svgrepo.com/show/340721/no-image.svg" alt="No image">
        <p>text</p>
    </article>
    <article>
        <h2>Lorem ipsum dolor</h2>
        <img src="https://www.svgrepo.com/show/340721/no-image.svg" alt="No image">
        <p>Text</p>
    </article>
    <article>
        <h2>Lorem ipsum dolor</h2>
        <img src="https://www.svgrepo.com/show/340721/no-image.svg" alt="No image">
        <p>text</p>
    </article>
    <article>
        <h2>Lorem ipsum dolor</h2>
        <img src="https://www.svgrepo.com/show/340721/no-image.svg" alt="No image">
        <p>text</p>
    </article>
    <article>
        <h2>Lorem ipsum dolor</h2>
        <img src="https://www.svgrepo.com/show/340721/no-image.svg" alt="No image">
        <p>text</p>
    </article>
    <article>
        <h2>Lorem ipsum dolor</h2>
        <img src="https://www.svgrepo.com/show/340721/no-image.svg" alt="No image">
        <p>text</p>
    </article>
</div>

