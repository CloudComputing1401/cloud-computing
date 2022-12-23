<template>
  <v-container>
    <div class="pa-4 my-5 rounded-lg custom-shadow">
      <div class="d-flex items-center">
        <v-icon color="primary" size="75">mdi-cloud</v-icon>
        <h1 class="regular text-3xl bold color-primary mr-2">سرور ابری</h1>
      </div>
      <div class="d-flex flex-row-reverse my-5">
        <v-btn
          color="primary"
          height="55"
          @click="$router.push('/panel/cloud-server/add-cloud-server')"
        >
          <v-icon>mdi-plus</v-icon>
          <span>ایجاد سرور ابری جدید</span>
        </v-btn>
      </div>
      <v-divider></v-divider>
      <div class="mt-5">
        <h2 class="regular text-xl">لیست سرور های ابری ایجاد شده</h2>
        <div
          :class="[
            loading || serverCloudData.length === 0
              ? 'd-flex justify-center items-center'
              : null,
            'min-h-[250px] pt-[20px]',
          ]"
        >
          <loading v-if="loading" />
          <template v-if="!loading">
            <cloud-servers v-for="(i, index) in serverCloudData" :key="index" />
            <div v-if="serverCloudData.length === 0">
              <h1 class="regular text-xl">سرور ابری یافت نشد!</h1>
            </div>
          </template>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import CloudServers from "../../../components/app/panel/cloud-servers/CloudServers.vue";

export default {
  layout: "panel",
  components: { CloudServers },
  data() {
    return {
      serverCloudData: ["ali"],
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