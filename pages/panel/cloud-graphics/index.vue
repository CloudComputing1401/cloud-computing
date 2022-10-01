<template>
  <v-container>
    <div class="pa-4 my-5 rounded-lg custom-shadow">
      <div class="d-flex items-center">
        <v-icon color="primary" size="75">mdi-expansion-card-variant</v-icon>
        <h1 class="regular text-3xl bold color-primary mr-2">گرافیک ابری</h1>
      </div>
      <div class="d-flex flex-row-reverse my-5">
        <v-btn color="primary" height="55" @click="$router.push('/panel/projects/add-project')">
          <v-icon>mdi-plus</v-icon>
          <span>ایجاد گرافیک ابری جدید</span>
        </v-btn>
      </div>
      <v-divider></v-divider>
      <div class="mt-5">
        <h2 class="regular text-xl">لیست گرافیک های ابری</h2>
        <div
          :class="[
            loading || projectData.length === 0
              ? 'd-flex justify-center items-center'
              : null,
            'min-h-[250px]',
          ]"
        >
          <loading v-if="loading"/>
          <template v-if="!loading && projectData.length === 0">
            <h1 class="regular text-xl">اطلاعاتی یافت نشد!</h1>
          </template>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  layout: "panel",
  data() {
    return {
      projectData: [],
      loading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 4000);
  },
};
</script>

<style>
</style>