<template>
  <v-container>
    <div v-if="activeUser" class="my-5">
      <div class="bg-white rounded-md shadow-lg p-4">
        <div class="d-flex items-center">
          <v-icon size="70" color="primary">mdi-folder-cog</v-icon>
          <span class="mr-2 text-2xl font-semibold text-primary"
            >لیست پروژه ها</span
          >
        </div>
        <v-row class="mt-5">
          <v-col cols="6" sm="4" md="3" lg="2">
            <div
              @click="$router.push('/panel/projects/add-project')"
              class="w-[150] h-[150px] flex-center bg-[#2c3e50] rounded-md select-none cursor-pointer"
            >
              <div class="text-center text-white">
                <div class="mb-2">ایجاد پروژه</div>
                <v-icon color="white" size="40">mdi-plus</v-icon>
              </div>
            </div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
            md="3"
            lg="2"
            v-for="project in projectData"
            :key="project.id"
          >
            <div
              class="w-full h-[150px] flex-center bg-[#2c3e50] rounded-md select-none cursor-pointer"
              @click="$router.push(`/panel/projects/${project.id}`)"
            >
              <div class="text-white w-11/12 overflow-hidden">
                {{ project.name }}
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="bg-white rounded-md shadow-lg p-4 mt-10">
        <div class="d-flex items-center">
          <v-icon size="70" color="primary">mdi-account-cog</v-icon>
          <span class="mr-2 text-2xl font-semibold text-primary"
            >مدیریت حساب</span
          >
        </div>
        <v-row class="mt-5">
          <v-col
            cols="6"
            sm="4"
            md="3"
            lg="2"
            v-for="(item, index) in manageAccount"
            :key="index"
          >
            <div
              @click="$router.push(`/panel/${item.to}`)"
              class="w-[150] h-[150px] flex-center bg-[#2c3e50] rounded-md select-none cursor-pointer"
            >
              <div class="text-center text-white">
                <div class="mb-2">{{ item.name }}</div>
                <v-icon color="white" size="40">{{ item.icon }}</v-icon>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <div v-else class="w-full h-[500px] flex-center">
      <div class="w-[50%] py-[44px] shadow-xl rounded-md bg-white flex-center">
        <div class="text-center">
          <v-icon size="100">mdi-cloud-clock</v-icon>
          <div class="font-semibold mt-3">
            در انتظار تایید اطلاعات توسط ادمین
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  layout: "panel",
  data: () => ({
    activeUser: null,
    manageAccount: [
      {
        name: "پروفایل",
        icon: "mdi-account-circle",
        to: "profile",
      },
      {
        name: "امور مالی",
        icon: "mdi-account-credit-card",
        to: "finance",
      },
    ],
    projectData: [],
  }),
  mounted() {
    this.activeUser = this.$store.getters["User/getActiveUser"];
    this.getProjectsData();
  },
  methods: {
    async getProjectsData() {
      try {
        const data = await this.$get("service/projects");
        this.projectData = data.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
