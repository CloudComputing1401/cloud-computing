<template>
  <div class="rounded-lg border-2 border-primary regular">
    <div class="text-center bg-primary py-3">
      <h1 class="text-white text-lg">تنظیمات دسترسی</h1>
    </div>
    <div class="p-4">
      <div class="p-3 rounded border border-blue-300 d-flex items-center">
        <v-icon color="#60a5fa"> mdi-alert-circle-outline </v-icon>
        <div class="mr-2 text-[#60a5fa] text-xl">
          انتخاب یکی از گزینه های زیر اجباریست
        </div>
      </div>
      <div class="custom-shadow p-4 rounded mt-10">
        <h3 class="text-xl font-bold">فعال سازی رمز عبور</h3>
        <div class="d-flex justify-between items-center">
          <div>
            با فعال کردن این قسمت یک رمز عبور تصادفی به ایمیل شما ارسال می شود.
          </div>
          <v-switch inset></v-switch>
        </div>
      </div>
      <div class="custom-shadow p-4 rounded mt-10">
        <h3 class="text-xl font-bold">افزودن کلید (SSH key)</h3>
        <div class="d-flex justify-between items-center my-5">
          <div>
            برای دسترسی راحت تر به ماشین در این قسمت کلید خود را مشخص کنید.
          </div>
          <v-btn color="primary">افزودن کلید</v-btn>
        </div>
        <v-expansion-panels accordion>
          <v-expansion-panel>
            <v-expansion-panel-header
              >مشاهده لیست کلید ها</v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <div v-for="i in 4" :key="i">
                <v-radio-group v-model="radioGroup" hide-details>
                  <div class="d-flex justify-between items-center">
                    <v-radio :label="`Radio ${i}`" :value="i"></v-radio>
                    <v-btn text color="red">
                      <v-icon color="red">mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </v-radio-group>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radioGroup: 1,
    };
  },
  watch: {
    radioGroup(val) {
      console.log(val);
    },
  },
};
</script>

<style>
</style>