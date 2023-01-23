<template>
  <v-container>
    <div class="pa-4 my-5 rounded-lg shadow-lg bg-white">
      <div class="d-flex items-center">
        <v-icon color="primary" size="75">mdi-cloud-percent</v-icon>
        <h1 class="regular text-3xl bold color-primary mr-2">
          ایجاد سرور محاسبات سنگین
        </h1>
      </div>
      <div class="my-10">
        <h2 class="regular text-xl font-semibold">انتخاب سیستم عامل</h2>
        <div :class="[loading ? 'min-h-[200px] flex-center' : null]">
          <loading v-if="loading" />
          <operating-system v-else />
        </div>
      </div>
      <v-divider></v-divider>
      <div class="my-10">
        <h2 class="regular text-xl font-semibold">انتخاب مشخصات سیستم</h2>
        <div :class="[loading ? 'min-h-[200px] flex-center' : null]">
          <loading v-if="loading" />
          <computing-server-info v-else />
        </div>
      </div>
      <v-divider></v-divider>
      <div class="my-10">
        <operating-software />
      </div>
      <v-divider></v-divider>
      <div class="my-10">
        <advanced-settings />
      </div>
      <v-divider></v-divider>
      <div class="my-10">
        <access-settings />
      </div>
      <div class="my-10">
        <machin-info />
      </div>
      <div class="w-full">
        <v-btn height="55" block color="primary">ایجاد سرور ابری</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import OperatingSystem from "@/components/app/panel/create/operating-system/OperatingSystem.vue";
import OperatingSoftware from "@/components/app/panel/create/operating-software/OperatingSoftware.vue";
import AdvancedSettings from "@/components/app/panel/create/advanced-settings/AdvancedSettings.vue";
import AccessSettings from "@/components/app/panel/create/access-settings/AccessSettings.vue";
import MachinInfo from "@/components/app/panel/create/machin-info/MachinInfo.vue";
import ComputingServerInfo from "@/components/app/panel/create/operating-info/ComputingServerInfo.vue";

export default {
  components: {
    OperatingSystem,
    OperatingSoftware,
    AdvancedSettings,
    AccessSettings,
    MachinInfo,
    ComputingServerInfo,
  },
  layout: "panel",

  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  },
};
</script>

<style></style>
