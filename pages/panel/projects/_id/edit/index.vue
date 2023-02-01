<template>
  <v-container>
    <div class="pa-4 my-5 rounded-lg shadow-lg bg-white">
      <div class="text-center mb-5">
        <v-icon color="primary" size="75">mdi-content-save-edit-outline</v-icon>
        <h1 class="font-weight-bold mt-3 text-2xl">ویرایش پروژه</h1>
      </div>
      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-form
            lazy-validation
            ref="form"
            v-model="validForm"
            @submit.prevent="editProject"
          >
            <v-text-field
              label="نام پروژه"
              outlined
              v-model="name"
              :rules="[(v) => !!v || 'وارد کردن نام الزامی است']"
            />
            <v-textarea label="توضیحات" outlined v-model="description" />
            <v-btn
              type="submit"
              block
              class="primary"
              height="50"
              :loading="loading"
              :disabled="!validForm"
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
  data() {
    return {
      projectInfo: null,
      name: "",
      description: "",
      loading: false,
      validForm: true,
    };
  },
  mounted() {
    this.getProjectInfo();
  },
  methods: {
    async getProjectInfo() {
      try {
        const data = (
          await this.$axios.get(`/service/project/${this.$route.params.id}`, {
            headers: {
              Authorization: this.$store.getters["Auth/getToken"],
            },
          })
        ).data;
        this.name = data.name;
        this.description = data.description;
      } catch (err) {}
    },
    async editProject() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          const data = await this.$axios.patch(
            `/service/project/`,
            {
              name: this.name,
              description: this.description,
            },
            {
              headers: {
                Authorization: this.$store.getters["Auth/getToken"],
              },
              params: {
                project_id: this.$route.params.id,
              },
            }
          );
          console.log(data);
          this.loading = false;
        } catch (err) {
          this.loading = false;
        }
      }
    },
  },
};
</script>

<style></style>
