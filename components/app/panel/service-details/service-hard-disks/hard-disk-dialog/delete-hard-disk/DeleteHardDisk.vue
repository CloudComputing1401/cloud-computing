<template>
  <div class="p-4 bg-white relative">
    <div class="absolute left-4 top-4">
      <v-icon class="cursor-pointer" @click="$emit('closeDialog')"
        >mdi-close</v-icon
      >
    </div>
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