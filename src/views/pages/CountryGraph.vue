<template>
    <div class="p-5">
      <div class="text-center mb-4">
        <h2 class="text-3xl font-bold">Explore New Music by Country </h2>
        <p class="text-lg text-gray-600 mt-2 max-w-screen-md mx-auto">
          Discover how music varies across countries. Click a country name on the graph to hear a Spotify playlist taht highlight some of the most unique and different music being consumed in these countries. This hypotheticlly remaps the countries of our world by the characteristics of their music.
        </p>
      </div>
  
      <Card>
        <template #title>Music Map</template>
        <template #content>
            
          <svg ref="chartRef" class="w-full" style="height: 400px;" />
        </template>
      </Card>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import Card from 'primevue/card'
  import * as d3 from 'd3'
  
  const chartRef = ref(null)
  
  const countries = [
    { name: 'Argentina', x: 360, y: 180, link: 'spotify:playlist:1JNlSYtK9Ycr9J6zCoiso8' },
    { name: 'Brazil', x: 338, y: 200, link: 'spotify:playlist:1LpjAI96bFYXarffPpSNqO' },
    { name: 'Canada', x: 220, y: 357, link: 'spotify:playlist:3sEimk1eBzK88JR9raxcx5' },
    { name: 'Japan', x: 145, y: 390, link: 'spotify:playlist:5vE0V0NRwC6w9mszHs6BCc' },
    { name: 'Nigeria', x: 215, y: 110, link: 'spotify:playlist:0wXvFlVKIVlnYBqjZpym9x' },
    { name: 'United States', x: 200, y: 258, link: 'spotify:playlist:5aBYdWoiTtQQRkdQv44Gnf' },
  ]
  
  const goToPlaylist = (link) => {
    if (link) window.open(link, '_blank')
  }
  
  onMounted(() => {
    const svg = d3.select(chartRef.value)
    const width = chartRef.value.clientWidth
    const height = 400
  
    const margin = { top: 20, right: 30, bottom: 30, left: 40 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
  
    svg.selectAll('*').remove()
  
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
  
    const xScale = d3.scaleLinear().domain([0, 600]).range([0, innerWidth])
    const yScale = d3.scaleLinear().domain([0, 400]).range([innerHeight, 0])
  
    // Country labels as scatter plot points
    g.selectAll('text.country')
      .data(countries)
      .enter()
      .append('text')
      .attr('x', d => xScale(d.x))
      .attr('y', d => yScale(d.y))
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('class', 'country-label')
      .text(d => d.name)
      .style('fill', '#42b883')
      .style('font-size', '14px')
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        goToPlaylist(d.link)
      })
  
    // Axis labels
    // Top Center (more dense/atmospheric)
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', margin.top - 5)
    .attr('text-anchor', 'middle')
    .text('Dense/Ambient')
    .style('font-size', '12px')
    .style('fill', '#999')

  // Bottom Center - Bouncy
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', height - 5)
    .attr('text-anchor', 'middle')
    .text('Bouncier')
    .style('font-size', '12px')
    .style('fill', '#999')

  // Left Center - Mencahnical/Artificial/Electric
  svg.append('text')
    .attr('x', 10)
    .attr('y', height / 2)
    .attr('text-anchor', 'middle')
    .attr('transform', `rotate(-90, 10, ${height / 2})`)
    .text('Mechanical/Electric')
    .style('font-size', '12px')
    .style('fill', '#999')

  // Right Center - Organic
  svg.append('text')
    .attr('x', width - 10)
    .attr('y', height / 2)
    .attr('text-anchor', 'middle')
    .attr('transform', `rotate(-90, ${width - 10}, ${height / 2})`)
    .text('Organic/Pure')
    .style('font-size', '12px')
    .style('fill', '#999')

  })
  </script>
  
  <style scoped>
  .country-label:hover {
    fill: #10b981;
    font-weight: bold;
  }
  </style>
  