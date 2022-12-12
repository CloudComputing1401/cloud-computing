<template>
  <div>
    <div>
      <h1 class="my-[20px] text-[20px] font-bold">مشخصات پروژه</h1>
      <div class="d-flex justify-between">
        <div>
          شما میتوانید اطلاعات مربوط به پروژه، شامل نام و توضیحات پروژه را
          بروزرسانی کنید.
        </div>
        <v-btn
          color="primary"
          @click="$router.push(`/panel/projects/${'ali'}/edit`)"
          >تغییر مشخصات</v-btn
        >
      </div>
    </div>
    <v-divider class="my-5" />
    <div>
      <h1 class="my-[20px] text-[20px] font-bold text-red-500">حذف پروژه</h1>
      <div class="d-flex justify-between">
        <div>
          با حذف کردن پروژه ، تمام اطلاعات آن شامل سرورهای ابری و داده های
          مربوطه حذف خواهد شد و غیر قابل بازگشت میباشند.
        </div>
        <v-btn color="red" outlined>حذف پروژه</v-btn>
      </div>
      <div class="d-flex items-center p-5 bg-red-500 rounded mt-4">
        <v-icon color="white">mdi-alert-circle-outline</v-icon>
        <div class="mr-2 text-white">
          دقت داشته باشید که در صورت حذف پروژه، اطلاعات و منابع غیر قابل بازگشت
          میباشند.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>