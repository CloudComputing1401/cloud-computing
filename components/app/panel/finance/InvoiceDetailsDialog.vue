<template>
  <v-dialog max-width="600" v-model="dialog">
    <div class="p-4 bg-white">
      <h1 class="text-[24px] font-semibold text-center">جزئیات فاکتور</h1>
      <div v-if="!invoiceDetails" class="flex-center" style="height: 200px">
        <span class="text-[20px] font-semibold">اطلاعاتی یافت نشد!</span>
      </div>
      <div v-else class="flex flex-col gap-y-4 mt-5">
        <div class="w-full d-flex items-center">
          <div class="w-1/2 d-flex items-center gap-x-2">
            <span class="text-gray-400">نام سرور:</span>
            <span class="text-lg"> {{ invoiceDetails?.name }} </span>
          </div>
          <div class="w-1/2 d-flex items-center gap-x-2">
            <span class="text-gray-400">هزینه:</span>
            <span class="text-lg"> {{ invoiceDetails?.totalPrice }} </span>
            <span>ریال</span>
          </div>
        </div>
        <div class="w-full d-flex items-center">
          <div class="w-1/2 d-flex items-center gap-x-2">
            <span class="text-gray-400">تاریخ شروع:</span>
            <span class="text-lg"> {{ invoiceDetails.startDate }} </span>
          </div>
          <div class="w-1/2 d-flex items-center gap-x-2">
            <span class="text-gray-400">تاریخ پایان:</span>
            <span class="text-lg">
              {{ invoiceDetails.endDate }}
            </span>
          </div>
        </div>
        <v-textarea
          v-model="invoiceDetails.description"
          outlined
          label="توضیحات"
          hide-details
          rows="3"
          readonly
        ></v-textarea>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: {
    invoiceDetails: {
      type: Object,
      default: undefined,
    },
  },
  data: () => ({
    dialog: false,
  }),
  watch: {
    dialog(val) {
      if (
        !val &&
        this.$store.getters["Dialog/active"] === "InvoiceServerDialog"
      ) {
        this.$store.dispatch("Dialog/showDialog", "");
      }
    },
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters["Dialog/active"],
      (newValue) => {
        this.dialog = newValue === "InvoiceServerDialog";
      }
    );
    this.dialog =
      this.$store.getters["Dialog/active"] === "InvoiceServerDialog";
  },
};
</script>

<style></style>
