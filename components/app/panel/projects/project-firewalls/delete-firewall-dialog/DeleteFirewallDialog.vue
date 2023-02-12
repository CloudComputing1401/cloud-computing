<template>
  <v-dialog max-width="400" v-model="dialog">
    <div class="bg-white p-4">
      <div class="text-xl font-semibold text-center my-5">
        آیا از حذف گروه امنیتی اطمینان دارید؟
      </div>
      <div class="flex-center mt-5">
        <v-btn color="red" @click="dialog = false" class="ml-3">
          <span class="text-white"> انصراف </span>
        </v-btn>
        <v-btn color="primary" @click="deleteFirewall" :loading="loading"
          >بله</v-btn
        >
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    firewallData: null,
    loading: false,
  }),
  watch: {
    dialog(val) {
      if (
        !val &&
        this.$store.getters["Dialog/active"] === "DeleteFirewallDialog"
      ) {
        this.$store.dispatch("Dialog/showDialog", "");
      }
    },
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters["Dialog/active"],
      (newValue) => {
        if (newValue === "DeleteFirewallDialog") {
          this.firewallData = this.$store.getters["Dialog/getData"];
          this.dialog = true;
        }
      }
    );
    this.dialog =
      this.$store.getters["Dialog/active"] === "DeleteFirewallDialog";
  },
  methods: {
    async deleteFirewall() {
      this.loading = true;
      try {
        const data = await this.$axios.delete("/service/security-groups", {
          headers: {
            Authorization: this.$store.getters["Auth/getToken"],
          },
          params: {
            project_id: this.$route.params.id,
            security_id: this.firewallData.firewallId,
          },
        });
        this.loading = false;
        this.$emit("update");
        this.dialog = false;
      } catch (err) {}
    },
  },
};
</script>

<style>
</style>