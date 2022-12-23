<template>
  <div class="p-4 bg-white relative">
    <div class="absolute left-4 top-4">
      <v-icon class="cursor-pointer" @click="$emit('closeDialog')"
        >mdi-close</v-icon
      >
    </div>
    <h1 class="text-[24px] font-bold my-4 text-center">جداسازی هارد دیسک</h1>
    <div class="mb-5 text-justify">
      آیا از جداسازی هارد دیسک از سرور ابری اطمینان دارید؟
    </div>
    <div class="regular my-4">
      <span>متصل شده به سرور ابری</span>
      <span class="mr-1 cursor-pointer text-lg text-blue-500">test</span>
    </div>
    <v-btn block height="40" color="primary" @click="deleteBackup">
      جداسازی
    </v-btn>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>