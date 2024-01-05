<template>
  <div class="rounded-lg border-2 border-primary regular">
    <div class="text-center bg-primary py-3">
      <h1 class="text-white text-lg">تنظیمات دسترسی</h1>
    </div>
    <div class="p-4">
      <!-- <div class="p-3 rounded border border-blue-300 d-flex items-center">
        <v-icon color="#60a5fa"> mdi-alert-circle-outline </v-icon>
        <div class="mr-2 text-[#60a5fa] text-xl">
          انتخاب یکی از گزینه های زیر اجباریست
        </div>
      </div> -->
      <!-- <div class="custom-shadow p-4 rounded mt-10">
        <h3 class="text-xl font-bold">فعال سازی رمز عبور</h3>
        <div class="d-flex justify-between items-center">
          <div>
            با فعال کردن این قسمت یک رمز عبور تصادفی به ایمیل شما ارسال می شود.
          </div>
          <v-switch inset v-model="activePassword"></v-switch>
        </div>
      </div> -->
      <div class="custom-shadow p-4 rounded">
        <h3 class="text-xl font-bold">افزودن کلید (SSH key)</h3>
        <div class="d-flex justify-between items-center my-5">
          <div>
            برای دسترسی راحت تر به ماشین در این قسمت کلید خود را مشخص کنید.
          </div>
          <v-btn color="primary" @click="openDialog">افزودن کلید</v-btn>
        </div>
        <v-expansion-panels accordion>
          <v-expansion-panel>
            <v-expansion-panel-header
              >مشاهده لیست کلید ها</v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <div
                v-if="sshList.length === 0"
                class="d-flex justify-center items-center w-full min-h-[200px]"
              >
                <span class="text-xl"> هنوز کلیدی ثبت نشده است! </span>
              </div>
              <v-radio-group
                v-model="keyPairSelected"
                hide-details
                :disabled="activePassword"
              >
                <div v-for="sshKey in sshList" :key="sshKey.id">
                  <div class="d-flex justify-between items-center">
                    <v-radio :label="sshKey.name" :value="sshKey"></v-radio>
                    <v-btn text color="red">
                      <v-icon color="red">mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-radio-group>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
    <add-ssh-dialog
      @closeDialog="$store.commit('Dialog/setDialogName', '')"
      @updateList="getSshList()"
    />
  </div>
</template>

<script>
import AddSshDialog from "./add-ssh-dialog/AddSshDialog.vue";
export default {
  props: {
    value: {
      type: Object,
      dafault: () => ({ activePassword: false }),
    },
  },
  components: { AddSshDialog },
  data() {
    return {
      keyPairSelected: null,
      activePassword: false,
      addSshkeyDialog: false,
      sshList: [],
    };
  },
  watch: {
    keyPairSelected(val) {
      const value = this.value;
      value.keyPairId = val.id;
      this.$emit("input", value);
    },
    activePassword(val) {
      const value = this.value;
      value.activePassword = val;
      this.$emit("input", value);
    },
  },
  mounted() {
    this.getSshList();
  },
  methods: {
    async getSshList() {
      try {
        this.sshList = (await this.$get("service/keypair")).data.data;
      } catch (err) {
        console.log(err);
      }
    },
    openDialog() {
      this.$store.dispatch("Dialog/showDialog", "AddSshDialog");
    },
  },
};
</script>

<style></style>
