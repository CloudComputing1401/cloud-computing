<template>
  <div class="py-3 min-h-[400px]">
    <div class="mt-5">
      <h1 class="text-2xl font-bold">دسترسی کنسول</h1>
      <div class="mt-5">
        <div>
          از طریق این دسترسی میتوانید به ماشین خود اتصال پیدا کنید. همانند اتصال
          موس و کیبرد به ماشین است.
        </div>
        <div class="d-flex flex-row-reverse">
          <v-btn
            color="primary"
            height="20"
            class="rounded-lg"
            @click="openConsole"
          >
            <v-icon class="ml-2">mdi-monitor</v-icon>
            مشاهده در کنسول
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  props: {
    vmData: {
      type: Object,
      required: true,
    },
  },

  methods: {
    async openConsole() {
      try {
        const response = await this.$get("service/vm/console/", {
          params: {
            project_id: String(this.vmData.project_id),
            virtual_machine_id: String(this.vmData.id),
          },
        });
        const consoleUrl = response.data.data.console_url;
        // Open the console URL in a new tab
        window.open(consoleUrl, "_blank");
      } catch (error) {
        console.error("Error opening console:", error);
      }
    },
  },
};
</script>

<style></style>
