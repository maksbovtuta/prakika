<template>
<div class="wrapper">
    <div class="student-info">
      <img :src="student.photo" :alt="student.name" class="student-photo" />
    </div>
    <div class="info">
      <h2>{{ student.name }}</h2>
      <h3>
        {{ student.group }}
      </h3>
      <h3>
        Grade:
        {{ student.grade }}
      </h3>
      <div v-if="student.isDonePr === true">
        <h3>Practice yes</h3>
      </div>
      <div v-else>
        <h3>Practice no</h3>
      </div>
    </div>
  </div>
  
</template>
<script>
    import axios from "axios";

export default {
  props: {
    id: "",
  },
  data() {
    return {
      student: {},
    };
  },
  mounted() {
    axios
      .get("http://34.82.81.113:3000/students/" + this.id)
      .then((response) => {
        this.student = response.data;
      });
  },
};

</script>