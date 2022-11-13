<template>
  <div>
    <div>
      <cloud-servers />
    </div>
    <div>
      <heavy-computing-servers />
    </div>
    <div>
      <graphics-machines />
    </div>
    <div>
      <haed-disks />
    </div>
  </div>
</template>

<script>
import CloudServers from "./cloud-servers/CloudServers.vue";
import GraphicsMachines from "./graphics-machines/GraphicsMachines.vue";
import HeavyComputingServers from "./heavy-computing-servers/HeavyComputingServers.vue";
import HaedDisks from "./volumes/HardDisks.vue";
export default {
  components: {
    CloudServers,
    GraphicsMachines,
    HaedDisks,
    HeavyComputingServers,
  },
};
</script>

<s
    CloudServerstyle>
</style>