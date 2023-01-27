<template>
  <div>
    <div class="flex-between my-[30px]">
      <h2 class="text-[28px] font-bold">سرورهای ابری</h2>
      <v-btn color="primary">سرور ابری جدید</v-btn>
    </div>
    <div
      :class="[
        loading || projectData.length === 0 ? 'flex-center' : null,
        'min-h-[200px]',
      ]"
    >
      <loading v-if="loading" />
      <template v-if="!loading">
        <cloud-servers v-for="(i, index) in projectData" :key="index" />
        <div v-if="projectData.length === 0">
          <h1 class="regular text-xl">اطلاعاتی یافت نشد!</h1>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import CloudServers from "../../cloud-servers/CloudServers.vue";
export default {
  components: { CloudServers },
  data() {
    return {
      projectData: [],
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

<style></style>
