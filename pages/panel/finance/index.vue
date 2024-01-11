<template>
  <v-container>
    <v-row class="my-5">
      <v-col cols="12" md="7">
        <div class="pa-4 rounded-lg shadow-lg bg-white">
          <div class="w-full flex-between">
            <div class="d-flex items-center">
              <v-icon size="30" color="primary">mdi-wallet</v-icon>
              <div class="text-[20px] font-semibold mr-2">موجودی کیف پول</div>
            </div>
            <div class="d-flex items-center gap-x-1">
              <div v-if="!balanceLoading" class="text-sm">
                <span class="text-[20px] font-semibold ml-1">{{
                  userBalance
                    ? new Intl.NumberFormat().format(userBalance)
                    : "0"
                }}</span>
                ریال
              </div>
              <div v-else>
                <v-progress-circular
                  :size="20"
                  :width="2"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </div>
              <!-- <v-btn color="primary" @click="increaseWalletDialog">
                افزایش موجودی
              </v-btn> -->
            </div>
          </div>
          <div class="mt-10 d-flex gap-x-2">
            <div class="ml-4 text-justify">
              با شارژ کیف پول خود دیگر نگران از دست دادن منابع خود نباشید. لازم
              به ذکر است برای یهره مندی از تخفیفات و شارژ های هدیه تیکت ثبت
              نمایید یا با پشتیبانی تماس حاصل فرمایید.
            </div>
            <v-btn color="primary" @click="increaseWalletDialog">
              افزایش موجودی
            </v-btn>
            <v-btn color="primary" @click="increaseWalletListDialog">
              لیست درخواست ها
            </v-btn>
          </div>
        </div>
        <div class="pa-4 mt-5 rounded-lg shadow-lg bg-white h-[500px]">
          <div class="d-flex items-center">
            <v-icon size="30" color="primary">mdi-list-box</v-icon>
            <div class="text-[20px] font-semibold mr-2">لیست فاکتورها</div>
          </div>
          <v-data-table
            :headers="headers"
            :items="invoicesList"
            no-data-text="فاکتوری ثبت نشده است!"
            hide-default-footer
            class="mt-5"
          >
          </v-data-table>
        </div>
      </v-col>
      <v-col cols="12" md="5">
        <div class="pa-4 rounded-lg shadow-lg bg-white sticky top-[100px]">
          <div class="d-flex items-center">
            <v-icon size="30" color="primary">mdi-cash-fast</v-icon>
            <div class="text-[20px] font-semibold mr-2">تراکنش ها</div>
          </div>
          <div class="flex-between gap-x-4 my-4">
            <v-select
              outlined
              label="زمان تراکنش"
              v-model="transactionTime"
              :items="transactionTimes"
              item-value="id"
              item-text="title"
              hide-details
              @change="getWalletTransactions"
            />
            <v-select
              outlined
              label="نوع تراکنش"
              v-model="transactionType"
              :items="transactionTypes"
              item-value="id"
              item-text="title"
              hide-details
              @change="getWalletTransactions"
            />
          </div>
          <v-divider />
          <div class="mt-4 min-h-[300px]">
            <div v-if="transactionListLoading" class="flex-center h-[300px]">
              <loading />
            </div>
            <template v-else>
              <div
                v-if="transactionList.length === 0"
                class="flex-center h-[300px]"
              >
                متاسفانه هیچ تراکنشی در این بازه زمانی یافت نشد
              </div>
              <div v-else class="flex flex-col gap-y-4">
                <div
                  v-for="transaction in transactionList"
                  :key="transaction.id"
                  class="d-flex items-start border border-gray-300 rounded-lg p-4"
                >
                  <div class="flex flex-col gap-y-3">
                    <div>
                      <span class="text-gray-500">نوع تراکنش : </span>
                      <span class="font-bold text-lg mr-2">
                        {{
                          transaction.transaction_type === "deposit"
                            ? "واریز"
                            : "برداشت"
                        }}
                      </span>
                    </div>
                    <div>
                      <span class="text-gray-500">زمان : </span>
                      <span>
                        {{ getTransactionTime(transaction.created_time) }}
                      </span>
                    </div>
                  </div>
                  <div class="text-sm mt-1">
                    <span class="text-[20px] font-semibold ml-1">{{
                      userBalance
                        ? new Intl.NumberFormat().format(transaction.amount)
                        : "0"
                    }}</span>
                    ریال
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </v-col>
    </v-row>
    <invoice-server-dialog />
    <increase-wallet-dialog />
    <increase-wallet-request-list-dialog
      :request-list="walletRequestList"
      :loading="getIncreaseWalletRequestsLoading"
      @close="walletRequestList = []"
    />
  </v-container>
</template>

<script>
import moment from "moment-jalaali";

import IncreaseWalletDialog from "../../../components/app/panel/finance/IncreaseWalletDialog.vue";
import IncreaseWalletRequestListDialog from "../../../components/app/panel/finance/IncreaseWalletRequestListDialog.vue";
import InvoiceServerDialog from "../../../components/app/panel/finance/InvoiceServerDialog.vue";
export default {
  layout: "panel",
  components: {
    InvoiceServerDialog,
    IncreaseWalletDialog,
    IncreaseWalletRequestListDialog,
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
    invoicesList: [],
    transactionTime: "all",
    transactionTimes: [
      {
        id: "all",
        title: "همه",
      },
      {
        id: "lastWeek",
        title: "هفته اخیر",
      },
      {
        id: "lastMonth",
        title: "ماه اخیر",
      },
    ],
    transactionType: "all",
    transactionTypes: [
      {
        id: "all",
        title: "همه",
      },
      {
        id: "deposit",
        title: "واریز",
      },
      {
        id: "withdraw",
        title: "برداشت",
      },
    ],
    transactionListLoading: true,
    transactionList: [],
    userBalance: 0,
    balanceLoading: true,
    getIncreaseWalletRequestsLoading: false,
    walletRequestList: [],
  }),
  mounted() {
    this.getUserWallet();
    this.getWalletTransactions();
  },
  methods: {
    async getUserWallet() {
      try {
        this.userBalance = (await this.$get("wallet")).data.balance
          .toString()
          .split(".")[0];
        this.balanceLoading = false;
      } catch (err) {
        this.balanceLoading = false;
        console.log(err);
      }
    },
    async getWalletTransactions() {
      const params = {
        ...(this.transactionTime !== "all" && {
          start_date: moment(new Date())
            .subtract(this.transactionTime === "lastWeek" ? 7 : 30, "day")
            .format("YYYY-MM-DD"),
          end_date: moment(new Date()).format("YYYY-MM-DD"),
        }),
        ...(this.transactionType !== "all" && {
          transaction_type: this.transactionType,
        }),
      };
      this.transactionListLoading = true;
      try {
        this.transactionList = (
          await this.$get("wallet/wallet-transactions/", params)
        ).data;
        this.transactionListLoading = false;
      } catch (err) {
        this.transactionListLoading = false;
        console.error(err);
      }
    },
    showMore() {
      this.$store.dispatch("Dialog/showDialog", "InvoiceServerDialog");
    },
    increaseWalletDialog() {
      this.$store.dispatch("Dialog/showDialog", "IncreaseWalletDialog");
    },
    increaseWalletListDialog() {
      this.$store.dispatch(
        "Dialog/showDialog",
        "IncreaseWalletRequestListDialog"
      );
      this.getIncreaseWalletRequests();
    },
    async getIncreaseWalletRequests() {
      this.getIncreaseWalletRequestsLoading = true;
      try {
        this.walletRequestList = (
          await this.$get("wallet/user_requests/")
        ).data;
        this.getIncreaseWalletRequestsLoading = false;
      } catch (err) {
        this.getIncreaseWalletRequestsLoading = false;
        console.error(err);
      }
    },
    getTransactionTime(date) {
      return date ? moment(date).format("HH:mm - jYYYY/jMM/jDD") : "-";
    },
  },
};
</script>

<style></style>
