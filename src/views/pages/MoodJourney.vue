<template>
    <div class="p-5">
      <div class="text-center mb-4">
        <h2 class="text-3xl font-bold">Music Mood Journey</h2>
        <p class="text-lg text-gray-600 mt-2 max-w-screen-md mx-auto">
          Create a musical journey that transitions between moods. Set your starting and ending emotions, and we'll craft a playlist that gradually takes you there.
        </p>
      </div>
  
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <template #title>Starting Point</template>
          <template #content>
            <div class="mb-4">
              <h3 class="font-medium mb-2">Select a mood to start with:</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Button class="p-button-rounded p-button-outlined" :class="{ 'p-button-info': startMood === 'Energetic' }" @click="startMood = 'Energetic'">Energetic</Button>
                <Button class="p-button-rounded p-button-outlined" :class="{ 'p-button-info': startMood === 'Calm' }" @click="startMood = 'Calm'">Calm</Button>
                <Button class="p-button-rounded p-button-outlined" :class="{ 'p-button-info': startMood === 'Happy' }" @click="startMood = 'Happy'">Happy</Button>
                <Button class="p-button-rounded p-button-outlined" :class="{ 'p-button-info': startMood === 'Melancholic' }" @click="startMood = 'Melancholic'">Melancholic</Button>
                <Button class="p-button-rounded p-button-outlined" :class="{ 'p-button-info': startMood === 'Focus' }" @click="startMood = 'Focus'">Focus</Button>
                <Button class="p-button-rounded p-button-outlined" :class="{ 'p-button-info': startMood === 'Dreamy' }" @click="startMood = 'Dreamy'">Dreamy</Button>
              </div>
            </div>
  
            <div>
              <h3 class="font-medium mb-2">Fine-tune parameters:</h3>
              <div class="mb-3">
                <label class="block text-sm mb-1">Energy</label>
                <Slider v-model="startEnergy" :min="0" :max="100" />
                <small>{{ startEnergy }}%</small>
              </div>
              <div class="mb-3">
                <label class="block text-sm mb-1">Tempo</label>
                <Slider v-model="startTempo" :min="60" :max="180" />
                <small>{{ startTempo }} BPM</small>
              </div>
            </div>
          </template>
        </Card>
  
        <Card>
          <template #title>End Point</template>
          <template #content>
            <div class="mb-4">
              <h3 class="font-medium mb-2">Select a mood to end with:</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Button class="p-button-rounded p-button-outlined" :class="{ 'p-button-info': endMood === 'Energetic' }" @click="endMood = 'Energetic'">Energetic</Button>
                <Button class="p-button-rounded p-button-outlined" :class="{ 'p-button-info': endMood === 'Calm' }" @click="endMood = 'Calm'">Calm</Button>
                <Button class="p-button-rounded p-button-outlined" :class="{ 'p-button-info': endMood === 'Happy' }" @click="endMood = 'Happy'">Happy</Button>
                <Button class="p-button-rounded p-button-outlined" :class="{ 'p-button-info': endMood === 'Melancholic' }" @click="endMood = 'Melancholic'">Melancholic</Button>
                <Button class="p-button-rounded p-button-outlined" :class="{ 'p-button-info': endMood === 'Focus' }" @click="endMood = 'Focus'">Focus</Button>
                <Button class="p-button-rounded p-button-outlined" :class="{ 'p-button-info': endMood === 'Dreamy' }" @click="endMood = 'Dreamy'">Dreamy</Button>
              </div>
            </div>
  
            <div>
              <h3 class="font-medium mb-2">Fine-tune parameters:</h3>
              <div class="mb-3">
                <label class="block text-sm mb-1">Energy</label>
                <Slider v-model="endEnergy" :min="0" :max="100" />
                <small>{{ endEnergy }}%</small>
              </div>
              <div class="mb-3">
                <label class="block text-sm mb-1">Tempo</label>
                <Slider v-model="endTempo" :min="60" :max="180" />
                <small>{{ endTempo }} BPM</small>
              </div>
            </div>
          </template>
        </Card>
      </div>
  
      <div class="text-center mb-5">
        <h3 class="font-medium mb-2">Journey Length:</h3>
        <div class="flex justify-center mb-2">
          <div class="w-64">
            <Slider v-model="journeyLength" :min="5" :max="30" />
          </div>
        </div>
        <small>{{ journeyLength }} tracks</small>
      </div>
  
      <div class="text-center mb-6">
        <Button label="Create Journey" icon="pi pi-music" class="p-button-lg" @click="createJourney" />
      </div>
  
      <Card v-if="journeyCreated">
        <template #title>Your Mood Journey</template>
        <template #content>
          <div v-if="loading" class="text-center p-5">
            <ProgressSpinner style="width:50px;height:50px" strokeWidth="3" />
            <p class="mt-3">Creating your journey...</p>
          </div>
          <div v-else>
            <div class="mb-4 p-3 bg-gray-100 rounded-lg">
              <div class="flex items-center mb-3">
                <div class="w-20 font-bold">Start:</div>
                <div>{{ startMood }} (Energy: {{ startEnergy }}%, Tempo: {{ startTempo }} BPM)</div>
              </div>
              <div class="flex items-center">
                <div class="w-20 font-bold">End:</div>
                <div>{{ endMood }} (Energy: {{ endEnergy }}%, Tempo: {{ endTempo }} BPM)</div>
              </div>
            </div>
  
            <div class="overflow-x-auto">
              <div class="flex mb-4 transition-all duration-500" style="min-width: max-content;">
                <div v-for="(track, index) in journeyTracks" :key="index" class="flex-none mx-1 transition-all duration-300" :style="{ width: '180px' }">
                  <div class="border rounded-lg overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
                    <div class="relative">
                      <img :src="track.albumCover" class="w-full h-40 object-cover" alt="Album Cover" />
                      <div class="absolute top-0 right-0 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-bl">
                        {{ index + 1 }}/{{ journeyTracks.length }}
                      </div>
                    </div>
                    <div class="p-2 flex-1 flex flex-col">
                      <h4 class="font-medium text-sm truncate">{{ track.name }}</h4>
                      <p class="text-xs text-gray-600 truncate">{{ track.artist }}</p>
                      <div class="mt-auto pt-2 flex justify-between items-center">
                        <div class="text-xs">
                          <div class="flex items-center">
                            <i class="pi pi-bolt text-yellow-500 mr-1" style="font-size: 10px;"></i>
                            <span>{{ track.energy }}%</span>
                          </div>
                          <div class="flex items-center">
                            <i class="pi pi-clock text-blue-500 mr-1" style="font-size: 10px;"></i>
                            <span>{{ track.tempo }} BPM</span>
                          </div>
                        </div>
                        <Button icon="pi pi-external-link" class="p-button-text p-button-sm p-button-rounded" @click="openTrack(track.spotifyUrl)" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <div class="text-center mt-4">
              <Button label="Generate New Journey" icon="pi pi-refresh" class="p-button-outlined" @click="resetJourney" />
            </div>
          </div>
        </template>
      </Card>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import Card from 'primevue/card';
  import Button from 'primevue/button';
  import Slider from 'primevue/slider';
  import ProgressSpinner from 'primevue/progressspinner';
  
  // State variables
  const startMood = ref('Energetic');
  const endMood = ref('Calm');
  const startEnergy = ref(80);
  const endEnergy = ref(30);
  const startTempo = ref(130);
  const endTempo = ref(90);
  const journeyLength = ref(12);
  const journeyCreated = ref(false);
  const loading = ref(false);
  const journeyTracks = ref([]);
  
  // Mock data - diverse selection of artists & songs
  const MOCK_TRACKS = [
    {
      name: "MONTERO (Call Me By Your Name)",
      artist: "Lil Nas X",
      albumCover: "https://i.scdn.co/image/ab67616d0000b273be82673b5f79d9658ec0a9fd",
      energy: 90,
      tempo: 138,
      spotifyUrl: "https://open.spotify.com/track/67NyZefOsBnLiQ77Gnrsye"
    },
    {
      name: "As It Was",
      artist: "Harry Styles",
      albumCover: "https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f0",
      energy: 85,
      tempo: 132,
      spotifyUrl: "https://open.spotify.com/track/4LRPiXqCikLlN15c3yImP7"
    },
    {
      name: "Unstoppable",
      artist: "Sia",
      albumCover: "https://i.scdn.co/image/ab67616d0000b273754b2fddebe7039fdb912837",
      energy: 82,
      tempo: 128,
      spotifyUrl: "https://open.spotify.com/track/1yvMUkIOTeUNtNWlWRgANS"
    },
    {
      name: "Levitating",
      artist: "Dua Lipa",
      albumCover: "https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49946",
      energy: 78,
      tempo: 124,
      spotifyUrl: "https://open.spotify.com/track/39LLxExYz6ewLAcYrzQQyP"
    },
    {
      name: "Blinding Lights",
      artist: "The Weeknd",
      albumCover: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
      energy: 73,
      tempo: 118,
      spotifyUrl: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b"
    },
    {
      name: "Bad Guy",
      artist: "Billie Eilish",
      albumCover: "https://cdn-images.dzcdn.net/images/cover/6630083f454d48eadb6a9b53f035d734/500x500.jpg",
      energy: 66,
      tempo: 113,
      spotifyUrl: "https://open.spotify.com/track/2Fxmhks0bxGSBdJ92vM42m"
    },
    {
      name: "Starboy",
      artist: "The Weeknd",
      albumCover: "https://i.scdn.co/image/ab67616d0000b273cb4ec52c48a6b071ed2ab6bc",
      energy: 60,
      tempo: 108,
      spotifyUrl: "https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB"
    },
    {
      name: "Redbone",
      artist: "Childish Gambino",
      albumCover: "https://i.scdn.co/image/ab67616d0000b2737b9e5a9d697bcb8bf86a83b4",
      energy: 53,
      tempo: 102,
      spotifyUrl: "https://open.spotify.com/track/3kxfsdsCpFgN412fpnW85Y"
    },
    {
      name: "Save Your Tears",
      artist: "The Weeknd",
      albumCover: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
      energy: 45,
      tempo: 97,
      spotifyUrl: "https://open.spotify.com/track/5QO79kh1waicV47BqGRL3g"
    },
    {
      name: "Everything I Wanted",
      artist: "Billie Eilish",
      albumCover: "https://upload.wikimedia.org/wikipedia/en/e/e6/Billie_Eilish_-_Everything_I_Wanted.png",
      energy: 38,
      tempo: 92,
      spotifyUrl: "https://open.spotify.com/track/3ZCTVFBt2Brf31RLEnCkWJ"
    },
    {
      name: "Exile",
      artist: "Taylor Swift ft. Bon Iver",
      albumCover: "https://i.scdn.co/image/ab67616d0000b273c288028c2592f400dd0b9233",
      energy: 32,
      tempo: 88,
      spotifyUrl: "https://open.spotify.com/track/4pvb0WLRcMtbPGmtejJJ6y"
    },
    {
      name: "When the Party's Over",
      artist: "Billie Eilish",
      albumCover: "https://upload.wikimedia.org/wikipedia/en/1/1f/Billie_Eilish_-_When_the_Party%27s_Over.png",
      energy: 25,
      tempo: 82,
      spotifyUrl: "https://open.spotify.com/track/43zdsphuZLzwA9k4DJhU0I"
    }
  ];
  
  // Functions
  const createJourney = () => {
    journeyCreated.value = true;
    loading.value = true;
    
    // Simulate API delay
    setTimeout(() => {
      // Generate journey by interpolating between moods
      generateJourneyTracks();
      loading.value = false;
    }, 1500);
  };
  
  const generateJourneyTracks = () => {
    // For demonstration, we'll adapt the mock data based on selected parameters
    journeyTracks.value = [];
    
    // Use a subset of mock tracks based on journey length
    const trackCount = Math.min(journeyLength.value, MOCK_TRACKS.length);
    
    // Calculate energy and tempo steps
    const energyStep = (endEnergy.value - startEnergy.value) / (trackCount - 1);
    const tempoStep = (endTempo.value - startTempo.value) / (trackCount - 1);
    
    for (let i = 0; i < trackCount; i++) {
      // Calculate target values for this step
      const targetEnergy = Math.round(startEnergy.value + energyStep * i);
      const targetTempo = Math.round(startTempo.value + tempoStep * i);
      
      // Find mock track with closest energy
      let track = { ...MOCK_TRACKS[i] };
      
      // Adjust the track to match the target parameters more closely
      const energyOffset = Math.min(Math.abs(track.energy - targetEnergy), 15);
      const tempoOffset = Math.min(Math.abs(track.tempo - targetTempo), 10);
      
      // Move the track's values closer to our targets
      track.energy = track.energy + (targetEnergy > track.energy ? energyOffset : -energyOffset);
      track.tempo = track.tempo + (targetTempo > track.tempo ? tempoOffset : -tempoOffset);
      
      journeyTracks.value.push(track);
    }
  };
  
  const openTrack = (url) => {
    if (url) window.open(url, '_blank');
  };
  const resetJourney = () => {
    journeyCreated.value = false;
    journeyTracks.value = [];
  };
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>