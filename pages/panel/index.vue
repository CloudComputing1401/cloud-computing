<template>
  <v-container>
    <div v-if="activeUser" class="w-full h-[500px] flex-center">
      <div class="w-[50%] py-[44px] shadow-xl rounded-md bg-white flex-center">
        <div class="text-center">
          <v-icon size="100">mdi-cloud-clock</v-icon>
          <div class="font-semibold mt-3">
            در انتظار تایید اطلاعات توسط ادمین
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  layout: "panel",
  data: () => ({
    activeUser: false,
  }),
  mounted() {
    this.activeUser = this.$store.getters["User/getActiveUser"];
  },
};
</script>

<style></style>
