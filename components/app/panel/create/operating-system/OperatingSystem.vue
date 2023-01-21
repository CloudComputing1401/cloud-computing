<template>
  <div>
    <h2 class="regular text-xl font-semibold">انتخاب سیستم</h2>
    <div :class="[loading ? 'min-h-[200px] flex-center' : null]">
      <loading v-if="loading" />
      <v-row v-else class="mt-4">
        <v-col cols="12" md="6" lg="3" v-for="(os, i) in osLists" :key="i">
          <div
            class="p-3 border-2 border-primary rounded-md transition duration-300 hover:shadow-2xl"
          >
            <div class="w-full h-[150px] flex-center">
              <img :src="os.osPhoto" alt="" class="max-w-full max-h-[150px]" />
            </div>
            <h3 class="font-bold my-2 text-center">{{ os.osDistro }}</h3>
            <v-select
              :items="os.versions"
              item-text="version"
              item-value="id"
              outlined
              label="انتخاب ورژن"
              dense
              hide-details
              no-data-text="داده ای وجود ندارد!"
              v-model="osSelected"
            ></v-select>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      osSelected: null,
      loading: true,
      osLists: [],
    };
  },
  watch: {
    osSelected(val) {
      console.log(val);
    },
  },
  mounted() {
    this.getAllOs();
  },
  methods: {
    async getAllOs() {
      try {
        const data = (await this.$get("service/image")).data.data;

        let temp = [];

        data.forEach((element) => {
          const osDistro = element.os_distro;
          const osPhoto = element.photo;
          let osVersion = [];
          data.forEach((item) => {
            if (item.os_distro === osDistro) {
              osVersion.push({ id: item.id, version: item.os_version });
            }
          });
          temp.push({
            osDistro: osDistro,
            osPhoto: osPhoto,
            versions: osVersion,
          });
        });

        this.osLists = Array.from(new Set(temp.map(JSON.stringify))).map(
          JSON.parse
        );

        this.loading = false;
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
:deep(.v-input input) {
  cursor: pointer !important;
}
</style>
