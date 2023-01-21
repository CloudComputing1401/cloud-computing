<template>
  <div
    class="text-center rounded-lg border-2 border-primary select-none cursor-pointer duration-300 hover:translate-y-[-8px] hover:shadow-2xl"
    :class="serverSelected ? 'selected-box' : null"
    @click="serverSelected = true"
  >
    <div class="bg-primary py-3 text-white">
      <h1 class="text-xl">{{ serverInfo.name }}</h1>
      <!-- <h1 class="text-xl">6,000 ریال/ ساعتی</h1>
                    <h3 class="text-lg">144,000 ریال/ روزانه</h3> -->
    </div>
    <div class="pa-2">
      <div class="my-2 flex-center">
        <span class="text-sm">CPU</span>
        <span class="mr-1 font-semibold text-lg">
          {{ serverInfo.cpu.size }}
        </span>
      </div>
      <div class="my-2 flex-center">
        <span class="text-sm">RAM</span>
        <span class="text-sm mx-1">
          {{ serverInfo.ram.unit.toUpperCase() }}
        </span>
        <span class="font-semibold text-lg">
          {{ serverInfo.ram.size }}
        </span>
      </div>
      <div class="my-2 flex-center">
        <span class="text-sm">RAM</span>
        <span class="text-sm mx-1">
          {{ serverInfo.disk.unit.toUpperCase() }}
        </span>
        <span class="font-semibold text-lg">
          {{ serverInfo.disk.size }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    serverInfo: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    serverSelected: false,
  }),
  methods: {
    // serverSelected(){
    //     console.log();
    // }
  },
};
</script>

<style scoped>
.selected-box {
  background-color: rebeccapurple !important;
}
</style>
