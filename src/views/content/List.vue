<template>

</template>
<script>
  import { reactive, watchEffect  } from 'vue';
  export default {
    name:"List",
    data(){
      return {

      }
    },
    mounted() {
      console.log(this.$store.state.name);
    },
    methods:{

    }
  }

</script>


<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
}

/*.product-item {
  width: calc(25% - 10px);
  margin-right: 20px;
  margin-bottom: 20px;
}*/
</style>