<template>
  <v-container>
    <div class="pa-4 my-5 rounded-lg shadow-lg bg-white">
      <v-form
        v-model="validForm"
        ref="validForm"
        lazy-validation
        @submit.prevent=""
      >
        <div class="d-flex items-center">
          <v-icon color="primary" size="75">mdi-cloud</v-icon>
          <h1 class="regular text-3xl bold color-primary mr-2">
            ایجاد سرور ابری
          </h1>
        </div>
        <div class="my-10">
          <operating-system v-model="operatingSystemData" />
        </div>
        <v-divider></v-divider>
        <div class="my-10">
          <cloud-server-info v-model="flavorData" />
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
          <access-settings v-model="accessSettingData" />
        </div>
        <div class="my-10">
          <machin-info v-model="vmInfo" />
        </div>
        <v-expand-transition>
          <div v-if="errors.length > 0">
            <div
              v-for="(error, index) in errors"
              :key="index"
              class="
                d-flex
                items-center
                p-4
                rounded-md
                border border-red-500
                bg-red-100
                mb-4
              "
            >
              <v-icon color="red" class="ml-2">mdi-alert-circle</v-icon>
              <span class="text-red-500">
                {{ error }}
              </span>
            </div>
          </div>
        </v-expand-transition>
        <div class="w-full">
          <v-btn
            height="55"
            block
            color="primary"
            @click="createServer"
            :loading="loading"
            >ایجاد سرور ابری</v-btn
          >
        </div>
      </v-form>
    </div>
    <snack-bar />
  </v-container>
</template>

<script>
import OperatingSystem from "@/components/app/panel/create/operating-system/OperatingSystem.vue";
import OperatingSoftware from "@/components/app/panel/create/operating-software/OperatingSoftware.vue";
import AdvancedSettings from "@/components/app/panel/create/advanced-settings/AdvancedSettings.vue";
import AccessSettings from "@/components/app/panel/create/access-settings/AccessSettings.vue";
import MachinInfo from "@/components/app/panel/create/machin-info/MachinInfo.vue";
import CloudServerInfo from "@/components/app/panel/create/operating-info/CloudServerInfo.vue";

export default {
  components: {
    OperatingSystem,
    OperatingSoftware,
    AdvancedSettings,
    AccessSettings,
    MachinInfo,
    CloudServerInfo,
  },
  layout: "panel",

  data() {
    return {
      loading: false,
      validForm: true,
      vmInfo: {
        vmNumber: null,
        vmName: "",
        projectId: "",
      },
      accessSettingData: {
        activePassword: false,
        keyPairId: null,
      },
      flavorData: {
        flavorId: null,
      },
      operatingSystemData: {
        operatingSystemId: null,
      },
      errors: [],
    };
  },
  methods: {
    async createServer() {
      this.errors = [];
      if (this.operatingSystemData.operatingSystemId === null) {
        this.errors.push("انتخاب سیستم عامل الزامی است");
      }
      if (this.flavorData.flavorId === null) {
        this.errors.push("انتخاب مشخصات ماشین الزامی است");
      }
      if (
        !this.accessSettingData.activePassword &&
        this.accessSettingData.keyPairId === null
      ) {
        this.errors.push("انتخاب کلید الزامی است");
      }
      if (this.$refs.validForm.validate() && this.errors.length === 0) {
        this.loading = true;
        try {
          const data = await this.$post("service/vm/", {
            project_id: this.vmInfo.projectId,
            image_id: this.operatingSystemData.operatingSystemId,
            name: this.vmInfo.vmName,
            flavor_id: Number(this.flavorData.flavorId),
            keypair_id: this.accessSettingData.keyPairId,
            instance_count: this.vmInfo.vmNumber,
          });
          this.loading = false;
          this.$store.dispatch("SnackBar/show", "ماشین با موفقیت ایجاد شد.");
          await new Promise((resolve) => setTimeout(resolve, 2500));
          this.$router.push("/panel/cloud-server");
        } catch (err) {
          this.loading = false;
          console.log(err);
        }
      }
    },
  },
};
</script>

<style></style>
