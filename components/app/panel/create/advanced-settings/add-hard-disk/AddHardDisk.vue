<template>
  <div class="p-4 bg-white relative">
    <div
      class="absolute left-4 top-4 cursor-pointer"
      @click="$emit('closeDialog')"
    >
      <v-icon>mdi-close</v-icon>
    </div>
    <div class="d-flex items-center my-4">
      <v-icon size="50" color="primary">mdi-database-plus</v-icon>
      <div class="text-xl mr-1 font-semibold">افزودن هارد دیسک</div>
    </div>
    <div class="mt-10">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            outlined
            label="نام"
            placeholder="نام هارد دیسک را وارد کنید"
          />
        </v-col>
        <v-col cols="12" md="6">
          <div class="d-flex items-center">
            <div class="ml-2">هارد انتخاب شده:</div>
            <div>{{ "sdflksd" }}</div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <div class="w-full my-5 mr-4">
          <h2 class="font-semibold text-lg">انتخاب مشخصات هارد دیسک</h2>
        </div>
        <v-col
          cols="12"
          lg="3"
          md="4"
          sm="6"
          v-for="hard in hardData"
          :key="hard.id"
        >
          <hard-disk-box
            :data="hard"
            @hardSelected="showHardSelected($event)"
          />
        </v-col>
      </v-row>
    </div>
    <div class="d-flex flex-row-reverse mt-10">
      <v-btn color="primary" width="100">تایید</v-btn>
    </div>
  </div>
</template>

<script>
import HardDiskBox from "./hard-disk-box/HardDiskBox.vue";
export default {
  components: {
    HardDiskBox,
  },
  data: () => ({
    ali: false,
    hardData: [
      {
        id: 1,
        plan: "960 ریال/ روزانه",
        capacity: "5 GB",
      },
      {
        id: 2,
        plan: "960 ریال/ روزانه",
        capacity: "2 GB",
      },
      {
        id: 3,
        plan: "960 ریال/ روزانه",
        capacity: "2 GB",
      },
      {
        id: 4,
        plan: "960 ریال/ روزانه",
        capacity: "2 GB",
      },
      {
        id: 5,
        plan: "960 ریال/ روزانه",
        capacity: "2 GB",
      },
    ],
  }),
  methods: {
    showHardSelected(value) {
      console.log(value, "hii");
    },
  },
};
</script>

<style scoped>
.bg-selected {
  background-color: #34495e !important;
  color: #fff !important;
}
</style>