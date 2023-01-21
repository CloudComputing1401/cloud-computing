<template>
  <div>
    <h2 class="regular text-xl font-semibold">انتخاب مشخصات سیستم</h2>
    <div :class="[loading ? 'min-h-[200px] flex-center' : null]">
      <loading v-if="loading" />
      <div v-else class="regular mt-4">
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="primary"></v-tabs-slider>

          <v-tab> بسته های پیشنهادی </v-tab>
          <!-- <v-tab> بسته های دلخواه </v-tab> -->
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-row class="mt-3">
              <v-col
                v-for="operatingInfo in operatingSystemsData"
                :key="operatingInfo.id"
                cols="12"
                md="6"
                lg="3"
              >
                <div
                  class="text-center rounded-lg border-2 border-primary select-none cursor-pointer duration-300 hover:translate-y-[-8px] hover:shadow-2xl"
                  :class="operatingInfo.serverSelected ? 'selected-box' : null"
                  @click="serverSelected(operatingInfo.id)"
                >
                  <div class="bg-primary py-3 text-white">
                    <h1 class="text-xl">{{ operatingInfo.name }}</h1>
                    <!-- <h1 class="text-xl">6,000 ریال/ ساعتی</h1>
                    <h3 class="text-lg">144,000 ریال/ روزانه</h3> -->
                  </div>
                  <div class="pa-2">
                    <div class="my-2 flex-center">
                      <span class="text-sm">CPU</span>
                      <span class="mr-1 font-semibold text-lg">
                        {{ operatingInfo.cpu.size }}
                      </span>
                    </div>
                    <div class="my-2 flex-center">
                      <span class="text-sm">RAM</span>
                      <span class="text-sm mx-1">
                        {{ operatingInfo.ram.unit.toUpperCase() }}
                      </span>
                      <span class="font-semibold text-lg">
                        {{ operatingInfo.ram.size }}
                      </span>
                    </div>
                    <div class="my-2 flex-center">
                      <span class="text-sm">RAM</span>
                      <span class="text-sm mx-1">
                        {{ operatingInfo.disk.unit.toUpperCase() }}
                      </span>
                      <span class="font-semibold text-lg">
                        {{ operatingInfo.disk.size }}
                      </span>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-tab-item>
          <!-- <v-tab-item>
        <div class="mt-3 border p-3 rounded-md">
          <h1 class="text-lg">
            در صورتی که مشخصات مدنظر خود را نیافته اید، در این قسمت می توانید
            مشخصات مورد نیاز خود را به صورت دلخواه تعیین کنید.
          </h1>
        </div>
      </v-tab-item> -->
        </v-tabs-items>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      loading: true,
      operatingSystemsData: [],
      selectedBox: false,
    };
  },
  mounted() {
    this.getAllOsInfo();
  },
  methods: {
    async getAllOsInfo() {
      try {
        this.operatingSystemsData = (
          await this.$get("service/flavor", {})
        ).data.data;

        this.operatingSystemsData.forEach((element) => {
          element["serverSelected"] = false;
        });
        console.log(this.operatingSystemsData, "hi");
        this.loading = false;
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },
    serverSelected(id) {
      this.operatingSystemsData.forEach((element) => {
        if (element.id === id) element["serverSelected"] = true;
        else element["serverSelected"] = false;
      });
      console.log(this.operatingSystemsData, "sdflsdfkj");
    },
  },
};
</script>

<style scoped>
.selected-box {
  background-color: rebeccapurple !important;
}
</style>
