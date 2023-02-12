<template>
  <div class="py-3 min-h-[400px]">
    <div class="mt-5">
      <h1 class="text-[24px] font-bold mb-4">ریبوت سخت افزاری ماشین</h1>
      <p>
        ریستارت کردن ماشین از طریق کنسول پیشنهاد میشود در غیر این صورت مشابه با
        قطع برق و اتصال مجدد ماشین میباشد.
      </p>
      <div class="d-flex flex-row-reverse">
        <v-btn
          color="primary"
          @click="
            $store.dispatch('Dialog/showDialog', {
              name: 'HardwareRebootDialog',
              data: {
                name: 'سرور ابری',
                id: '213',
              },
            })
          "
          >ریبوت سخت افزاری</v-btn
        >
      </div>
    </div>
    <v-divider class="my-10" />
    <div>
      <h2 class="text-[24px] font-bold mb-4">ریبوت نرم افزاری ماشین</h2>
      <p>
        سافت ریبوت ماشین از طریق کنسول پیشنهاد میشود در غیر این صورت مشابه با
        قطع برق و اتصال مجدد ماشین میباشد
      </p>
      <div class="d-flex flex-row-reverse">
        <v-btn
          color="primary"
          @click="
            $store.dispatch('Dialog/showDialog', {
              name: 'SoftwareRebootDialog',
              data: {
                name: 'سرور ابری',
                id: '213',
              },
            })
          "
          >ریبوت نرم افزاری</v-btn
        >
      </div>
    </div>
    <v-divider class="my-10" />
    <div>
      <h2 class="text-[24px] font-bold mb-4">متوقف کردن ماشین</h2>
      <p>این اقدام منجر به توقف ماشین و همه اطلاعات مربوط به آن میشود</p>
      <div class="d-flex flex-row-reverse">
        <v-btn
          color="red"
          @click="
            $store.dispatch('Dialog/showDialog', {
              name: 'StopMachineDialog',
              data: {
                name: 'سرور ابری',
                id: '213',
              },
            })
          "
          >متوقف کردن ماشین</v-btn
        >
      </div>
    </div>
    <v-divider class="my-10" />
    <div>
      <h2 class="text-[24px] font-bold mb-4">خاموش کردن ماشین</h2>
      <p>از این قسمت میتوانید ماشین خود را خاموش کنید.</p>
      <div class="d-flex flex-row-reverse">
        <v-btn
          color="red"
          @click="
            $store.dispatch('Dialog/showDialog', {
              name: 'TurnOffMachineDialog',
              data: {
                name: 'سرور ابری',
                id: '213',
              },
            })
          "
          >خاموش کردن ماشین</v-btn
        >
      </div>
    </div>
    <v-divider class="my-10" />
    <div>
      <h2 class="text-[24px] font-bold mb-4">حذف کامل ماشین</h2>
      <p>این اقدام منجر به حذف کامل ماشین و همه اطلاعات مربوط به آن میشود.</p>
      <div class="d-flex flex-row-reverse">
        <v-btn
          outlined
          color="red"
          @click="
            $store.dispatch('Dialog/showDialog', {
              name: 'DeleteMachineDialog',
              data: {
                name: 'سرور ابری',
                id: '213',
              },
            })
          "
          >حذف کردن ماشین</v-btn
        >
      </div>
    </div>
    <hardware-reboot />
    <software-reboot />
    <stop-vm />
    <turn-off-vm />
    <delete-vm />
  </div>
</template>

<script>
import DeleteVm from "./setting-dialogs/delete-vm/DeleteVm.vue";
import HardwareReboot from "./setting-dialogs/hardware-reboot/HardwareReboot.vue";
import SoftwareReboot from "./setting-dialogs/software-reboot/SoftwareReboot.vue";
import StopVm from "./setting-dialogs/stop-vm/StopVm.vue";
import TurnOffVm from "./setting-dialogs/turnoff-vm/TurnOffVm.vue";
export default {
  components: {
    HardwareReboot,
    SoftwareReboot,
    StopVm,
    TurnOffVm,
    DeleteVm,
  },
};
</script>

<style></style>
