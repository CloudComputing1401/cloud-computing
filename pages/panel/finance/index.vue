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
          <div class="flex-between">
            <div class="d-flex items-center">
              <v-icon size="30" color="primary">mdi-list-box</v-icon>
              <div class="text-[20px] font-semibold mr-2">لیست فاکتورها</div>
            </div>
            <div class="d-flex items-center gap-x-1">
              <span>از</span>
              <client-only>
                <div
                  class="invoice-from-date-input w-[100px] h-[30px] leading-none flex-center border border-solid border-gray-400 rounded-md"
                >
                  {{ invoiceFromDate }}
                </div>
                <date-picker
                  v-model="invoiceFromDate"
                  format="jYYYY/jMM/jDD"
                  custom-input=".invoice-from-date-input"
                  auto-submit
                  :max="maxDate"
                />
              </client-only>
              <span>تا</span>
              <client-only>
                <div
                  class="invoice-to-date-input w-[100px] h-[30px] leading-none flex-center border border-solid border-gray-400 rounded-md"
                >
                  {{ invoiceToDate }}
                </div>
                <date-picker
                  v-model="invoiceToDate"
                  format="jYYYY/jMM/jDD"
                  custom-input=".invoice-to-date-input"
                  auto-submit
                  :max="maxDate"
                />
              </client-only>
              <v-btn color="primary" @click="getInvoicesList"> تایید </v-btn>
            </div>
          </div>
          <v-data-table
            :headers="headers"
            :items="invoicesList"
            :loading="invoiceLoading"
            loading-text="در حال دریافت اطلاعات..."
            no-data-text="فاکتوری در این بازه زمانی ثبت نشده است!"
            hide-default-footer
            class="mt-5"
          >
            <template v-slot:[`item.more`]="{ item }">
              <v-btn text @click="showMore(item)"> جزئیات </v-btn>
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
    <invoice-details-dialog
      v-if="invoiceDetails"
      :invoice-details="invoiceDetails"
    />
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
import InvoiceDetailsDialog from "../../../components/app/panel/finance/InvoiceDetailsDialog.vue";
export default {
  layout: "panel",
  components: {
    InvoiceDetailsDialog,
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
        value: "totalPrice",
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
    invoiceFromDate: moment().subtract(1, "months").format("jYYYY/jMM/jDD"),
    invoiceToDate: moment().format("jYYYY/jMM/jDD"),
    invoiceLoading: false,
    invoiceDetails: undefined,
  }),
  mounted() {
    this.getUserWallet();
    this.getWalletTransactions();
    this.getInvoicesList();
  },
  computed: {
    maxDate() {
      return moment().format("jYYYY-jMM-jDD");
    },
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
    async getInvoicesList() {
      this.invoiceLoading = true;
      this.invoicesList = [];
      try {
        const data = (
          await this.$get("reports/invoices/", {
            start_time: moment(
              this.invoiceFromDate,
              "jYYYY/jMM/jDD"
            ).toISOString(),
            end_time: moment(this.invoiceToDate, "jYYYY/jMM/jDD").toISOString(),
          })
        ).data;
        data.forEach((item) => {
          this.invoicesList.push({
            name: item.invoice_record[0].name,
            description: item.invoice_record[0].description,
            recordType: item.invoice_record[0].record_type,
            isPaid: item.is_paid,
            startDate: moment(item.start_date).format("HH:mm - jYYYY/jMM/jDD"),
            endDate: moment(item.end_date).format("HH:mm - jYYYY/jMM/jDD"),
            totalPrice: new Intl.NumberFormat().format(item.total_amount),
          });
        });
        this.invoiceLoading = false;
      } catch (err) {
        this.invoiceLoading = false;
        console.error(err);
      }
    },
    showMore(invoice) {
      this.$store.dispatch("Dialog/showDialog", "InvoiceServerDialog");
      this.invoiceDetails = invoice;
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
