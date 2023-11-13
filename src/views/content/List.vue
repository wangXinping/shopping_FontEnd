<template>
<!--  <div>
    <a-checkbox
        v-model:checked="this.state.checkAll"
        :indeterminate="state.indeterminate"
        @change="onCheckAllChange"
    >
      Check all
    </a-checkbox>
  </div>
  <a-divider />
  <a-checkbox-group v-model:value="state.checkedList" :options="plainOptions" />-->
</template>
<script>
  import { reactive, watchEffect  } from 'vue';
  export default {
    name:"List",
    data(){
      return{

      }
    },
   /* setup() {
      const plainOptions = ['Apple', 'Pear', 'Orange'];
       const state = reactive({
        indeterminate: true,
        checkAll: false,
        checkedList: ['Apple', 'Orange'],
      });
      const onCheckAllChange = e => {
        Object.assign(state, {
          checkedList: e.target.checked ? plainOptions : [],
          indeterminate: false,
        });
      };
      watchEffect (
      () => state.checkedList,
        val => {
          state.indeterminate = !!val.length && val.length < plainOptions.length;
          state.checkAll = val.length === plainOptions.length;
        });
    },*/
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