<template>
  <div>
    <div class="flex-between my-[30px]">
      <h2 class="text-[28px] font-bold">سرورهای ابری</h2>
      <v-btn
        color="primary"
        @click="$router.push('/panel/cloud-server/add-cloud-server')"
        >سرور ابری جدید</v-btn
      >
    </div>
    <div
      :class="[
        loading || serversData.length === 0 ? 'flex-center' : null,
        'min-h-[200px]',
      ]"
    >
      <loading v-if="loading" />
      <template v-if="!loading">
        <cloud-servers
          v-for="serverData in serversData"
          :key="serverData.id"
          :serverData="serverData"
        />
        <div v-if="serversData.length === 0">
          <h1 class="regular text-xl">اطلاعاتی یافت نشد!</h1>
        </div>
      </template>
    </div>
    <hardware-reboot />
    <software-reboot />
    <stop-vm />
    <turn-off-vm />
    <delete-vm />
  </div>
</template>

<script>
import HardwareReboot from "../../service-details/service-settings/setting-dialogs/hardware-reboot/HardwareReboot.vue";
import SoftwareReboot from "../../service-details/service-settings/setting-dialogs/software-reboot/SoftwareReboot.vue";
import StopVm from "../../service-details/service-settings/setting-dialogs/stop-vm/StopVm.vue";
import TurnOffVm from "../../service-details/service-settings/setting-dialogs/turnoff-vm/TurnOffVm.vue";
import DeleteVm from "../../service-details/service-settings/setting-dialogs/delete-vm/DeleteVm.vue";
import CloudServers from "../../cloud-servers/CloudServers.vue";
export default {
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
      loading: true,
    };
  },
  mounted() {
    this.getServerClouds();
  },
  methods: {
    async getServerClouds() {
      try {
        this.serversData = (
          await this.$get("service/vm/", {
            project_id: this.$route.params.id,
          })
        ).data.data;
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },
  },
};
</script>

<style></style>
