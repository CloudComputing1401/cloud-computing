<template>
  <v-row class="mt-4">
    <v-col cols="12" md="6" lg="3">
      <div
        class="
          p-3
          border-2 border-primary
          rounded-md
          transition
          duration-200
          hover:shadow-2xl
        "
      >
        <div class="w-full h-[150px] d-flex justify-center items-center">
          <img src="/img/windows.png" alt="" class="max-w-full max-h-[150px]" />
        </div>
        <h3 class="font-bold my-2 text-center">windows</h3>
        <v-select
          outlined
          label="انتخاب ورژن"
          dense
          hide-details
          no-data-text="داده ای وجود ندارد!"
        ></v-select>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
      ],
    };
  },
};
</script>

<style>
</style>