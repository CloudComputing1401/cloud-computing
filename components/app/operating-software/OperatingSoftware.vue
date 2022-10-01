<template>
  <div class="rounded-lg border-2 border-primary">
    <div class="text-center bg-primary py-3">
      <h1 class="text-white regular text-lg">
        نرم افزار های آماده نصب پس از ساخت ماشین
      </h1>
    </div>
    <div class="p-4">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="2" v-for="i in 8" :key="i">
          <div class="p-3 custom-shadow rounded-md text-center">
            <div class="w-full h-[100px] d-flex justify-center">
              <img
                src="/img/software-img.svg"
                alt=""
                class="p-0 max-w-full max-h-[100px]"
              />
            </div>
            <h2 class="regular mt-2">Adobe After Effects</h2>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>