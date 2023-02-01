<template>
  <div>
    <div class="flex-between my-[30px]">
      <h2 class="text-[28px] font-bold">تنظیمات فایروال</h2>
      <v-btn color="primary" @click="openDialog">افزودن گروه</v-btn>
    </div>
    <div class="mt-5">
      <h3 class="text-[20px] font-semibold">گروه های موجود</h3>
      <div
        :class="[
          loading || firewallsData.length === 0 ? 'flex-center' : null,
          'min-h-[200px]',
        ]"
      >
        <loading v-if="loading" />
        <template v-if="!loading">
          <div
            v-for="firewall in firewallsData"
            :key="firewall.id"
            class="border border-[#e6e6e6] rounded-md p-5 my-4"
          >
            <div class="mb-4">
              <div class="text-[20px] font-semibold">
                {{ firewall.name }}
              </div>
              <span> {{ firewall.description }} </span>
            </div>
            <div class="d-flex flex-row-reverse mb-5">
              <v-btn color="primary">افزودن قانون</v-btn>
              <v-btn
                color="red"
                class="ml-3"
                :loading="deleteLoading"
                @click="deleteSecurityGroup(firewall.id)"
              >
                <span class="text-white">حذف گروه</span>
              </v-btn>
            </div>
            <v-data-table
              :headers="headers"
              :items="firewall.security_group_rules"
              no-data-text="داده ای یافت نشد!"
              hide-default-footer
            >
              <template v-slot:[`item.icon`]>
                <v-icon> mdi-security </v-icon>
              </template>
              <template v-slot:[`item.deleteRule`]>
                <v-icon color="red"> mdi-delete </v-icon>
              </template>
            </v-data-table>
          </div>
          <div v-if="firewallsData.length === 0">
            <h1 class="regular text-xl">اطلاعاتی یافت نشد!</h1>
          </div>
        </template>
      </div>
    </div>
    <add-firewall-dialog @update="getFirewalls" />
    <snack-bar />
  </div>
</template>

<script>
import AddFirewallDialog from "./add-firewall-dialog/AddFirewallDialog.vue";
export default {
  components: { AddFirewallDialog },
  data() {
    return {
      firewallsData: [],
      firewallRules: [],
      loading: true,
      deleteLoading: false,
      headers: [
        {
          text: "",
          align: "center",
          sortable: false,
          value: "icon",
        },
        {
          text: "جهت",
          align: "center",
          sortable: false,
          value: "direction",
        },
        {
          text: "پروتکل",
          align: "center",
          sortable: false,
          value: "protocol",
        },
        {
          text: "پورت ها",
          align: "center",
          sortable: false,
          value: "ports",
        },
        {
          text: "مبدا/مقصد",
          align: "center",
          sortable: false,
          value: "originDestination",
        },
        {
          text: "",
          align: "center",
          sortable: false,
          value: "deleteRule",
        },
      ],
    };
  },
  mounted() {
    this.getFirewalls();
  },
  methods: {
    openDialog() {
      this.$store.dispatch("Dialog/showDialog", "AddFirewallDialog");
    },
    async getFirewalls() {
      this.loading = true;
      try {
        this.firewallsData = (
          await this.$axios.get("/service/security-groups", {
            headers: {
              Authorization: this.$store.getters["Auth/getToken"],
            },
            params: {
              project_id: this.$route.params.id,
            },
          })
        ).data.data;
        this.loading = false;
      } catch (err) {}
    },
    async deleteSecurityGroup(id) {
      this.deleteLoading = true;
      try {
        const data = await this.$axios.delete("/service/security-groups", {
          headers: {
            Authorization: this.$store.getters["Auth/getToken"],
          },
          params: {
            project_id: this.$route.params.id,
            security_id: id,
          },
        });
        this.deleteLoading = false;
        this.$store.dispatch("SnackBar/show", "گروه با موفقیت حذف شد.");
        this.getFirewalls();
      } catch (err) {}
    },
  },
};
</script>

<style></style>
