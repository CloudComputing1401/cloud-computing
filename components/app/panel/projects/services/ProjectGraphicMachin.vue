<template>
  <div>
    <div class="d-flex items-center justify-between my-[30px]">
      <h2 class="text-[28px] font-bold">ماشین های گرافیکی</h2>
      <v-btn color="primary">گرافیک ابری جدید</v-btn>
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
        <graphics-machines v-for="(i, index) in projectData" :key="index" />
        <div v-if="projectData.length === 0">
          <h1 class="regular text-xl">اطلاعاتی یافت نشد!</h1>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import GraphicsMachines from "../../graphics-machines/GraphicsMachines.vue";
export default {
  components: { GraphicsMachines },
  data() {
    return {
      projectData: ["ali", "ali"],
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