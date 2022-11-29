<template>
  <div>
    <div>
      <project-cloud-server />
    </div>
    <div>
      <project-heavy-computing />
    </div>
    <div>
      <project-graphic-machin />
    </div>
    <div>
      <project-hard-disk />
    </div>
  </div>
</template>

<script>
import ProjectCloudServer from "./ProjectCloudServer.vue";
import ProjectGraphicMachin from "./ProjectGraphicMachin.vue";
import ProjectHardDisk from "./ProjectHardDisk.vue";
import ProjectHeavyComputing from "./ProjectHeavyComputing.vue";
export default {
  components: {
    ProjectCloudServer,
    ProjectHeavyComputing,
    ProjectGraphicMachin,
    ProjectHardDisk,
  },
};
</script>

<style>
</style>