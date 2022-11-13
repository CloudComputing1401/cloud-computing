<template>
  <v-container>
    <div class="p-5 my-5 rounded-lg custom-shadow">
      <div class="d-flex items-center justify-between">
        <div class="d-flex">
          <div class="bg-primary p-5 rounded-md">
            <v-icon color="#fff" size="60">mdi-file-cloud-outline</v-icon>
          </div>
          <div class="my-3 mr-2">
            <h2 class="text-2xl font-weight-bold">نام پروژه</h2>
            <div class="mt-2">اطلاعات پروژه</div>
          </div>
        </div>
        <v-btn
          color="primary"
          @click="$router.push(`/panel/projects/${'ali'}/edit`)"
        >
          ویرایش پروژه
        </v-btn>
      </div>
      <v-divider class="my-5" />
      <div>
        <v-tabs v-model="tab">
          <v-tabs-slider color="primary"></v-tabs-slider>
          <v-tab v-for="item in menuTabs" :key="item">
            <span class="font-weight-bold">{{ item }}</span>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <services />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <setting />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <firewall />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <backup-copies />
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>
  </v-container>
</template>

<script>
import BackupCopies from "../../../../components/app/panel/projects/backup/BackupCopies.vue";
import Firewall from "../../../../components/app/panel/projects/firewall/Firewall.vue";
import Services from "../../../../components/app/panel/projects/services/Services.vue";
import Setting from "../../../../components/app/panel/projects/setting/Setting.vue";
export default {
  components: { Services, Setting, Firewall, BackupCopies },
  layout: "panel",
  data() {
    return {
      tab: null,
      menuTabs: ["سرویس ها", "تنظیمات", "فایروال", "نسخه های پشتیبان"],
    };
  },
};
</script>

<style scoped>
/* .v-tab {
  background-color: rebeccapurple !important;
} */
</style>