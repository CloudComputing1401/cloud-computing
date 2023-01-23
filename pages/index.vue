<template>
  <div class="flex-center h-full w-full">
    <div class="w-[600px] bg-white rounded-lg shadow-md p-5">
      <h1 class="regular text-4xl text-center my-10">
        ارائه خدمات ابری دانشگاه کاشان
      </h1>
      <div class="d-flex justify-around mb-5">
        <v-btn
          width="150"
          height="50"
          color="primary"
          @click="$router.push('/login')"
          >ورود</v-btn
        >
        <v-btn
          width="150"
          height="50"
          color="primary"
          @click="$router.push('/register')"
          >ثبت نام</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style></style>
