<template>
  <div class="p-4 bg-white relative">
    <v-icon
      class="cursor-pointer absolute left-1 top-1"
      @click="$emit('closeDialog')"
      >mdi-close</v-icon
    >
    <h1 class="text-[24px] font-bold my-4 text-center">حذف هارد دیسک</h1>
    <div class="mb-5 text-justify">از حذف هارد دیسک اطمینان دارید؟</div>
    <v-btn block color="error"> حذف کردن </v-btn>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>