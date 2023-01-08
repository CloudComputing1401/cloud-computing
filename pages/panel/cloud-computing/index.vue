<template>
  <v-container>
    <div class="pa-4 my-5 rounded-lg custom-shadow">
      <div class="d-flex items-center">
        <v-icon color="primary" size="75">mdi-cloud-percent</v-icon>
        <h1 class="regular text-3xl bold color-primary mr-2">محاسبات ابری</h1>
      </div>
      <div class="d-flex flex-row-reverse my-5">
        <v-btn
          color="primary"
          height="55"
          @click="$router.push('/panel/cloud-computing/add-cloud-computing')"
        >
          <v-icon>mdi-plus</v-icon>
          <span>ایجاد سرور محاسبات سنگین جدید</span>
        </v-btn>
      </div>
      <v-divider></v-divider>
      <div class="mt-5">
        <h2 class="regular text-xl">لیست سرورهای محاسبات سنگین</h2>
        <div
          :class="[
            loading || cloudComputingData.length === 0 ? 'flex-center' : null,
            'min-h-[250px] pt-5',
          ]"
        >
          <loading v-if="loading" />
          <template v-if="!loading">
            <heavy-computing-servers
              v-for="(i, index) in cloudComputingData"
              :key="index"
            />
            <div v-if="cloudComputingData.length === 0">
              <h1 class="regular text-xl">سرور ابری یافت نشد!</h1>
            </div>
          </template>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import HeavyComputingServers from "../../../components/app/panel/heavy-computing-servers/HeavyComputingServers.vue";
export default {
  layout: "panel",
  components: {
    HeavyComputingServers,
  },
  data() {
    return {
      cloudComputingData: ["ali"],
      loading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
};
</script>

<style>
</style>