<template>
  <v-container>
    <div class="pa-4 my-5 rounded-lg shadow-lg bg-white">
      <div v-if="loading" class="w-full h-[500px] flex-center">
        <loading />
      </div>
      <template v-else>
        <div class="flex-between">
          <div class="d-flex">
            <div class="bg-primary p-5 rounded-md">
              <v-icon color="#fff" size="90">mdi-server</v-icon>
            </div>
            <div class="mr-3">
              <div class="my-3 mr-2 d-flex items-center">
                <img :src="vmData.image.photo" class="w-[40px] h-[40px] ml-2" />
                <h2 class="text-xl font-weight-bold">{{ vmData.name }}</h2>
              </div>
              <div class="d-flex items-center">
                <div class="d-flex items-center">
                  <v-icon color="primary" size="50">mdi-nas</v-icon>
                  <nuxt-link
                    :to="`/panel/projects/${$route.params.id}`"
                    class="font-bold"
                  >
                    {{ projectInfo?.name }}
                  </nuxt-link>
                  <div class="d-flex items-center mr-2">
                    <span>
                      {{
                        `${
                          vmData.flavor.ram.size
                        }${vmData.flavor.ram.unit.toUpperCase()} ram`
                      }}
                    </span>
                    <div class="h-[20px] w-[2px] bg-primary mx-2"></div>
                    <span>
                      {{ `vcpus ${vmData.flavor.cpu.size}` }}
                    </span>
                    <div class="h-[20px] w-[2px] bg-primary mx-2"></div>
                    <span>
                      {{
                        `${
                          vmData.flavor.disk.size
                        }${vmData.flavor.disk.unit.toUpperCase()} disk`
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <v-btn
                color="primary"
                height="20"
                class="rounded-lg"
                @click="openConsole"
              >
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
                    {{ vmData.accessIPv4 }}
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
              <console-access :vmData="vmData" />
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
      </template>
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
      vmData: null,
      projectInfo: null,
      menuTabs: [
        "دسترسی",
        "نمودارها",
        "تنظیمات",
        "نسخه پشتیبان",
        "هارد دیسک ها",
        "گروه های امنیتی(فایروال)",
      ],
      loading: true,
    };
  },
  mounted() {
    console.log(this.$route);
    this.getProjectInfo();
    this.getVmData();
  },
  methods: {
    async openConsole() {
      try {
        const response = await this.$axios.get("service/vm/console/", {
          params: {
            project_id: String(this.vmData.project_id),
            virtual_machine_id: String(this.vmData.id),
          },
        });
        const consoleUrl = response.data.data.console_url;
        // Open the console URL in a new tab
        window.open(consoleUrl, "_blank");
      } catch (error) {
        console.error("Error opening console:", error);
      }
    },

    copyToCliboard() {
      navigator.clipboard.writeText(this.vmData.accessIPv4);
      this.$store.dispatch("SnackBar/show", "آیپی در کلیبورد ذخیره شد.");
    },
    async getProjectInfo() {
      try {
        this.projectInfo = (
          await this.$axios.get(`/service/project/${this.$route.params.id}`, {
            headers: {
              Authorization: this.$store.getters["Auth/getToken"],
            },
          })
        ).data;
      } catch (err) {}
    },
    async getVmData() {
      try {
        this.vmData = (
          await this.$get("service/vm/", {
            project_id: this.$route.params.id,
            virtual_machine_id: this.$route.params.service,
          })
        ).data.data[0];
        this.loading = false;
        console.log(this.vmData);
      } catch (err) {}
    },
  },
};
</script>

<style></style>
