<template>
    <div class="card">
      <Toast />
      <ProgressBar v-if="loading" mode="indeterminate" />
      
      <div v-if="!loading" class="grid">
        <!-- Header with controls -->
        <div class="col-12">
          <div class="flex justify-content-between align-items-center mb-3">
            <h2>Your Music Taste Map</h2>
            <span class="p-buttonset">
              <Button icon="pi pi-refresh" label="Refresh" @click="fetchData" />
              <Button icon="pi pi-download" label="Export" @click="exportChart" />
            </span>
          </div>
          <Divider />
        </div>
        
        <!-- Filters -->
        <div class="col-12 mb-3">
          <Panel header="Filters & Controls" :toggleable="true" class="mb-3">
            <div class="grid">
              <div class="col-12 md:col-4">
                <h4>Time Range</h4>
                <SelectButton v-model="timeRange" :options="timeRangeOptions" @change="fetchData" />
              </div>
              <div class="col-12 md:col-4">
                <h4>Minimum Energy</h4>
                <Slider v-model="minEnergy" :min="0" :max="1" :step="0.1" @change="filterPoints" />
                <small>{{ minEnergy.toFixed(1) }}</small>
              </div>
              <div class="col-12 md:col-4">
                <h4>Minimum Danceability</h4>
                <Slider v-model="minDanceability" :min="0" :max="1" :step="0.1" @change="filterPoints" />
                <small>{{ minDanceability.toFixed(1) }}</small>
              </div>
            </div>
          </Panel>
        </div>
        
        <!-- Main Chart Area -->
        <div class="col-12 md:col-9">
          <Card class="scatter-container">
            <template #title>
              Music Taste Scatter Plot
            </template>
            <template #subtitle>
              <small>Based on your {{ timeRangeLabels[timeRange] }} listening history</small>
            </template>
            <template #content>
              <div ref="chartContainer" class="scatter-chart">
                <!-- Chart will be rendered here -->
                <div v-if="scatterData.points && scatterData.points.length === 0" class="no-data">
                  <Message severity="info" :closable="false">No data available for the selected filters</Message>
                </div>
              </div>
            </template>
          </Card>
        </div>
        
        <!-- Details Panel -->
        <div class="col-12 md:col-3">
          <Card>
            <template #title>
              Selected Track
            </template>
            <template #content>
              <div v-if="selectedTrack" class="track-details">
                <div class="track-image mb-3">
                  <Image :src="selectedTrack.image || '/api/placeholder/300/300'" alt="Album Art" width="100%" preview />
                </div>
                <h3>{{ selectedTrack.name }}</h3>
                <p>{{ selectedTrack.artist }}</p>
                
                <Divider />
                
                <h4>Audio Features</h4>
                <ul class="track-features p-0 m-0">
                  <li>
                    <div class="flex justify-content-between">
                      <span>Energy:</span>
                      <span>{{ (selectedTrack.energy * 100).toFixed(0) }}%</span>
                    </div>
                    <ProgressBar :value="selectedTrack.energy * 100" :showValue="false" />
                  </li>
                  <li>
                    <div class="flex justify-content-between">
                      <span>Danceability:</span>
                      <span>{{ (selectedTrack.danceability * 100).toFixed(0) }}%</span>
                    </div>
                    <ProgressBar :value="selectedTrack.danceability * 100" :showValue="false" />
                  </li>
                  <li>
                    <div class="flex justify-content-between">
                      <span>Valence (Positivity):</span>
                      <span>{{ (selectedTrack.valence * 100).toFixed(0) }}%</span>
                    </div>
                    <ProgressBar :value="selectedTrack.valence * 100" :showValue="false" />
                  </li>
                  <li>
                    <div class="flex justify-content-between">
                      <span>Tempo:</span>
                      <span>{{ Math.round(selectedTrack.tempo) }} BPM</span>
                    </div>
                  </li>
                </ul>
                
                <div v-if="selectedTrack.preview_url" class="mt-3">
                  <Button 
                    :icon="isPlaying ? 'pi pi-pause' : 'pi pi-play'" 
                    :label="isPlaying ? 'Pause' : 'Play Preview'" 
                    @click="togglePreview" 
                    class="w-full"
                  />
                </div>
              </div>
              <div v-else class="no-selection">
                <Message severity="info" :closable="false">Click on a point to see track details</Message>
              </div>
            </template>
          </Card>
        </div>
        
        <!-- Legend & Info -->
        <div class="col-12">
          <Card class="mt-3">
            <template #title>
              How to read this chart
            </template>
            <template #content>
              <div class="grid">
                <div class="col-12 md:col-6">
                  <h4>X-Axis: {{ getAxisLabel('x') }}</h4>
                  <p>The horizontal position represents the first principal component of your music's audio features.</p>
                </div>
                <div class="col-12 md:col-6">
                  <h4>Y-Axis: {{ getAxisLabel('y') }}</h4>
                  <p>The vertical position represents the second principal component of your music's audio features.</p>
                </div>
                <div class="col-12">
                  <Message severity="info" :closable="false">
                    This visualization uses Principal Component Analysis (PCA) to reduce multiple audio features 
                    into a 2D representation of your music taste. Similar songs appear closer together.
                  </Message>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
      
      <!-- Share Dialog -->
      <Dialog v-model:visible="shareDialogVisible" header="Share Your Music Map" :modal="true" :style="{width: '450px'}">
        <div class="share-options">
          <h4>Share your music taste visualization</h4>
          <div class="field">
            <label for="share-url">Link</label>
            <InputText id="share-url" v-model="shareUrl" readonly class="w-full" />
          </div>
          <div class="flex justify-content-end">
            <Button icon="pi pi-copy" label="Copy Link" @click="copyShareLink" />
          </div>
        </div>
      </Dialog>
      
      <!-- Audio player (hidden) -->
      <audio ref="audioPlayer" @ended="isPlaying = false"></audio>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, watch } from 'vue';
  import * as d3 from 'd3';
  
  export default {
    data() {
      return {
        loading: true,
        scatterData: { points: [], explained_variance: [0, 0] },
        filteredPoints: [],
        selectedTrack: null,
        timeRange: 'medium_term',
        timeRangeOptions: [
          { label: 'Short Term', value: 'short_term' },
          { label: 'Medium Term', value: 'medium_term' },
          { label: 'Long Term', value: 'long_term' }
        ],
        timeRangeLabels: {
          'short_term': 'recent (4 weeks)',
          'medium_term': 'medium-term (6 months)',
          'long_term': 'long-term (years)'
        },
        minEnergy: 0,
        minDanceability: 0,
        isPlaying: false,
        shareDialogVisible: false,
        shareUrl: ''
      };
    },
    
    mounted() {
      this.fetchData();
    },
    
    watch: {
      filteredPoints() {
        this.renderChart();
      }
    },
    
    methods: {
      async fetchData() {
        this.loading = true;
        
        try {
          const response = await fetch(`/api/scatter-data?time_range=${this.timeRange}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          
          this.scatterData = await response.json();
          this.filterPoints();
          
          this.$toast.add({
            severity: 'success',
            summary: 'Data Loaded',
            detail: `Loaded ${this.scatterData.points.length} tracks from your Spotify history`,
            life: 3000
          });
        } catch (error) {
          console.error('Error fetching data:', error);
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load Spotify data. Please try again.',
            life: 3000
          });
        } finally {
          this.loading = false;
        }
      },
      
      filterPoints() {
        this.filteredPoints = this.scatterData.points.filter(point => 
          point.energy >= this.minEnergy && 
          point.danceability >= this.minDanceability
        );
        
        // Clear selection if it's filtered out
        if (this.selectedTrack && !this.filteredPoints.find(p => p.id === this.selectedTrack.id)) {
          this.selectedTrack = null;
        }
      },
      
      renderChart() {
        // Clear previous chart
        const container = this.$refs.chartContainer;
        container.innerHTML = '';
        
        if (!this.filteredPoints.length) return;
        
        // Set up dimensions
        const width = container.clientWidth;
        const height = 500;
        const margin = { top: 20, right: 20, bottom: 40, left: 40 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        
        // Create scales
        const xExtent = d3.extent(this.filteredPoints, d => d.x);
        const yExtent = d3.extent(this.filteredPoints, d => d.y);
        
        // Add 10% padding around the data
        const xPadding = (xExtent[1] - xExtent[0]) * 0.1;
        const yPadding = (yExtent[1] - yExtent[0]) * 0.1;
        
        const xScale = d3.scaleLinear()
          .domain([xExtent[0] - xPadding, xExtent[1] + xPadding])
          .range([0, innerWidth]);
          
        const yScale = d3.scaleLinear()
          .domain([yExtent[0] - yPadding, yExtent[1] + yPadding])
          .range([innerHeight, 0]);
        
        // Create SVG
        const svg = d3.select(container)
          .append('svg')
          .attr('width', width)
          .attr('height', height);
        
        // Create chart group
        const chart = svg.append('g')
          .attr('transform', `translate(${margin.left}, ${margin.top})`);
        
        // Add axes
        chart.append('g')
          .attr('transform', `translate(0, ${innerHeight})`)
          .call(d3.axisBottom(xScale));
          
        chart.append('g')
          .call(d3.axisLeft(yScale));
        
        // Add axis labels
        chart.append('text')
          .attr('x', innerWidth / 2)
          .attr('y', innerHeight + 35)
          .attr('text-anchor', 'middle')
          .text(this.getAxisLabel('x'));
          
        chart.append('text')
          .attr('transform', 'rotate(-90)')
          .attr('x', -innerHeight / 2)
          .attr('y', -30)
          .attr('text-anchor', 'middle')
          .text(this.getAxisLabel('y'));
        
        // Create tooltip
        const tooltip = d3.select('body')
          .append('div')
          .attr('class', 'p-tooltip')
          .style('position', 'absolute')
          .style('visibility', 'hidden')
          .style('background-color', 'var(--surface-card)')
          .style('border-radius', 'var(--border-radius)')
          .style('padding', '0.5rem')
          .style('box-shadow', 'var(--card-shadow)')
          .style('pointer-events', 'none')
          .style('z-index', '1000');
        
        // Add data points
        chart.selectAll('circle')
          .data(this.filteredPoints)
          .enter()
          .append('circle')
          .attr('cx', d => xScale(d.x))
          .attr('cy', d => yScale(d.y))
          .attr('r', 6)
          .attr('fill', d => this.selectedTrack && d.id === this.selectedTrack.id ? 'var(--primary-color)' : 'var(--primary-color-lighter)')
          .attr('stroke', d => this.selectedTrack && d.id === this.selectedTrack.id ? 'var(--primary-color-darker)' : 'none')
          .attr('stroke-width', 2)
          .attr('opacity', d => this.selectedTrack && d.id === this.selectedTrack.id ? 1 : 0.7)
          .style('cursor', 'pointer')
          .on('mouseover', (event, d) => {
            tooltip.style('visibility', 'visible')
              .html(`
                <div>
                  <div style="font-weight: bold;">${d.name}</div>
                  <div>${d.artist}</div>
                </div>
              `);
          })
          .on('mousemove', (event) => {
            tooltip.style('top', (event.pageY - 10) + 'px')
              .style('left', (event.pageX + 10) + 'px');
          })
          .on('mouseout', () => {
            tooltip.style('visibility', 'hidden');
          })
          .on('click', (event, d) => {
            this.selectedTrack = d;
            this.renderChart();
          });
      },
      
      getAxisLabel(axis) {
        if (!this.scatterData.explained_variance) return axis === 'x' ? 'Component 1' : 'Component 2';
        
        const variance = this.scatterData.explained_variance[axis === 'x' ? 0 : 1];
        const percentage = (variance * 100).toFixed(1);
        
        return `Component ${axis === 'x' ? '1' : '2'} (${percentage}% variance)`;
      },
      
      togglePreview() {
        const player = this.$refs.audioPlayer;
        
        if (!this.selectedTrack || !this.selectedTrack.preview_url) return;
        
        if (this.isPlaying) {
          player.pause();
          this.isPlaying = false;
        } else {
          player.src = this.selectedTrack.preview_url;
          player.play()
            .then(() => {
              this.isPlaying = true;
            })
            .catch(error => {
              console.error('Error playing audio:', error);
              this.$toast.add({
                severity: 'error',
                summary: 'Playback Error',
                detail: 'Could not play audio preview',
                life: 3000
              });
            });
        }
      },
      
      exportChart() {
        // Generate a screenshot of the chart
        const svgElement = this.$refs.chartContainer.querySelector('svg');
        
        if (!svgElement) {
          this.$toast.add({
            severity: 'error',
            summary: 'Export Error',
            detail: 'No chart to export',
            life: 3000
          });
          return;
        }
        
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const DOMURL = window.URL || window.webkitURL || window;
        const img = new Image();
        const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
        const url = DOMURL.createObjectURL(svgBlob);
        
        img.onload = () => {
          canvas.width = svgElement.width.baseVal.value;
          canvas.height = svgElement.height.baseVal.value;
          ctx.drawImage(img, 0, 0);
          DOMURL.revokeObjectURL(url);
          
          const imgURI = canvas.toDataURL('image/png');
          
          const a = document.createElement('a');
          a.download = 'spotify-taste-map.png';
          a.href = imgURI;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };
        
        img.src = url;
      },
      
      shareVisualization() {
        this.shareUrl = window.location.origin + '/share?id=' + Date.now();
        this.shareDialogVisible = true;
      },
      
      copyShareLink() {
        navigator.clipboard.writeText(this.shareUrl)
          .then(() => {
            this.$toast.add({
              severity: 'success',
              summary: 'Copied',
              detail: 'Link copied to clipboard',
              life: 3000
            });
          })
          .catch(() => {
            this.$toast.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to copy link',
              life: 3000
            });
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .scatter-container {
    height: 100%;
  }
  
  .scatter-chart {
    width: 100%;
    height: 500px;
    position: relative;
  }
  
  .no-data, .no-selection {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  .track-details {
    display: flex;
    flex-direction: column;
  }
  
  .track-features {
    list-style-type: none;
  }
  
  .track-features li {
    margin-bottom: 1rem;
  }
  </style>