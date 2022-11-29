<template>
  <div>
    <div class="d-flex items-center justify-between my-[30px]">
      <h2 class="text-[28px] font-bold">سرورهای محاسبات سنگین</h2>
      <v-btn color="primary">سرور محاسبات سنگین جدید</v-btn>
    </div>
    <div
      :class="[
        loading || projectData.length === 0
          ? 'd-flex justify-center items-center'
          : null,
        'min-h-[200px]',
      ]"
    >
      <loading v-if="loading" />
      <template v-if="!loading">
        <heavy-computing-servers
          v-for="(i, index) in projectData"
          :key="index"
        />
        <div v-if="projectData.length === 0">
          <h1 class="regular text-xl">اطلاعاتی یافت نشد!</h1>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import HeavyComputingServers from "../../heavy-computing-servers/HeavyComputingServers.vue";
export default {
  components: { HeavyComputingServers },
  data() {
    return {
      projectData: ["ali", "ali"],
      loading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 4000);
  },
};
</script>

<style>
</style>