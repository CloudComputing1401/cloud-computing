<template>
  <v-container>
    <div class="pa-4 my-5 rounded-lg custom-shadow">
      <div class="text-center mb-5">
        <v-icon color="primary" size="75">mdi-content-save-edit-outline</v-icon>
        <h1 class="font-weight-bold mt-3 text-2xl">ویرایش پروژه</h1>
      </div>
      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-form>
            <v-text-field label="نام پروژه" outlined />
            <v-textarea label="توضیحات" outlined />
            <v-btn
              block
              class="primary"
              height="50"
              @click="$router.push('/panel/projects/ali')"
              >ویرایش پروژه</v-btn
            >
          </v-form>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  layout: "panel",
};
</script>

<style>
</style>