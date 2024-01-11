<template>
  <v-dialog max-width="1000" v-model="dialog">
    <div class="p-4 bg-white">
      <h1 class="text-[24px] font-semibold text-center">
        لیست درخواست های افزایش کیف پول
      </h1>
      <div class="mt-5">
        <v-data-table
          :headers="headers"
          :items="requestList"
          loading-text="در حال دریافت اطلاعات..."
          :loading="loading"
          no-data-text="در حال حاضر هیچ درخواستی ثبت نشده است"
          hide-default-footer
        >
          <template v-slot:[`item.row`]="{ index }">
            {{ index + 1 }}
          </template>
          <template v-slot:[`item.amount`]="{ item }">
            {{ item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <template v-if="item.is_admin_approved">
              <div class="flex-center gap-x-1 leading-4">
                <span>تایید شده</span>
                <v-icon color="green">mdi-check-circle</v-icon>
              </div>
            </template>
            <template v-else>
              <div class="flex-center gap-x-1 leading-4">
                <span>تایید نشده</span>
                <v-icon color="red">mdi-close-circle</v-icon>
              </div>
            </template>
          </template>
        </v-data-table>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: {
    requestList: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "ردیف",
        align: "center",
        sortable: false,
        value: "row",
      },
      {
        text: "مقدار",
        align: "center",
        sortable: false,
        value: "amount",
      },
      {
        text: "توضیحات",
        align: "center",
        sortable: false,
        value: "description",
      },
      {
        text: "وضعیت",
        align: "center",
        sortable: false,
        value: "status",
        width: "150px",
      },
    ],
  }),
  watch: {
    dialog(val) {
      if (
        !val &&
        this.$store.getters["Dialog/active"] ===
          "IncreaseWalletRequestListDialog"
      ) {
        this.$store.dispatch("Dialog/showDialog", "");
        this.$emit("close");
      }
    },
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters["Dialog/active"],
      (newValue) => {
        this.dialog = newValue === "IncreaseWalletRequestListDialog";
      }
    );
    this.dialog =
      this.$store.getters["Dialog/active"] ===
      "IncreaseWalletRequestListDialog";
  },
  methods: {
    uploadFile(e) {
      this.imageFile = e;
    },
    async submit() {
      if (this.$refs.validForm.validate()) {
        this.loading = true;
        try {
          const formData = new FormData();
          formData.append("amount", this.amount);
          formData.append("description", this.description);
          formData.append("photo", this.imageFile);
          const data = await this.$post("wallet/user_requests/", formData);
          console.log(data, "data");
          this.loading = false;
          this.$store.dispatch(
            "SnackBar/show",
            "درخواست شما با موفقیت ثبت شد."
          );
          await new Promise((resolve) => setTimeout(resolve, 2000));
          this.dialog = false;
        } catch (err) {
          this.loading = false;
          console.error(err);
        }
      }
    },
  },
};
</script>

<style></style>
