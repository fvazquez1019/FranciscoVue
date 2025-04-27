<template>
    <div class="p-5 flex flex-column align-items-center gap-5">
      <!-- Top row -->
      <div class="flex flex-row flex-wrap gap-5 justify-content-center w-full" style="max-width: 1200px;">
        <Card style="flex: 1 1 350px; min-width: 300px;">
          <template #title>🎛️ Explore Music by Era & Genre</template>
          <template #content>
            <!-- Venn Diagram and setting slider to each circle then to genre/era -->
            <div class="venn-container relative" style="width: 100%; height: 300px;">
              <svg width="100%" height="300" ref="svgRef">
                <circle cx="275" cy="150" r="100" fill="#1db95422" stroke="#1db954" stroke-width="3" />
                <circle cx="375" cy="150" r="100" fill="#1db95422" stroke="#1db954" stroke-width="3" />
  
                <circle
                  :cx="eraCoords.x"
                  :cy="eraCoords.y"
                  r="8"
                  fill="#1db954"
                  class="cursor-pointer"
                  @mousedown.prevent="startDrag('era', $event)"
                />
                <circle
                  :cx="genreCoords.x"
                  :cy="genreCoords.y"
                  r="8"
                  fill="#1db954"
                  class="cursor-pointer"
                  @mousedown.prevent="startDrag('genre', $event)"
                />

                <text x="275" y="270" text-anchor="middle" font-size="14" fill="#1db954">{{ currentEra }}</text>
                <text x="375" y="270" text-anchor="middle" font-size="14" fill="#1db954">{{ currentGenre }}</text>
              </svg>
            </div>
          </template>
        </Card>
        <!-- Spotify embed w dynamic use for each genre era combo -->
        <Panel class="text-center" style="flex: 1 1 350px; min-width: 300px;">
          <template #header>
            Matching Track
          </template>
          <div v-if="matchedSong">
            <iframe
              style="border-radius:12px"
              :src="`https://open.spotify.com/embed/track/${matchedSong.spotifyId}?utm_source=generator`"
              width="100%"
              height="352"
              frameborder="0"
              allowfullscreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
          <div v-else>
            <p>Select an era and genre to explore music combinations.</p>
          </div>
        </Panel>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted, computed } from 'vue'
  import Panel from 'primevue/panel'
  import Card from 'primevue/card'
  
  // Basic slider logic
  const dragging = ref(null)
  const radius = 100
  const eraAngle = ref(0)
  const genreAngle = ref(0)
  const svgRef = ref(null)
  // eras and genres used
  const eraLabels = ['50s', '60s', '70s', '80s', '90s', '2000s', '2010s', '2020s']
  const genreLabels = ['Rock', 'Pop', 'Electronic', 'Hip-Hop', 'Jazz', 'Classical', 'Metal', 'Experimental']
  // circle help with slider and formatting genres/eras on circles
  const polarToCartesian = (cx, cy, r, angle) => {
    const rad = (angle - 90) * Math.PI / 180.0
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    }
  }
  
  const getAngleFromCoords = (x, y, cx, cy) => {
    const angle = (Math.atan2(y - cy, x - cx) * 180 / Math.PI + 90 + 360) % 360
    return angle
  }
  
  const getLabelFromAngle = (angle, labels, reverse = false) => {
    const slice = 360 / labels.length
    let index = Math.floor((angle % 360) / slice)
    if (reverse) {
      index = (labels.length - index) % labels.length
    }
    return labels[index]
  }
  
  const eraCoords = reactive({ x: 0, y: 0 })
  const genreCoords = reactive({ x: 0, y: 0 })
  
  const updateCoords = () => {
    Object.assign(eraCoords, polarToCartesian(275, 150, radius, eraAngle.value))
    Object.assign(genreCoords, polarToCartesian(375, 150, radius, genreAngle.value))
  }
  
  const currentEra = computed(() => getLabelFromAngle(eraAngle.value, eraLabels, true))
  const currentGenre = computed(() => getLabelFromAngle(genreAngle.value, genreLabels))
  
  // Song Data for every combo
  const SONG_DATA = {
  'Rock': {
    '50s': '2aAYLg4QVTOBVsP72lAyzE',
    '60s': '0uco0wQkB909zpPlHvu5Cc',
    '70s': '5HNCy40Ni5BZJFw1TKzRsC',
    '80s': '1FvDJ9KGxcqwv1utyPL3JZ',
    '90s': '0jmKzJmUEKNbC7eU8YfOiA',
    '2000s': '4wajJ1o7jWIg62YqpkHC7S',
    '2010s': '6SmV1Oo24nCZBPzIYkL4HZ',
    '2020s': '3AdXwuFn7j21HNiFMXvZXt',
  },
  'Pop': {
    '50s': '1GcPhT7osBb4LEJnQ0tmfj',
    '60s': '3G7tRC24Uh09Hmp1KZ7LQ2',
    '70s': '0GjEhVFGZW8afUYGChu3Rr',
    '80s': '1CgmY8fVN7kstVDZmsdM5k',
    '90s': '1Je1IMUlBXcx1Fz0WE7oPT',
    '2000s': '1AWQoqb9bSvzTjaLralEkT',
    '2010s': '6vt0I1cw1YmAIKDJvHVIM5',
    '2020s': '4Dvkj6JhhA12EX05fT7y2e',
  },
  'Electronic': {
    '50s': '6lVdwJCAAYQQB6R4jeJFEf',
    '60s': '4McWloMJ0F9ODgqieCH4mM',
    '70s': '6Qx7IRv8VmRTppmnks6fDm',
    '80s': '1R1vbkHj40yexphG1i7x27',
    '90s': '0lLCH4mtQQYp6ASyJqhzgN',
    '2000s': '7v9Q0dAb9t7h8gJOkcJHay',
    '2010s': '60wwxj6Dd9NJlirf84wr2c',
    '2020s': '41SwdQIX8Hy2u6fuEDgvWr',

  },
  'Hip-Hop':{
    '50s': '3ybVCPelXSWrKv2D2bQ0jp',
    '60s': '0VbpqlboEkGQ7Pu6juJljZ',
    '70s': '1iuwkFGrSgBmWb7deIACq2',
    '80s': '5lWwAQUep9RKuwtSJY41ab',
    '90s': '3T790QTg0ebUUk5tCRbtbN',
    '2000s': '41bIQPBE1lFN0mmw6Lmssz',
    '2010s': '77v9kYcrCZV615E0P9WMrD',
    '2020s': '5II9VQpQ8MGDWwBZfVyxTN',
  },
  'Jazz': {
    '50s': '1xicvSO4CJ2ymqYgpk7DFh',
    '60s': '6KknhggJ4EgpzlEDy19yWv',
    '70s': '7eEp1mm5xRfPMpilLFUKwX',
    '80s': '2nWHzbBWBOePUvAImQv2So',
    '90s': '1VzhfMEGIIkn5hFITMJzW1',
    '2000s': '7KMm1zF2QOTSw2t01IAFif',
    '2010s': '7e0j6jReCfN5KJkDNLHyHQ',
    '2020s': '3I6J7zLXCGDwqm0PaNKqWI',
  },
  'Classical': {
    '50s': '3tHx5hoOwO3Usy5RE8O9qZ',
    '60s': '37N37WJQvXqplFdCwkNgX3',
    '70s': '6DfT97NBB9xy0J40eJEU1j',
    '80s': '6cvIJ1zOcshUv0yCtcphaG',
    '90s': '7zHd9LxIZB8WKosSWN9Umj',
    '2000s': '56oReVXIfUO9xkX7pHmEU0',
    '2010s': '6pWgRkpqVfxnj3WuIcJ7WP',
    '2020s': '1yXOGKkU7D5WLgCXVRLlbC',
  },
  'Metal': {
    '50s': '3sLhMSePzxSrmxluIqeoAZ',
    '60s': '1cLfXnBwTFuRngRZfQeLof',
    '70s': '1Y373MqadDRtclJNdnUXVc',
    '80s': '4fiOTntQKr24p07FvQDHZE',
    '90s': '6DoXuH326aAYEN8CnlLmhP',
    '2010s': '68osIGtVjM7QWVe6pazLHj',
    '2020s': '0O26gtfjuscAOnQobjNPPL',
  },
  'Experimental': {
    '50s': '4E4QmKV8Zz04tOVv3TV440',
    '60s': '4A7U5MG1gtnEciBG9MxNP5',
    '70s': '6xIf2BR6qv3yNB6n22NP3a',
    '80s': '1tVAblkpwlHpALeyy0RpzU',
    '90s': '5QUxHs4p29dA8nOtYtBZdG',
    '2000s': '0x4i5CHGt57neMPfHj1m7n',
    '2010s': '27Wy3mCVRdW9ih3jFxRvtb',
    '2020s': '4ofUgPvThX5qfzlr0tOSBr',
  },
};
  
  //Logic to match sliders to the respective track
  const matchedSong = computed(() => {
    const genre = currentGenre.value
    const era = currentEra.value
    const spotifyId = SONG_DATA[genre]?.[era]
    if (spotifyId) {
      return { spotifyId }
    }
    return null
  })
  
  // slider logic
  const startDrag = (type, event) => {
    dragging.value = type
    window.addEventListener('mousemove', onDrag)
    window.addEventListener('mouseup', stopDrag)
  }
  
  const onDrag = (event) => {
    const rect = svgRef.value.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const cx = dragging.value === 'era' ? 275 : 375
    const cy = 150
    const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
    if (Math.abs(dist - radius) > 25) return
    const angle = getAngleFromCoords(x, y, cx, cy)
    if (dragging.value === 'era') {
      eraAngle.value = angle
    } else {
      genreAngle.value = angle
    }
    updateCoords()
  }
  
  const stopDrag = () => {
    dragging.value = null
    window.removeEventListener('mousemove', onDrag)
    window.removeEventListener('mouseup', stopDrag)
  }
  
  onMounted(updateCoords)
  </script>
  
  <style scoped>
  .venn-container {
    position: relative;
    overflow: hidden;
    background-color: transparent;
  }
  .cursor-pointer {
    cursor: grab;
    transition: all 0.2s ease;
  }
  .cursor-pointer:hover {
    r: 10;
  }
  </style>
  