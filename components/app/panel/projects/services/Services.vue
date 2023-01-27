<template>
  <div>
    <div>
      <project-cloud-server />
    </div>
    <div>
      <project-heavy-computing />
    </div>
    <div>
      <project-vm-graphic />
    </div>
    <div>
      <project-hard-disk />
    </div>
  </div>
</template>

<script>
import ProjectCloudServer from "./ProjectCloudServer.vue";
import ProjectVmGraphic from "./ProjectVmGraphic.vue";
import ProjectHardDisk from "./ProjectHardDisk.vue";
import ProjectHeavyComputing from "./ProjectHeavyComputing.vue";
export default {
  components: {
    ProjectCloudServer,
    ProjectHeavyComputing,
    ProjectVmGraphic,
    ProjectHardDisk,
  },
};
</script>

<style></style>
