<template>
  <v-container>
    <v-row class="my-5">
      <v-col cols="12" md="7">
        <div class="pa-4 rounded-lg shadow-lg bg-white">
          <div class="flex-between">
            <div class="d-flex items-center">
              <v-icon size="30" color="primary">mdi-wallet</v-icon>
              <div class="text-[20px] font-semibold mr-2">موجودی کیف پول</div>
            </div>
            <div class="text-sm">
              <span class="text-[20px] font-semibold ml-1">213000000</span>
              ریال
            </div>
          </div>
          <div class="mt-10 d-flex">
            <div class="ml-4 text-justify">
              با شارژ کیف پول خود دیگر نگران از دست دادن منابع خود نباشید. لازم
              به ذکر است برای یهره مندی از تخفیفات و شارژ های هدیه تیکت ثبت
              نمایید یا با پشتیبانی تماس حاصل فرمایید.
            </div>
            <v-btn color="primary"> افزایش موجودی </v-btn>
          </div>
        </div>
        <div class="pa-4 mt-5 rounded-lg shadow-lg bg-white h-[500px]">
          <div class="d-flex items-center">
            <v-icon size="30" color="primary">mdi-list-box</v-icon>
            <div class="text-[20px] font-semibold mr-2">فهرست سرویس ها</div>
          </div>
          <v-data-table
            :headers="headers"
            :items="items"
            no-data-text="سروری پیدا نشد!"
            hide-default-footer
            class="mt-5"
          >
            <template v-slot:[`item.cost`]="{ item }">
              {{ item.cost.replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
              <span class="text-[14px]">ریال</span>
            </template>
            <template v-slot:[`item.more`]>
              <v-btn text @click="openDialog">بیشتر </v-btn>
            </template>
          </v-data-table>
        </div>
      </v-col>
      <v-col cols="12" md="5">
        <div class="pa-4 rounded-lg shadow-lg bg-white sticky top-[100px]">
          <div class="d-flex items-center">
            <v-icon size="30" color="primary">mdi-cash-fast</v-icon>
            <div class="text-[20px] font-semibold mr-2">تراکنش ها</div>
          </div>
          <div class="flex-between my-4">
            <div class="w-[250px]">
              <v-select
                outlined
                v-model="transactionTime"
                :items="transactionTimes"
                item-value="id"
                item-text="title"
                hide-details
              />
            </div>
            <div class="text-[12px] d-flex items-center">
              مبلغ کل
              <span class="mx-1 text-base">0</span>
              ریال
            </div>
          </div>
          <v-divider />
          <div class="mt-4">
            <div class="flex-center h-[300px]">
              متاسفانه هیچ تراکنشی در این بازه زمانی یافت نشد
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <invoice-server-dialog />
  </v-container>
</template>

<script>
import InvoiceServerDialog from "../../../components/app/panel/finance/InvoiceServerDialog.vue";
export default {
  layout: "panel",
  components: {
    InvoiceServerDialog,
  },
  data: () => ({
    headers: [
      {
        text: "نام سرور",
        align: "center",
        sortable: false,
        value: "name",
      },
      {
        text: "هزینه",
        align: "center",
        sortable: false,
        value: "cost",
      },
      {
        text: "بیشتر",
        align: "center",
        sortable: false,
        value: "more",
      },
    ],
    items: [
      {
        name: "سرور اول",
        cost: "3000000",
      },
    ],
    transactionTime: "lastWeek",
    transactionTimes: [
      {
        id: "lastWeek",
        title: "هفته اخیر",
      },
      {
        id: "lastMonth",
        title: "ماه اخیر",
      },
      {
        id: "all",
        title: "همه",
      },
    ],
  }),
  methods: {
    openDialog() {
      this.$store.dispatch("Dialog/showDialog", "InvoiceServerDialog");
    },
  },
};
</script>

<style></style>
