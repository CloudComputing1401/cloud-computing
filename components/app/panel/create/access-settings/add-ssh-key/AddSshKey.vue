<template>
  <div class="p-4 bg-white relative">
    <div
      class="absolute left-4 top-4 cursor-pointer"
      @click="$emit('closeDialog')"
    >
      <v-icon>mdi-close</v-icon>
    </div>
    <div class="my-8">
      کد مربوط به public key خود را در این قسمت قرار دهید.(انتخاب نام ضروری است)
    </div>
    <v-form>
      <v-text-field
        outlined
        label="نام"
        placeholder="نام ssh key را وارد کنید"
      />
      <v-textarea outlined placeholder="کلید خود را وارد کنید"></v-textarea>
    </v-form>
    <div class="mt-5 d-flex flex-row-reverse">
      <v-btn color="primary" width="100" class="mr-2">تایید</v-btn>
      <v-btn color="primary" outlined width="100">انصراف</v-btn>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>