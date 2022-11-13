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
        <div
          v-if="projectData.length > 0"
          class="
            d-flex
            items-center
            justify-between
            border border-[#d0d0d0]
            rounded
            p-3
            my-3
          "
        >
          گرافیک ابری
        </div>
        <div v-else>
          <h1 class="regular text-xl">اطلاعاتی یافت نشد!</h1>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectData: [],
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