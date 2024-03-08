<template>
  <v-container>
    <div class="pa-4 my-5 rounded-lg shadow-lg bg-white">
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
            loading || serversData.length === 0 ? 'flex-center' : null,
            'min-h-[250px] pt-[20px]',
          ]"
        >
          <loading v-if="loading" />
          <template v-if="!loading">
            <cloud-servers
              v-for="server in serversData"
              :key="server.id"
              :serverData="server"
            />
            <div v-if="serversData.length === 0">
              <h1 class="regular text-xl">سرور ابری یافت نشد!</h1>
            </div>
          </template>
        </div>
      </div>
    </div>
    <hardware-reboot />
    <software-reboot />
    <stop-vm />
    <turn-off-vm />
    <delete-vm @getVmList="getServerClouds" />
  </v-container>
</template>

<script>
import CloudServers from "../../../components/app/panel/cloud-servers/CloudServers.vue";
import HardwareReboot from "../../../components/app/panel/service-details/service-settings/setting-dialogs/hardware-reboot/HardwareReboot.vue";
import SoftwareReboot from "../../../components/app/panel/service-details/service-settings/setting-dialogs/software-reboot/SoftwareReboot.vue";
import StopVm from "../../../components/app/panel/service-details/service-settings/setting-dialogs/stop-vm/StopVm.vue";
import TurnOffVm from "../../../components/app/panel/service-details/service-settings/setting-dialogs/turnoff-vm/TurnOffVm.vue";
import DeleteVm from "../../../components/app/panel/service-details/service-settings/setting-dialogs/delete-vm/DeleteVm.vue";

export default {
  layout: "panel",
  components: {
    CloudServers,
    HardwareReboot,
    SoftwareReboot,
    StopVm,
    TurnOffVm,
    DeleteVm,
  },
  data() {
    return {
      serversData: [],
      loading: false,
    };
  },
  mounted() {
    this.getServerClouds();
  },
  methods: {
    async getServerClouds() {
      this.loading = true;
      try {
        this.serversData = (await this.$get("service/vm/")).data.data;
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },
  },
};
</script>

<style></style>
