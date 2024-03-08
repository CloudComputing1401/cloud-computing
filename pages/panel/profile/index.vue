<template>
  <v-container>
    <div class="pa-4 my-5 rounded-lg shadow-lg bg-white">
      <div class="d-flex items-center">
        <v-icon color="primary" size="75">mdi-account-circle-outline</v-icon>
        <h1 class="regular text-3xl bold color-primary ml-2">پروفایل</h1>
      </div>
      <div class="py-8">
        <h1 class="regular text-lg">مشاهده و ویرایش اطلاعات</h1>
        <v-form
          lazy-validation
          ref="form"
          v-model="validForm"
          @submit.prevent="updateProfile"
        >
          <v-row class="mt-5">
            <v-col cols="12" md="6" class="py-0">
              <v-text-field
                outlined
                label="نام"
                placeholder="نام خود را وارد کنید"
                v-model="user.first_name"
              />
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <v-text-field
                outlined
                label="نام خانوادگی"
                placeholder="نام خانوادگی خود را وارد کنید"
                v-model="user.last_name"
              />
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <v-text-field
                outlined
                label="ایمیل"
                placeholder="ایمیل خود را وارد کنید"
                v-model="user.email"
                readonly
              />
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <v-text-field
                outlined
                label="شماره ملی"
                placeholder="شماره ملی خود را وارد کنید"
                v-model="user.national_id"
                :rules="[rules.required, rules.nationalId]"
              />
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <v-text-field
                outlined
                label="شماره همراه"
                placeholder="شماره همراه خود را وارد کنید"
                v-model="user.phone_number"
                :rules="[rules.phoneNumber]"
              />
            </v-col>
          </v-row>
          <div class="d-flex flex-row-reverse">
            <v-btn type="submit" color="primary" height="55">
              ذخیره اطلاعات
            </v-btn>
          </div>
        </v-form>
      </div>
      <v-divider></v-divider>
      <div class="py-8">
        <h1 class="regular text-lg">تغییر رمز عبور</h1>
        <v-form
          lazy-validation
          ref="form"
          v-model="validForm"
          @submit.prevent="changePassword"
        >
          <v-row class="mt-5">
            <v-col cols="12" md="6" class="py-0">
              <v-text-field
                outlined
                label="رمز عبور جدید"
                placeholder="رمز عبور جدید را وارد کنید"
                v-model="password.new_password"
                type="password"
              />
            </v-col>
          </v-row>
          <div class="d-flex flex-row-reverse">
            <v-btn type="submit" color="primary" height="55">
              تغییر رمز عبور
            </v-btn>
          </div>
        </v-form>
      </div>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  layout: "panel",
  data() {
    return {
      validForm: false,
      rules: {
        required: (value) => !!value || "این فیلد اجباری است.",
        nationalId: (value) =>
          /^(?:\d{10}|\d{12})$/.test(value) || "شماره ملی معتبر نیست.",
        phoneNumber: (value) =>
          value === "" ||
          value === undefined ||
          /^(09\d{9})$/.test(value) ||
          "شماره همراه معتبر نیست.",
      },

      user: {
        id: null,
        first_name: "",
        last_name: "",
        email: "",
        national_id: "",
        phone_number: "",
      },
      password: {
        new_password: "",
      },
    };
  },
  mounted() {
    this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      try {
        const response = await this.$get("users/profile");
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    },
    async updateProfile() {
      try {
        const response = await this.$put("users/profile/", this.user);
        console.log("Profile updated successfully:", response.data);

        this.$toast.success("اطلاعات با موفقیت به‌روز شد.", {
          timeout: 3000,
        });
      } catch (error) {
        console.error("Error updating user profile:", error);
        this.$toast.error("مشکلی در به‌روزرسانی اطلاعات به وجود آمد.", {
          timeout: 4000,
        });
      }
    },
    async changePassword() {
      try {
        const response = await this.$put(
          "users/change-password/",
          this.password
        );
        this.$toast.success("اطلاعات با موفقیت به‌روز شد.", {
          timeout: 3000,
        });
      } catch (error) {
        console.error("Error changing password:", error);
        this.$toast.error("مشکلی در تغییر رمز عبور به وجود آمد.", {
          timeout: 4000,
        });
      }
    },
  },
};
</script>

<style scoped></style>
