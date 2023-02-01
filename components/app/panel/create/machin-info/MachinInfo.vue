<template>
  <div class="rounded-lg border-2 border-primary regular">
    <div class="text-center bg-primary py-3">
      <h1 class="text-white text-lg">مشخصات ماشین</h1>
    </div>
    <div class="p-4">
      <h3 class="text-xl font-bold">مرحله پایانی</h3>
      <v-row class="mt-5">
        <v-col cols="12" sm="4">
          <h4 class="text-lg font-bold">تعداد ماشین ها</h4>
          <div class="d-flex items-center mt-3">
            <v-btn color="primary" height="60" @click="counter++">
              <span class="text-[24px]">+</span>
            </v-btn>
            <div
              class="flex-center border-2 border-primary rounded w-[110px] h-[55px] mx-2 select-none text-[20px]"
            >
              {{ counter }}
            </div>
            <v-btn color="primary" :disabled="counter <= 1" @click="counter--">
              <span class="text-[24px]">-</span>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" sm="5">
          <h4 class="text-lg font-bold">نام ماشین</h4>
          <v-text-field
            outlined
            height="45"
            label="نام ماشین"
            v-model="name"
            :rules="[(v) => !!v || 'وارد کردن نام پروژه الزامی است']"
            class="mt-3"
          />
        </v-col>
        <v-col cols="12" sm="3">
          <h4 class="text-lg font-bold">پروژه</h4>
          <v-select
            v-model="project"
            label="پروژه"
            outlined
            :items="projectList"
            item-text="name"
            item-value="id"
            :rules="[(v) => !!v || 'انتخاب پروژه الزامی است']"
            no-data-text="پروژه ای یافت نشد"
            class="mt-3"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      dafault: () => ({ machinNumber: 1 }),
    },
  },
  data: () => ({
    counter: 0,
    name: "",
    project: "",
    projectList: [],
  }),
  watch: {
    name(val) {
      const value = this.value;
      value.vmName = val;
      this.$emit("input", value);
    },
    counter(val) {
      const value = this.value;
      value.vmNumber = val;
      this.$emit("input", value);
    },
    project(val) {
      console.log(val, "project");
      const value = this.value;
      value.projectId = val;
      this.$emit("input", value);
    },
  },
  mounted() {
    this.counter = 1;
    this.getProjects();
  },
  methods: {
    async getProjects() {
      try {
        this.projectList = (await this.$get("service/projects")).data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
