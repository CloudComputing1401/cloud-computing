<template>
  <v-dialog max-width="400" v-model="dialog">
    <div class="bg-white p-4">
      <div class="text-xl font-semibold text-center my-5">
        آیا از حذف این قانون اطمینان دارید؟
      </div>
      <div class="flex-center mt-5">
        <v-btn color="red" @click="dialog = false" class="ml-3">
          <span class="text-white"> انصراف </span>
        </v-btn>
        <v-btn color="primary" @click="deleteRule" :loading="loading"
          >بله</v-btn
        >
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      ruleData: null,
      loading: false,
    };
  },
  watch: {
    dialog(val) {
      if (!val && this.$store.getters["Dialog/active"] === "DeleteRuleDialog") {
        this.$store.dispatch("Dialog/showDialog", "");
      }
    },
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters["Dialog/active"],
      (newValue) => {
        if (newValue === "DeleteRuleDialog") {
          this.ruleData = this.$store.getters["Dialog/getData"];
          this.dialog = true;
          console.log(this.ruleData);
        }
      }
    );
    this.dialog = this.$store.getters["Dialog/active"] === "DeleteRuleDialog";
  },
  methods: {
    async deleteRule() {
      this.loading = true;
      try {
        const data = await this.$axios.delete("/service/security-group-rule", {
          headers: {
            Authorization: this.$store.getters["Auth/getToken"],
          },
          params: {
            project_id: this.$route.params.id,
            rule_id: this.ruleData.ruleId,
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