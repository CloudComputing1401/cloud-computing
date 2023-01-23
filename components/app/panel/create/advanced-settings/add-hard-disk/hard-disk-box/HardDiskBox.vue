<template>
  <div
    :class="[
      'w-full h-auto rounded-md border-2 border-primary cursor-pointer duration-200 hover:translate-y-[-10px]',
    ]"
    @click="hardSelected"
  >
    <div :class="['text-center py-4 font-semibold bg-primary text-white']">
      <div>40 ریال/ ساعتی</div>
      <div>{{ data.plan }}</div>
    </div>
    <div class="py-4 font-semibold text-center">{{ data.capacity }}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  data: () => ({
    ali: false,
  }),
  methods: {
    hardSelected() {
      this.$emit("hardSelected", this.data);
    },
  },
};
</script>

<style scoped>
.bg-selected {
  background-color: #34495e !important;
  color: #fff !important;
}
</style>