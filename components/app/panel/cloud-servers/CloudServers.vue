<template>
  <div>
    <div
      class="d-block d-md-flex items-center justify-between border border-[#d0d0d0] rounded p-3 my-3"
    >
      <div class="flex-center">
        <img
          :src="serverData?.image?.photo"
          alt=""
          class="w-[50px] h-[50px] ml-2"
        />
        <span
          class="py-1 px-4 rounded text-white"
          :class="`${
            serverData.status === 'ACTIVE'
              ? 'bg-green-500'
              : serverData.status === 'ERROR' || serverData.status === 'PAUSED'
              ? 'bg-red-500'
              : 'bg-blue-300'
          }`"
        >
          {{
            serverData.status === "ACTIVE"
              ? "فعال"
              : serverData.status === "ERROR"
              ? "غیر فعال"
              : serverData.status === "PAUSED"
              ? "متوقف"
              : "در حال ساخت "
          }}
        </span>
      </div>
      <div
        class="w-full sm:w-[85%] md:w-[60%] d-block d-sm-flex items-center justify-between mx-auto my-5 my-md-0 text-center"
      >
        <div class="font-semibold">{{ serverData.name }}</div>
        <div class="my-2 sm:my-0">192.168.100.170:3000</div>
        <div>{{ createdAt }}</div>
      </div>
      <v-menu rounded offset-y>
        <template v-slot:activator="{ attrs, on }">
          <div class="w-[70px] mx-auto flex-center">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </div>
        </template>

        <v-list>
          <v-list-item
            link
            :to="`/panel/projects/${serverData.project_id}/instances/${serverData.id}`"
          >
            <v-list-item-title>مشاهده جزئیات</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>مدیریت نسخه های پشتیبان</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="openDialog('hard_reboot')">
            <v-list-item-title>ریبوت سخت افزاری سرور</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="openDialog('soft_reboot')">
            <v-list-item-title>ریبوت نرم افزاری سرور</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="openDialog('stop')">
            <v-list-item-title>متوقف کردن سرور</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="openDialog('pause')">
            <v-list-item-title>خاموش کردن سرور</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="openDialog('suspend')">
            <v-list-item-title>حذف سرور</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>
import moment from "moment-jalaali";

export default {
  props: {
    serverData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: 5,
    };
  },
  mounted() {
    console.log(this.serverData);
  },
  computed: {
    createdAt() {
      return moment(this.serverData.created).format("HH:mm - jYYYY/jMM/jDD");
    },
  },
  methods: {
    openDialog(dialogType) {
      this.$store.dispatch("Dialog/showDialog", {
        name:
          dialogType === "hard_reboot"
            ? "HardwareRebootDialog"
            : dialogType === "soft_reboot"
            ? "SoftwareRebootDialog"
            : dialogType === "stop"
            ? "StopMachineDialog"
            : dialogType === "pause"
            ? "TurnOffMachineDialog"
            : dialogType === "suspend"
            ? "DeleteMachineDialog"
            : "",
        data: {
          projectId: this.serverData.project_id,
          vmId: this.serverData.id,
        },
      });
    },
  },
};
</script>

<style></style>
