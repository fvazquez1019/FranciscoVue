<!-- <template>
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
//UNUSED SCRAPPED IDEA