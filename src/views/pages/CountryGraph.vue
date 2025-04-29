<!-- Header/ Top of Page -->
<template>
    <div class="p-5">
      <div class="text-center mb-4">
        <h2 class="text-3xl font-bold">Explore New Music by Country </h2>
        <p class="text-lg text-gray-600 mt-2 max-w-screen-md mx-auto">
          Discover how music varies across countries. Click a country name on the graph to hear a Spotify playlist that highlights some of the most unique and different music being consumed in these countries. This hypotheticlly remaps the countries of our world by the characteristics of their music. Calibration may be fuzzy.
        </p>
      </div>
  
      <Card>
        <template #title>Music Map</template>
        <template #content>
            
          <svg ref="chartRef" class="w-full" style="height: 600px;" />
        </template>
      </Card>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import Card from 'primevue/card'
  import * as d3 from 'd3'
  
  const chartRef = ref(null)
  const countries=
[
    { name: 'Albania', x: 311, y: 342, link: 'spotify:playlist:1HU1z3UI2QPVa49qNKdFFB' },
    { name: 'Algeria', x: 607, y: 298, link: 'spotify:playlist:492cpUlXMliIpoUd1g5vyS'},
    { name: 'Angola', x: 276, y: 407, link:  'spotify:playlist:05pM3r7BTv1jLga3x1djPR'},
    { name: 'Argentina', x: 640, y: 263, link: 'spotify:playlist:1JNlSYtK9Ycr9J6zCoiso8' },
    { name: 'Armenia', x: 846, y: 189, link: 'spotify:playlist:492cpUlXMliIpoUd1g5vyS'},
    { name: 'Australia', x: 370, y: 72, link: 'spotify:playlist:7lJzw9lsLV6DkZMNzDFapk'},
    { name: 'Austria', x: 555, y: 179, link: 'spotify:playlist:15onK4OoIHJf5PiyfgdcqJ'},
    { name: 'Azerbaijan', x: 880, y: 136, link: 'spotify:playlist:6JOgr43ZOZhqeYPM3Ax4xG'},
    { name: 'Bahamas', x: 556, y: 351, link: 'spotify:playlist:24wnQCUre9WBOKyR4NWONk'},
    { name: 'Bangladesh', x: 733, y: 182, link: 'spotify:playlist:48r8ImBkTAl32JtT7xI3DW'},
    { name: 'Barbados', x: 229, y: 379, link: 'spotify:playlist:3l8Nhp4GPTGS1yShqeYO4R'},
    { name: 'Belarus', x: 254, y: 107, link: 'spotify:playlist:1xD3EJHdvenjPkXTsTWvTq'},
    { name: 'Belgium', x: 385, y: 255, link: 'spotify:playlist:492cpUlXMliIpoUd1g5vyS'},
    { name: 'Bolivia', x: 568, y: 226, link: 'spotify:playlist:492cpUlXMliIpoUd1g5vyS'},
    { name: 'Brazil', x: 618, y: 252, link: 'spotify:playlist:1LpjAI96bFYXarffPpSNqO' },
    { name: 'Bulgaria', x: 420, y: 305, link: 'spotify:playlist:38jVzxI4RzC8WhlObnI8ix' },
    { name: 'Cameroon', x: 551, y: 428, link: 'spotify:playlist:1bLGzY09Nd3waT9utn8YCG' },
    { name: 'Canada', x: 425, y: 84, link: 'spotify:playlist:3sEimk1eBzK88JR9raxcx5' },
    { name: 'Chile', x: 494, y: 267, link: 'spotify:playlist:6va531z2naxJOv5wZ72nqL' },
    { name: 'China', x: 783, y: 138, link: 'spotify:playlist:799iOFx24XEjBoqZdaNxpg' },
    { name: 'Colombia', x: 420, y: 358, link: 'spotify:playlist:3NidMPY2uAos5da8NzNYLP' },
    { name: 'Congo', x: 632, y: 392, link: 'spotify:playlist:6y8CicoRdttrDr0inA5oio' },
    { name: 'Costa Rica', x: 553, y: 225, link: 'spotify:playlist:1WdExim8UAZZY24fhQd0ST' },
    { name: 'Ivory Coast', x: 276, y: 462, link: 'spotify:playlist:5MzBaDrnZHyYS1AiD1dHyP' },
    { name: 'Croatia', x: 359, y: 269, link: 'spotify:playlist:12HOe2nnHlIxOtf4idnzvw' },
    { name: 'Cyprus', x: 161, y: 251, link: 'spotify:playlist:7qB9EKc4CpGzl78qQGkkhT' },
    { name: 'Czech Republic', x: 592, y: 161, link: 'spotify:playlist:4dbDj0r5GL91SXEi5trmAc' },
    { name: 'Denmark', x: 414, y: 243, link: 'spotify:playlist:5YikEj5tYjqUs46v5SzHAv' },
    { name: 'Dominican Republic', x: 428, y: 465, link: 'spotify:playlist:0ScBxtraR106PpJ0LtCsTK' },
    { name: 'Ecuador', x: 334, y: 367, link: 'spotify:playlist:2m6pxy05gGAFHEA0fFQ1Iu' },
    { name: 'Egypt', x: 530, y: 292, link: 'spotify:playlist:5OnI63CWHzf5pnC52AU2wm' },
    { name: 'El Salvador', x: 416, y: 330, link: 'spotify:playlist:3VCgVlv2kK4DxJYy6yOBLk' },
    { name: 'England', x: 521, y: 255, link: 'spotify:user:glennpmcdonald:playlist:1m30k5Aw2DQARXkA3JGBcv' },
    { name: 'Estonia', x: 492, y: 131, link: 'spotify:playlist:6X9OUurCy9OtlDIA4Ju0iR' },
    { name: 'Ethiopia', x: 847, y: 300, link: 'spotify:playlist:6XiwqNMDe2G1QwGXlp7IV8' },
    { name: 'Faroe Islands', x: 702, y: 52, link: 'spotify:playlist:2Ik9KDXQGzGqJRVQdRhp3w' },
    { name: 'Finland', x: 386, y: 40, link: 'spotify:playlist:387z2vyyjBSvU22h2i2K5Z' },
    { name: 'France', x: 464, y: 293, link: 'spotify:playlist:30LbANK5P7y3sFK4FPFPlm' },
    { name: 'Germany', x: 157, y: 266, link: 'spotify:playlist:3uIQXxCfnUG3X5V8kETw76' },
    { name: 'Ghana', x: 491, y: 477, link: 'spotify:playlist:4nDEXUn13TjxJhYTNK8K6s' },
    { name: 'Greece', x: 375, y: 206, link: 'spotify:playlist:700pAJkkCseWqGZ6AnN3Ov' },
    { name: 'Guadeloupe', x: 316, y: 419, link: 'spotify:playlist:09LjQJSJ5Vzkoe04j8IA3S' },
    { name: 'Guatemala', x: 318, y: 330, link: 'spotify:playlist:1l0UuvftaJYUhNeveF1bTx' },
    { name: 'Guinea', x: 908, y: 385, link: 'spotify:playlist:2wu6xER8El0ZvDSWkkNfVP' },
    { name: 'Haiti', x: 520, y: 440, link: 'spotify:playlist:2lHdV1K0RiPFbXwv1nT6vu' },
    { name: 'Honduras', x: 390, y: 343, link: 'spotify:playlist:2TonmkL3J24alJ9K9IUG6r' },
    { name: 'Hong Kong', x: 675, y: 145, link: 'spotify:playlist:0Dcm5GLXy89r3pNmjjDOC3' },
    { name: 'Hungary', x: 346, y: 231, link: 'spotify:playlist:0ThTYUUanksqQrOYOznuBG' },
    { name: 'Iceland', x: 622, y: 85, link: 'spotify:playlist:1fEjc3atWkYVO4Vm78qo47' },
    { name: 'India', x: 732, y: 260, link: 'spotify:playlist:0h85PBTc5q8PAJ6O5AG4mp' },
    { name: 'Indonesia', x: 339, y: 176, link: 'spotify:playlist:20FjhJNHSsckv2KXPmsePm' },
    { name: 'Ireland', x: 789, y: 83, link: 'spotify:playlist:7uu2Ky0HjUy9XNUzn59Zs1' },
    { name: 'Israel', x: 304, y: 268, link: 'spotify:playlist:5RIXexl8cebRH6TJWtR7CT' },
    { name: 'Italy', x: 449, y: 155, link: 'spotify:playlist:1u1mDOkrhT2Gzfpmhrlr6z' },
    { name: 'Jamaica', x: 413, y: 530, link: 'spotify:playlist:7y5ygBOnRE6rWK34iQOTA2' },
    { name: 'Japan', x: 306, y: 33, link: 'spotify:playlist:5vE0V0NRwC6w9mszHs6BCc' },
    { name: 'Jordan', x: 301, y: 256, link: 'spotify:playlist:0Z7fjxojuW2MKzagp3FHAZ' },
    { name: 'Kenya', x: 538, y: 416, link: 'spotify:playlist:7dAycUbJ0mMxY92LyK2q79' },
    { name: 'Latvia', x: 447, y: 167, link: 'spotify:playlist:7KSq4j04HZR8EIz2u756iF' },
    { name: 'Lebanon', x: 518, y: 280, link: 'spotify:playlist:6p48hxKAWmF7f55GdO3QMM' },
    { name: 'Lithuania', x: 237, y: 258, link: 'spotify:playlist:1HDCmGMAeRKMDT9c2Ti397' },
    { name: 'Luxembourg', x: 587, y: 137, link: 'spotify:playlist:0jvdhWjOPU0llOtM92mx6k' },
    { name: 'Macedonia', x: 251, y: 295, link: 'spotify:playlist:3ciGDxlo0UTXnokzWyz5Cr' },
    { name: 'Malaysia', x: 455, y: 231, link: 'spotify:playlist:1MGQLIqcc09Bdko9KcbgjP' },
    { name: 'Mali', x: 953, y: 420, link: 'spotify:playlist:3xsmsgGQJgyj2nQqdbDsQN' },
    { name: 'Malta', x: 108, y: 221, link: 'spotify:playlist:4aw0Cij5Xa2yGYIfLvlSJd' },
    { name: 'Martinique', x: 428, y: 428, link: 'spotify:playlist:0HVWGKnQ7TrcQXmou5UgRl' },
    { name: 'Mexico', x: 518, y: 304, link: 'spotify:playlist:5rVmTdf4Hp0aemNurD0I7p' },
    { name: 'Morocco', x: 468, y: 346, link: 'spotify:playlist:5ZdTBcguzjkaZyTpf6S4jz' },
    { name: 'Nepal', x: 787, y: 125, link: 'spotify:playlist:79KLeGxuWzAXJh7GxwQOe9' },
    { name: 'Netherlands', x: 349, y: 219, link: 'spotify:playlist:78OgGldxVRek8jEdRA5d5k' },
    { name: 'New Zealand', x: 557, y: 116, link: 'spotify:playlist:3PKHhBQqNSnNVyVN5UNj1P' },
    { name: 'Nigeria', x: 429, y: 391, link: 'spotify:playlist:0wXvFlVKIVlnYBqjZpym9x' },
    { name: 'Norway', x: 582, y: 30, link: 'spotify:playlist:3mDhLFh4sYxAO8AcF1Rla4' },
    { name: 'Pakistan', x: 681, y: 247, link: 'spotify:playlist:75UDM77fMULUpLakW3WbRI' },
    { name: 'Panama', x: 366, y: 355, link: 'spotify:playlist:5frNWFwfRWkpzglrWlszgD' },
    { name: 'Paraguay', x: 518, y: 363, link: 'spotify:playlist:60IOAMDkYTX4jnNDCttf3r' },
    { name: 'Peru', x: 471, y: 318, link: 'spotify:playlist:5aoDd24wcJ3Nk09A4JaEQW' },
    { name: 'Philippines', x: 596, y: 201, link: 'spotify:playlist:7IJEAEKmxNvaTkalKa9b3w' },
    { name: 'Poland', x: 435, y: 206, link: 'spotify:playlist:7r5p8gfpzb6b31wsXdK151' },
    { name: 'Portugal', x: 502, y: 243, link: 'spotify:playlist:20NJSdcbvHJoVKUHpM8ImF' },
    { name: 'Puerto Rico', x: 501, y: 376, link: 'spotify:playlist:4e9inS1LRBEsvn24RumtHA' },
    { name: 'Republic of the Congo', x: 692, y: 379, link: 'spotify:playlist:6y8CicoRdttrDr0inA5oio' },
    { name: 'Reunion', x: 605, y: 365, link: 'spotify:playlist:4EAr2NTBNWA5pjvnGhcLtU' },
    { name: 'Romania', x: 237, y: 345, link: 'spotify:playlist:4A3CV9s0smcAyzw0JIococ' },
    { name: 'Russia', x: 27, y: 321, link: 'spotify:playlist:2KTpcnVW1JzR0zVMDsKc7b' },
    { name: 'Scotland', x: 642, y: 186, link: 'spotify:user:glennpmcdonald:playlist:0XTr5F2t1oQjo6wKFNSc2V' },
    { name: 'Senegal', x: 816, y: 453, link: 'spotify:playlist:1t9HBQ3YsSUThKOpTrAi7l' },
    { name: 'Serbia', x: 222, y: 283, link: 'spotify:playlist:7q7UflMI48tCD7dK9IDRGD' },
    { name: 'Singapore', x: 640, y: 125, link: 'spotify:playlist:6Vuq0JEp9JdqaDQDZCD7Ww' },
    { name: 'Slovakia', x: 481, y: 219, link: 'spotify:playlist:7uMlljqSO7lebq9cTYK6mP' },
    { name: 'Slovenia', x: 318, y: 305, link: 'spotify:playlist:0exsD9x1wytJXSEjQrZIrF' },
    { name: 'South Africa', x: 371, y: 293, link: 'spotify:playlist:3HUf7D232aGUFHQc3guG5W' },
    { name: 'South Korea', x: 434, y: 268, link: 'spotify:playlist:07IjOdjm5muxnAdlvnjPSK' },
    { name: 'Spain', x: 448, y: 256, link: 'spotify:playlist:5uLCSCNjaIeFZ0735SO9qp' },
    { name: 'Sri Lanka', x: 593, y: 321, link: 'spotify:playlist:78jbUTdh5X5qe72rikqrxS' },
    { name: 'Sweden', x: 351, y: 53, link: 'spotify:playlist:3I2LCVKTjlEXObg7gWP6QT' },
    { name: 'Switzerland', x: 401, y: 281, link: 'spotify:playlist:7kC0FPzb5V2DXYj5bwo4rs' },
    { name: 'Taiwan', x: 604, y: 146, link: 'spotify:playlist:11WGZRMBLgOrzqEBawOqmv' },
    { name: 'Tanzania', x: 769, y: 362, link: 'spotify:playlist:33JnwuPXfniEPC9uajz92x' },
    { name: 'Thailand', x: 320, y: 244, link: 'spotify:playlist:0OnCFJJiMgpTLoaXKnJeSt' },
    { name: 'Trinidad and Tobago', x: 480, y: 403, link: 'spotify:playlist:7kLbQQaYrdGqMMrFq1h3lX' },
    { name: 'Tunisia', x: 385, y: 379, link: 'spotify:playlist:5UtcHXCxFGEocoTJ0FcUr1' },
    { name: 'Turkey', x: 603, y: 214, link: 'spotify:playlist:3aUL7eDo2LrJZCNRhbMuHO' },
    { name: 'US Virgin Islands', x: 467, y: 452, link: 'spotify:playlist:51Sqv8qHPrYUyZmH2wkB0b' },
    { name: 'Uganda', x: 462, y: 416, link: 'spotify:playlist:4VmnP5XRrduSEjKwaRBBMi' },
    { name: 'Ukraine', x: 162, y: 277, link: 'spotify:playlist:6oziyEln5ewdXPY3OGYS3p' },
    { name: 'United Arab Emirates', x: 177, y: 317, link: 'spotify:playlist:11QSIC8Hx2PMf9nP5LjPge' },
    { name: 'United Kingdom', x: 371, y: 100, link: 'spotify:playlist:6xFfZQbqEDWOPWk0KQfOZ8' },
    { name: 'United States', x: 408, y: 193, link: 'spotify:playlist:5aBYdWoiTtQQRkdQv44Gnf' },
    { name: 'Uruguay', x: 637, y: 309, link: 'spotify:playlist:6U0nDP33FvVgmOMda9yNzt' },
    { name: 'Venezuela', x: 513, y: 330, link: 'spotify:playlist:0iVVoZLzPxbz4m4lpsdVql' },
    { name: 'Vietnam', x: 770, y: 150, link: 'spotify:playlist:0vgprAMTN70NTnOq9lKQB5' },
    { name: 'Zimbabwe', x: 642, y: 279, link: 'spotify:playlist:7u8k030b49ia3dlJqMqf52' }
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
  
    const xScale = d3.scaleLinear().domain([0, 1000]).range([0, innerWidth])
    const yScale = d3.scaleLinear().domain([0, 550]).range([innerHeight, 0])
  
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
  