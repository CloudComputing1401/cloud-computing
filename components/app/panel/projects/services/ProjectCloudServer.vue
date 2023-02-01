<template>
  <div>
    <div class="flex-between my-[30px]">
      <h2 class="text-[28px] font-bold">سرورهای ابری</h2>
      <v-btn color="primary">سرور ابری جدید</v-btn>
    </div>
    <div
      :class="[
        loading || serversData.length === 0 ? 'flex-center' : null,
        'min-h-[200px]',
      ]"
    >
      <loading v-if="loading" />
      <template v-if="!loading">
        <cloud-servers
          v-for="serverData in serversData"
          :key="serverData.id"
          :serverData="serverData"
        />
        <div v-if="serversData.length === 0">
          <h1 class="regular text-xl">اطلاعاتی یافت نشد!</h1>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import CloudServers from "../../cloud-servers/CloudServers.vue";
export default {
  components: { CloudServers },
  data() {
    return {
      serversData: [],
      loading: true,
    };
  },
  mounted() {
    this.getServerClouds();
  },
  methods: {
    async getServerClouds() {
      try {
        this.serversData = (
          await this.$get("service/vm/", {
            project_id: this.$route.params.id,
          })
        ).data.data;
        console.log(this.serversData, "hosseinali");
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },
  },
};
</script>

<style></style>
