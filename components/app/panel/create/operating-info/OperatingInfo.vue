<template>
  <div class="regular mt-4">
    <v-tabs v-model="tab" align-with-title>
      <v-tabs-slider color="primary"></v-tabs-slider>

      <v-tab> بسته های پیشنهادی </v-tab>
      <v-tab> بسته های دلخواه </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-row class="mt-3">
          <v-col v-for="i in 5" :key="i" cols="12" md="6" lg="3">
            <div class="text-center rounded-lg border-2 border-primary">
              <div class="bg-primary py-3 text-white">
                <h1 class="text-xl">6,000 ریال/ ساعتی</h1>
                <h3 class="text-lg">144,000 ریال/ روزانه</h3>
              </div>
              <div class="pa-2">
                <div class="my-2">CPU 2</div>
                <div class="my-2">CPU 2</div>
                <div class="my-2">CPU 2</div>
                <div class="my-2">CPU 2</div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item>
        <div class="mt-3 border p-3 rounded-md">
          <h1 class="text-lg">
            در صورتی که مشخصات مدنظر خود را نیافته اید، در این قسمت می توانید
            مشخصات مورد نیاز خود را به صورت دلخواه تعیین کنید.
          </h1>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
    };
  },
};
</script>

<style>
</style>