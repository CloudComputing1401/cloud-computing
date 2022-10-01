<template>
  <v-app>
    <v-main class="main-box">
      <v-container class="w-full h-full">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
}
</script>
<style>
.main-box{
  background-image: url('/img/bg.jpg');
  background-position: center;
  background-size: cover;
}
</style>
