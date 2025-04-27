<!-- Header/ Top of Page -->
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
    { name: 'Albania', x: 1, y: 1, link: 'spotify:playlist:1HU1z3UI2QPVa49qNKdFFB' },
    { name: 'Algeria', x: 1, y: 1, link: 'spotify:playlist:492cpUlXMliIpoUd1g5vyS'},
    { name: 'Angola', x: 1, y: 1, link:  'spotify:playlist:05pM3r7BTv1jLga3x1djPR'},
    { name: 'Argentina', x: 360, y: 180, link: 'spotify:playlist:1JNlSYtK9Ycr9J6zCoiso8' },
    { name: 'Armemia', x: 1, y: 1, link: 'spotify:playlist:492cpUlXMliIpoUd1g5vyS'},
    { name: 'Austrailia', x: 1, y: 1, link: 'spotify:playlist:7lJzw9lsLV6DkZMNzDFapk'},
    { name: 'Austria', x: 1, y: 1, link: 'spotify:playlist:15onK4OoIHJf5PiyfgdcqJ'},
    { name: 'Azerbaijan', x: 1, y: 1, link: 'spotify:playlist:6JOgr43ZOZhqeYPM3Ax4xG'},
    { name: 'Bahamas', x: 1, y: 1, link: 'spotify:playlist:24wnQCUre9WBOKyR4NWONk'},
    { name: 'Bangladesh', x: 1, y: 1, link: 'spotify:playlist:48r8ImBkTAl32JtT7xI3DW'},
    { name: 'Barbados', x: 1, y: 1, link: 'spotify:playlist:3l8Nhp4GPTGS1yShqeYO4R'},
    { name: 'Belarus', x: 1, y: 1, link: 'spotify:playlist:1xD3EJHdvenjPkXTsTWvTq'},
    { name: 'Belgium', x: 1, y: 1, link: 'spotify:playlist:492cpUlXMliIpoUd1g5vyS'},
    { name: 'Bolivia', x: 1, y: 1, link: 'spotify:playlist:492cpUlXMliIpoUd1g5vyS'},
    { name: 'Brazil', x: 338, y: 200, link: 'spotify:playlist:1LpjAI96bFYXarffPpSNqO' },
    { name: 'Bulgaria', x: 388, y: 276, link: 'spotify:playlist:38jVzxI4RzC8WhlObnI8ix' },
    { name: 'Cameroon', x: 511, y: 398, link: 'spotify:playlist:1bLGzY09Nd3waT9utn8YCG' },
    { name: 'Canada', x: 392, y: 54, link: 'spotify:playlist:3sEimk1eBzK88JR9raxcx5' },
    { name: 'Chile', x: 469, y: 238, link: 'spotify:playlist:6va531z2naxJOv5wZ72nqL' },
    { name: 'China', x: 757, y: 108, link: 'spotify:playlist:799iOFx24XEjBoqZdaNxpg' },
    { name: 'Colombia', x: 383, y: 328, link: 'spotify:playlist:3NidMPY2uAos5da8NzNYLP' },
    { name: 'Congo', x: 603, y: 361, link: 'spotify:playlist:6y8CicoRdttrDr0inA5oio' },
    { name: 'Costa Rica', x: 513, y: 196, link: 'spotify:playlist:1WdExim8UAZZY24fhQd0ST' },
    { name: 'Ivory Coast', x: 228, y: 432, link: 'spotify:playlist:5MzBaDrnZHyYS1AiD1dHyP' },
    { name: 'Croatia', x: 326, y: 238, link: 'spotify:playlist:12HOe2nnHlIxOtf4idnzvw' },
    { name: 'Cyprus', x: 131, y: 221, link: 'spotify:playlist:7qB9EKc4CpGzl78qQGkkhT' },
    { name: 'Czech Republic', x: 562, y: 131, link: 'spotify:playlist:4dbDj0r5GL91SXEi5trmAc' },
    { name: 'Denmark', x: 377, y: 213, link: 'spotify:playlist:5YikEj5tYjqUs46v5SzHAv' },
    { name: 'Dominican Republic', x: 361, y: 434, link: 'spotify:playlist:0ScBxtraR106PpJ0LtCsTK' },
    { name: 'Ecuador', x: 301, y: 337, link: 'spotify:playlist:2m6pxy05gGAFHEA0fFQ1Iu' },
    { name: 'Egypt', x: 503, y: 262, link: 'spotify:playlist:5OnI63CWHzf5pnC52AU2wm' },
    { name: 'El Salvador', x: 376, y: 300, link: 'spotify:playlist:3VCgVlv2kK4DxJYy6yOBLk' },
    { name: 'England', x: 491, y: 225, link: 'spotify:user:glennpmcdonald:playlist:1m30k5Aw2DQARXkA3JGBcv' },
    { name: 'Estonia', x: 462, y: 101, link: 'spotify:playlist:6X9OUurCy9OtlDIA4Ju0iR' },
    { name: 'Ethiopia', x: 817, y: 270, link: 'spotify:playlist:6XiwqNMDe2G1QwGXlp7IV8' },
    { name: 'Faroe Islands', x: 656, y: 22, link: 'spotify:playlist:2Ik9KDXQGzGqJRVQdRhp3w' },
    { name: 'Finland', x: 356, y: 10, link: 'spotify:playlist:387z2vyyjBSvU22h2i2K5Z' },
    { name: 'France', x: 434, y: 263, link: 'spotify:playlist:30LbANK5P7y3sFK4FPFPlm' },
    { name: 'Germany', x: 117, y: 233, link: 'spotify:playlist:3uIQXxCfnUG3X5V8kETw76' },
    { name: 'Ghana', x: 464, y: 447, link: 'spotify:playlist:4nDEXUn13TjxJhYTNK8K6s' },
    { name: 'Greece', x: 345, y: 176, link: 'spotify:playlist:700pAJkkCseWqGZ6AnN3Ov' },
    { name: 'Guadeloupe', x: 271, y: 389, link: 'spotify:playlist:09LjQJSJ5Vzkoe04j8IA3S' },
    { name: 'Guatemala', x: 278, y: 300, link: 'spotify:playlist:1l0UuvftaJYUhNeveF1bTx' },
    { name: 'Guinea', x: 878, y: 355, link: 'spotify:playlist:2wu6xER8El0ZvDSWkkNfVP' },
    { name: 'Haiti', x: 497, y: 410, link: 'spotify:playlist:2lHdV1K0RiPFbXwv1nT6vu' },
    { name: 'Honduras', x: 354, y: 313, link: 'spotify:playlist:2TonmkL3J24alJ9K9IUG6r' },
    { name: 'Hong Kong', x: 633, y: 114, link: 'spotify:playlist:0Dcm5GLXy89r3pNmjjDOC3' },
    { name: 'Hungary', x: 312, y: 201, link: 'spotify:playlist:0ThTYUUanksqQrOYOznuBG' },
    { name: 'Iceland', x: 592, y: 55, link: 'spotify:playlist:1fEjc3atWkYVO4Vm78qo47' },
    { name: 'India', x: 709, y: 230, link: 'spotify:playlist:0h85PBTc5q8PAJ6O5AG4mp' },
    { name: 'Indonesia', x: 302, y: 146, link: 'spotify:playlist:20FjhJNHSsckv2KXPmsePm' },
    { name: 'Ireland', x: 759, y: 53, link: 'spotify:playlist:7uu2Ky0HjUy9XNUzn59Zs1' },
    { name: 'Israel', x: 274, y: 238, link: 'spotify:playlist:5RIXexl8cebRH6TJWtR7CT' },
    { name: 'Italy', x: 442, y: 125, link: 'spotify:playlist:1u1mDOkrhT2Gzfpmhrlr6z' },
    { name: 'Jamaica', x: 383, y: 500, link: 'spotify:playlist:7y5ygBOnRE6rWK34iQOTA2' },
    { name: 'Japan', x: 282, y: 3, link: 'spotify:playlist:5vE0V0NRwC6w9mszHs6BCc' },
    { name: 'Jordan', x: 271, y: 226, link: 'spotify:playlist:0Z7fjxojuW2MKzagp3FHAZ' },
    { name: 'Kenya', x: 512, y: 386, link: 'spotify:playlist:7dAycUbJ0mMxY92LyK2q79' },
    { name: 'Latvia', x: 421, y: 137, link: 'spotify:playlist:7KSq4j04HZR8EIz2u756iF' },
    { name: 'Lebanon', x: 483, y: 250, link: 'spotify:playlist:6p48hxKAWmF7f55GdO3QMM' },
    { name: 'Lithuania', x: 201, y: 228, link: 'spotify:playlist:1HDCmGMAeRKMDT9c2Ti397' },
    { name: 'Luxembourg', x: 543, y: 107, link: 'spotify:playlist:0jvdhWjOPU0llOtM92mx6k' },
    { name: 'Macedonia', x: 211, y: 265, link: 'spotify:playlist:3ciGDxlo0UTXnokzWyz5Cr' },
    { name: 'Malaysia', x: 423, y: 201, link: 'spotify:playlist:1MGQLIqcc09Bdko9KcbgjP' },
    { name: 'Mali', x: 931, y: 390, link: 'spotify:playlist:3xsmsgGQJgyj2nQqdbDsQN' },
    { name: 'Malta', x: 83, y: 191, link: 'spotify:playlist:4aw0Cij5Xa2yGYIfLvlSJd' },
    { name: 'Martinique', x: 388, y: 398, link: 'spotify:playlist:0HVWGKnQ7TrcQXmou5UgRl' },
    { name: 'Mexico', x: 488, y: 274, link: 'spotify:playlist:5rVmTdf4Hp0aemNurD0I7p' },
    { name: 'Morocco', x: 433, y: 316, link: 'spotify:playlist:5ZdTBcguzjkaZyTpf6S4jz' },
    { name: 'Nepal', x: 759, y: 95, link: 'spotify:playlist:79KLeGxuWzAXJh7GxwQOe9' },
    { name: 'Netherlands', x: 302, y: 189, link: 'spotify:playlist:78OgGldxVRek8jEdRA5d5k' },
    { name: 'New Zealand', x: 508, y: 86, link: 'spotify:playlist:3PKHhBQqNSnNVyVN5UNj1P' },
    { name: 'Nigeria', x: 389, y: 361, link: 'spotify:playlist:0wXvFlVKIVlnYBqjZpym9x' },
    { name: 'Norway', x: 548, y: 0, link: 'spotify:playlist:3mDhLFh4sYxAO8AcF1Rla4' },
    { name: 'Pakistan', x: 651, y: 217, link: 'spotify:playlist:75UDM77fMULUpLakW3WbRI' },
    { name: 'Panama', x: 330, y: 325, link: 'spotify:playlist:5frNWFwfRWkpzglrWlszgD' },
    { name: 'Paraguay', x: 484, y: 333, link: 'spotify:playlist:60IOAMDkYTX4jnNDCttf3r' },
    { name: 'Peru', x: 448, y: 288, link: 'spotify:playlist:5aoDd24wcJ3Nk09A4JaEQW' },
    { name: 'Philippines', x: 556, y: 171, link: 'spotify:playlist:7IJEAEKmxNvaTkalKa9b3w' },
    { name: 'Poland', x: 405, y: 176, link: 'spotify:playlist:7r5p8gfpzb6b31wsXdK151' },
    { name: 'Portugal', x: 470, y: 213, link: 'spotify:playlist:20NJSdcbvHJoVKUHpM8ImF' },
    { name: 'Puerto Rico', x: 458, y: 346, link: 'spotify:playlist:4e9inS1LRBEsvn24RumtHA' },
    { name: 'Republic of the Congo', x: 619, y: 349, link: 'spotify:playlist:6y8CicoRdttrDr0inA5oio' },
    { name: 'Reunion', x: 571, y: 335, link: 'spotify:playlist:4EAr2NTBNWA5pjvnGhcLtU' },
    { name: 'Romania', x: 202, y: 315, link: 'spotify:playlist:4A3CV9s0smcAyzw0JIococ' },
    { name: 'Russia', x: 0, y: 291, link: 'spotify:playlist:2KTpcnVW1JzR0zVMDsKc7b' },
    { name: 'Scotland', x: 610, y: 159, link: 'spotify:user:glennpmcdonald:playlist:0XTr5F2t1oQjo6wKFNSc2V' },
    { name: 'Senegal', x: 785, y: 423, link: 'spotify:playlist:1t9HBQ3YsSUThKOpTrAi7l' },
    { name: 'Serbia', x: 195, y: 253, link: 'spotify:playlist:7q7UflMI48tCD7dK9IDRGD' },
    { name: 'Singapore', x: 603, y: 95, link: 'spotify:playlist:6Vuq0JEp9JdqaDQDZCD7Ww' },
    { name: 'Slovakia', x: 448, y: 189, link: 'spotify:playlist:7uMlljqSO7lebq9cTYK6mP' },
    { name: 'Slovenia', x: 285, y: 275, link: 'spotify:playlist:0exsD9x1wytJXSEjQrZIrF' },
    { name: 'South Africa', x: 341, y: 263, link: 'spotify:playlist:3HUf7D232aGUFHQc3guG5W' },
    { name: 'South Korea', x: 384, y: 238, link: 'spotify:playlist:07IjOdjm5muxnAdlvnjPSK' },
    { name: 'Spain', x: 423, y: 226, link: 'spotify:playlist:5uLCSCNjaIeFZ0735SO9qp' },
    { name: 'Sri Lanka', x: 557, y: 291, link: 'spotify:playlist:78jbUTdh5X5qe72rikqrxS' },
    { name: 'Sweden', x: 317, y: 23, link: 'spotify:playlist:3I2LCVKTjlEXObg7gWP6QT' },
    { name: 'Switzerland', x: 359, y: 251, link: 'spotify:playlist:7kC0FPzb5V2DXYj5bwo4rs' },
    { name: 'Taiwan', x: 571, y: 119, link: 'spotify:playlist:11WGZRMBLgOrzqEBawOqmv' },
    { name: 'Tanzania', x: 736, y: 332, link: 'spotify:playlist:33JnwuPXfniEPC9uajz92x' },
    { name: 'Thailand', x: 286, y: 214, link: 'spotify:playlist:0OnCFJJiMgpTLoaXKnJeSt' },
    { name: 'Trinidad and Tobago', x: 414, y: 373, link: 'spotify:playlist:7kLbQQaYrdGqMMrFq1h3lX' },
    { name: 'Tunisia', x: 355, y: 349, link: 'spotify:playlist:5UtcHXCxFGEocoTJ0FcUr1' },
    { name: 'Turkey', x: 576, y: 184, link: 'spotify:playlist:3aUL7eDo2LrJZCNRhbMuHO' },
    { name: 'US Virgin Islands', x: 431, y: 422, link: 'spotify:playlist:51Sqv8qHPrYUyZmH2wkB0b' },
    { name: 'Uganda', x: 429, y: 386, link: 'spotify:playlist:4VmnP5XRrduSEjKwaRBBMi' },
    { name: 'Ukraine', x: 129, y: 247, link: 'spotify:playlist:6oziyEln5ewdXPY3OGYS3p' },
    { name: 'United Arab Emirates', x: 144, y: 287, link: 'spotify:playlist:11QSIC8Hx2PMf9nP5LjPge' },
    { name: 'United Kingdom', x: 299, y: 68, link: 'spotify:playlist:6xFfZQbqEDWOPWk0KQfOZ8' },
    { name: 'United States', x: 338, y: 158, link: 'spotify:playlist:5aBYdWoiTtQQRkdQv44Gnf' },
    { name: 'Uruguay', x: 605, y: 279, link: 'spotify:playlist:6U0nDP33FvVgmOMda9yNzt' },
    { name: 'Venezuela', x: 476, y: 300, link: 'spotify:playlist:0iVVoZLzPxbz4m4lpsdVql' },
    { name: 'Vietnam', x: 737, y: 120, link: 'spotify:playlist:0vgprAMTN70NTnOq9lKQB5' },
    { name: 'Zimbabwe', x: 602, y: 249, link: 'spotify:playlist:7u8k030b49ia3dlJqMqf52' },
  ]
  //allows opening playlists
  const goToPlaylist = (link) => {
    if (link) window.open(link, '_blank')
  }
  // Scaling of scatter plot
  onMounted(() => {
    const svg = d3.select(chartRef.value)
    const width = chartRef.value.clientWidth
    const height = 500
  
    const margin = { top: 20, right: 30, bottom: 30, left: 40 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
  
    svg.selectAll('*').remove()
  
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
  
    const xScale = d3.scaleLinear().domain([0, 700]).range([0, innerWidth])
    const yScale = d3.scaleLinear().domain([0, 500]).range([innerHeight, 0])
  
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
  