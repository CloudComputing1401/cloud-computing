<template>
  <v-app>
    <v-app-bar app fixed height="80px">
      <div class="w-full d-flex justify-between">
        <div
          v-ripple
          class="p-1 w-[50px] h-[50px] flex-center border border-[#060d2d] rounded-md cursor-pointer"
          @click.stop="drawer = !drawer"
        >
          <v-icon color="#060d2d">mdi-menu</v-icon>
        </div>
        <div class="bg-[#060d2d] py-2 px-3 rounded-md d-flex items-center">
          <h3 class="text-white regular font-semibold">
            خدمات ابری دانشگاه کاشان
          </h3>
        </div>
        <v-menu
          offset-y
          nudge-top="-5px"
          transition="slide-y-transition"
          rounded="lg"
        >
          <template v-slot:activator="{ on, attrs }">
            <div
              class="p-1 w-[50px] h-[50px] lg:w-auto flex-center border border-[#060d2d] rounded-md"
              v-bind="attrs"
              v-on="on"
            >
              <template v-if="$vuetify.breakpoint.mdAndUp">
                <v-icon size="30">mdi-account-circle</v-icon>
                <span class="regular mx-2"> {{ userFullName }} </span>
                <v-icon size="30">mdi-chevron-down</v-icon>
              </template>
              <template v-else>
                <v-icon size="40" color="primary">mdi-account-circle</v-icon>
              </template>
            </div>
          </template>
          <v-list>
            <v-list-item
              class="m-2 px-2 regular rounded-md"
              link
              to="/panel/profile"
            >
              <v-list-item-icon class="ml-3">
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="text-[#060d2d]"
                >پروفایل</v-list-item-title
              >
            </v-list-item>
            <v-list-item
              link
              class="m-2 px-2 regular rounded-md"
              @click="logOut"
            >
              <v-list-item-icon class="ml-3">
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="text-[#060d2d]">خروج</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app right floating color="#060d2d">
      <template v-slot:prepend>
        <div>
          <img src="/img/nav-img.jpg" alt="" />
        </div>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          v-ripple
          link
          exact
          exact-path
          exact-active-class="bg-white text-[#0b052b]"
          :to="item.to"
          class="m-2 px-2 regular rounded-md"
          :class="`${
            !$store.getters['User/getActiveUser']
              ? 'pointer-events-none opacity-50'
              : ''
          }`"
        >
          <v-list-item-icon class="ml-4 my-0 align-self-center">
            <v-icon color="white"> {{ item.icon }} </v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        <v-list-item link class="m-2 px-2 regular rounded-md" @click="logOut">
          <v-list-item-icon class="ml-4 my-0 align-self-center">
            <v-icon color="white">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>خروج</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <div class="h-full bg-[#f2f2f2]">
        <v-expand-transition>
          <Nuxt />
        </v-expand-transition>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      userFullName: "",
      drawer: true,
      menuItems: [
        {
          icon: "mdi-apps",
          title: "داشبورد",
          to: "/panel",
        },
        {
          icon: "mdi-newspaper-variant-outline",
          title: "پروژه ها",
          to: "/panel/projects",
        },
        {
          icon: "mdi-cloud",
          title: "سرور ابری",
          to: "/panel/cloud-server",
        },
        {
          icon: "mdi-cloud-percent",
          title: "محاسبات ابری",
          to: "/panel/cloud-computing",
        },
        {
          icon: "mdi-expansion-card-variant",
          title: "گرافیک ابری",
          to: "/panel/cloud-graphics",
        },
        {
          icon: "mdi-harddisk-plus",
          title: "هارد دیسک",
          to: "/panel/volumes",
        },
        {
          icon: "mdi-wallet",
          title: "امور مالی",
          to: "/panel/finance",
        },
        // {
        //   icon: "mdi-account",
        //   title: "پروفایل",
        //   to: "/panel/profile",
        // },
      ],
      menu: false,
    };
  },
  mounted() {
    this.userFullName = `${this.$store.getters["User/getUserFirstName"]} ${this.$store.getters["User/getUserLastName"]}`;
  },
  methods: {
    logOut() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.v-list-item--link {
  color: white !important;
}

.v-list-item--active,
.v-list-item--active .v-icon {
  color: #060d2d !important;
}
</style>
