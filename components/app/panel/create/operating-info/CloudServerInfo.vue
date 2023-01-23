<template>
  <div>
    <h2 class="regular text-xl font-semibold">انتخاب مشخصات سیستم</h2>
    <div :class="[loading ? 'min-h-[200px] flex-center' : null]">
      <loading v-if="loading" />
      <div v-else class="regular mt-4">
        <span class="d-none">
          {{ selectedItem }}
        </span>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="primary"></v-tabs-slider>

          <v-tab> بسته های پیشنهادی </v-tab>
          <!-- <v-tab> بسته های دلخواه </v-tab> -->
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-row class="mt-3">
              <v-col
                v-for="flavorDetail in flavorsData"
                :key="flavorDetail.id"
                cols="12"
                md="6"
                lg="3"
              >
                <div
                  class="text-center rounded-lg border-2 border-primary select-none cursor-pointer duration-300 hover:translate-y-[-8px] hover:shadow-2xl"
                  :class="flavorDetail.serverSelected ? 'selected-box' : null"
                  @click="selectedItem = flavorDetail.id"
                >
                  <div
                    class="py-3 text-white"
                    :class="
                      flavorDetail.serverSelected
                        ? 'bg-[#34495e] border-b border-white'
                        : 'bg-primary'
                    "
                  >
                    <h1 class="text-xl">{{ flavorDetail.name }}</h1>
                    <!-- <h1 class="text-xl">6,000 ریال/ ساعتی</h1>
                    <h3 class="text-lg">144,000 ریال/ روزانه</h3> -->
                  </div>
                  <div class="pa-2">
                    <div class="my-2 flex-center">
                      <span class="text-sm">CPU</span>
                      <span class="mr-1 font-semibold text-lg">
                        {{ flavorDetail.cpu.size }}
                      </span>
                    </div>
                    <div class="my-2 flex-center">
                      <span class="text-sm">RAM</span>
                      <span class="text-sm mx-1">
                        {{ flavorDetail.ram.unit.toUpperCase() }}
                      </span>
                      <span class="font-semibold text-lg">
                        {{ flavorDetail.ram.size }}
                      </span>
                    </div>
                    <div class="my-2 flex-center">
                      <span class="text-sm">RAM</span>
                      <span class="text-sm mx-1">
                        {{ flavorDetail.disk.unit.toUpperCase() }}
                      </span>
                      <span class="font-semibold text-lg">
                        {{ flavorDetail.disk.size }}
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
  props: {
    value: {
      type: Object,
    },
  },
  data() {
    return {
      tab: null,
      loading: true,
      flavorsData: [],
      selectedItem: null,
    };
  },
  mounted() {
    this.getAllOsInfo();
  },
  watch: {
    selectedItem(val) {
      this.flavorsData.forEach((element) => {
        if (element.id === val) element["serverSelected"] = true;
        else element["serverSelected"] = false;
      });
      const value = this.value;
      value.flavorId = val;
      this.$emit("input", value);
    },
  },
  methods: {
    async getAllOsInfo() {
      try {
        this.flavorsData = (await this.$get("service/flavor", {})).data.data;
        this.flavorsData.forEach((element) => {
          element["serverSelected"] = false;
        });
        this.loading = false;
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.selected-box {
  background-color: #34495e !important;
  border-color: #3d3d3d !important;
  color: white;
  box-shadow: 0 0 15px #3d3d3d;
}
</style>
