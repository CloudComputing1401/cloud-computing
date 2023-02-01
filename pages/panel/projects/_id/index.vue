<template>
  <v-container>
    <div class="pa-4 my-5 rounded-lg shadow-lg bg-white">
      <div class="d-flex items-center justify-between">
        <div class="d-flex">
          <div class="bg-primary p-5 rounded-md">
            <v-icon color="#fff" size="60">mdi-file-cloud-outline</v-icon>
          </div>
          <div class="my-3 mr-2">
            <h2 class="text-2xl font-weight-bold">{{ projectInfo?.name }}</h2>
            <div class="mt-2">{{ projectInfo?.description }}</div>
          </div>
        </div>
        <v-btn
          color="primary"
          @click="$router.push(`/panel/projects/${projectInfo.id}/edit`)"
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
              <project-setting />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <project-firewalls />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <project-backup-copies />
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>
  </v-container>
</template>

<script>
import ProjectBackupCopies from "../../../../components/app/panel/projects/project-backup/ProjectBackupCopies.vue";
import ProjectFirewalls from "../../../../components/app/panel/projects/project-firewalls/ProjectFirewalls.vue";
import ProjectSetting from "../../../../components/app/panel/projects/project-setting/ProjectSetting.vue";
import Services from "../../../../components/app/panel/projects/services/Services.vue";
export default {
  components: {
    Services,
    ProjectSetting,
    ProjectFirewalls,
    ProjectBackupCopies,
  },
  layout: "panel",
  data() {
    return {
      tab: null,
      menuTabs: ["سرویس ها", "تنظیمات", "فایروال", "نسخه های پشتیبان"],
      projectInfo: null,
    };
  },
  mounted() {
    this.getProjectInfo();
  },
  methods: {
    async getProjectInfo() {
      try {
        this.projectInfo = (
          await this.$axios.get(`/service/project/${this.$route.params.id}`, {
            headers: {
              Authorization: this.$store.getters["Auth/getToken"],
            },
          })
        ).data;
      } catch (err) {}
    },
  },
};
</script>

<style scoped>
/* .v-tab {
  background-color: rebeccapurple !important;
} */
</style>
