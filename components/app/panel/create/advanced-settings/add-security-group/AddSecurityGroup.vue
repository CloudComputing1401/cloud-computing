<template>
  <div class="p-4 relative bg-white">
    <div
      class="absolute left-4 top-4 cursor-pointer"
      @click="$emit('closeDialog')"
    >
      <v-icon>mdi-close</v-icon>
    </div>
    <h1 class="font-semibold text-2xl mt-6 mb-3">مدیریت گروه های امنیت</h1>
    <div>
      شما می توانید از گروه های موجود برای تخصیص به سرور ابری خود استفاده کنید.
    </div>
    <v-data-table
      :headers="headers"
      no-data-text="گروه امنیتی وجود ندارد!"
      hide-default-footer
      class="my-8"
    ></v-data-table>
    <div class="d-flex flex-row-reverse">
      <v-btn color="primary" width="100">تایید</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {
        text: "نام",
        align: "center",
        sortable: false,
        value: "name",
      },
      {
        text: "توضیحات",
        align: "center",
        sortable: false,
        value: "description",
      },
    ],
  }),
  // mounted() {
  //   this.getSecurityGroupList();
  // },
  // methods: {
  //   async getSecurityGroupList() {
  //     try {
  //       this.sshList = (await this.$get("service/keypair")).data.data;
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   },
  //   openDialog() {
  //     this.$store.dispatch("Dialog/showDialog", "AddSshDialog");
  //   },
  // },
};
</script>

<style></style>
