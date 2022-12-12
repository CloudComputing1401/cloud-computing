<template>
  <v-container>
    <div class="p-5 my-5 rounded-lg custom-shadow">
      <div class="d-flex items-center justify-between">
        <div class="d-flex">
          <div class="bg-primary p-5 rounded-md">
            <v-icon color="#fff" size="90">mdi-server</v-icon>
          </div>
          <div class="mr-3">
            <div class="my-3 mr-2 d-flex items-center">
              <img src="/img/windows.png" class="w-[40px] h-[40px] ml-2" />
              <h2 class="text-xl font-weight-bold">نام سرور ابری</h2>
            </div>
            <div class="d-flex items-center">
              <div class="d-flex items-center">
                <v-icon color="primary" size="50">mdi-nas</v-icon>
                <nuxt-link :to="`/panel/projects/test`" class="font-bold"
                  >نام پروژه</nuxt-link
                >
                <div class="d-flex items-center mr-2">
                  <span>4GB ram</span>
                  <div class="h-[20px] w-[2px] bg-primary mx-2"></div>
                  <span>2 vcpus</span>
                  <div class="h-[20px] w-[2px] bg-primary mx-2"></div>
                  <span>25GB disk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <v-btn color="primary" height="20" class="rounded-lg">
              <v-icon class="ml-2">mdi-monitor</v-icon>
              مشاهده در کنسول
            </v-btn>
          </div>
          <div>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  height="20"
                  outlined
                  class="rounded-lg mt-4"
                  @click="copyToCliboard"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon class="ml-2">mdi-content-copy</v-icon>
                  {{ ip }}
                </v-btn>
              </template>
              <span>کپی آی پی</span>
            </v-tooltip>
          </div>
        </div>
      </div>
      <v-divider class="my-5" />
      <div>
        <v-tabs v-model="tab">
          <v-tabs-slider color="primary"></v-tabs-slider>
          <v-tab v-for="item in menuTabs" :key="item">
            <span class="font-weight-bold">{{ item }}</span>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <console-access />
          </v-tab-item>
          <v-tab-item>
            <service-charts />
          </v-tab-item>
          <v-tab-item>
            <service-settings />
          </v-tab-item>
          <v-tab-item>
            <service-backup />
          </v-tab-item>
          <v-tab-item>
            <service-hard-disks />
          </v-tab-item>
          <v-tab-item>
            <service-firewall />
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>
    <snack-bar />
  </v-container>
</template>

<script>
import ServiceCharts from "../../../../../../components/app/panel/service-details/service-charts/ServiceCharts.vue";
import ConsoleAccess from "../../../../../../components/app/panel/service-details/console-access/ConsoleAccess.vue";
import ServiceSettings from "../../../../../../components/app/panel/service-details/service-settings/ServiceSettings.vue";
import ServiceBackup from "../../../../../../components/app/panel/service-details/service-backup/ServiceBackup.vue";
import ServiceHardDisks from "../../../../../../components/app/panel/service-details/service-hard-disks/ServiceHardDisks.vue";
import ServiceFirewall from "../../../../../../components/app/panel/service-details/service-firewall/ServiceFirewall.vue";

export default {
  layout: "panel",
  components: {
    ConsoleAccess,
    ServiceCharts,
    ServiceSettings,
    ServiceBackup,
    ServiceHardDisks,
    ServiceFirewall,
  },
  data() {
    return {
      tab: null,
      ip: "192.168.100.170",
      menuTabs: [
        "دسترسی",
        "نمودارها",
        "تنظیمات",
        "نسخه پشتیبان",
        "هارد دیسک ها",
        "گروه های امنیتی(فایروال)",
      ],
    };
  },
  mounted() {
    console.log(this.$route);
  },
  methods: {
    copyToCliboard() {
      navigator.clipboard.writeText(this.ip);
      this.$store.dispatch("SnackBar/show", "آیپی در کلیبورد ذخیره شد.");
    },
  },
};
</script>

<style></style>
