<template>
  <v-container>
    <div class="pa-4 my-5 rounded-lg shadow-lg bg-white">
      <div class="d-flex items-center">
        <v-icon color="primary" size="75">mdi-expansion-card-variant</v-icon>
        <h1 class="regular text-3xl bold color-primary mr-2">گرافیک ابری</h1>
      </div>
      <div class="d-flex flex-row-reverse my-5">
        <v-btn
          color="primary"
          height="55"
          @click="$router.push('/panel/projects/add-project')"
        >
          <v-icon>mdi-plus</v-icon>
          <span>ایجاد گرافیک ابری جدید</span>
        </v-btn>
      </div>
      <v-divider></v-divider>
      <div class="mt-5">
        <h2 class="regular text-xl">لیست گرافیک های ابری</h2>
        <div
          :class="[
            loading || graphicCloudData.length === 0 ? 'flex-center' : null,
            'min-h-[250px] pt-[20px]',
          ]"
        >
          <loading v-if="loading" />
          <template v-if="!loading">
            <graphics-machines
              v-for="(i, index) in graphicCloudData"
              :key="index"
            />
            <div v-if="graphicCloudData.length === 0">
              <h1 class="regular text-xl">سرور ابری یافت نشد!</h1>
            </div>
          </template>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import GraphicsMachines from "../../../components/app/panel/graphics-machines/GraphicsMachines.vue";
export default {
  components: { GraphicsMachines },
  layout: "panel",
  data() {
    return {
      graphicCloudData: [],
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
