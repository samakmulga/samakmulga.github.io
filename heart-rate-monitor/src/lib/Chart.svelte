<script lang="ts">
import Chart from 'chart.js/auto';
// import { Chart } from "chart.js";
import { onMount } from "svelte";
import { config, type MyChart } from './data';
  
  export let chart: MyChart | null = null;
  let canvas;
  
  

  onMount(() => {
    chart = new Chart(canvas, config)
  })
  

</script>

<div>
  <canvas id="chart" bind:this={canvas}></canvas>
</div>

<style>
</style>
