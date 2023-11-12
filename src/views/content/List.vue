<template>
  <div class="product-list">
    <div v-for="(row, rowIndex) in productsChunks" :key="rowIndex" class="product-row">
      <div v-for="(product, columnIndex) in row" :key="columnIndex" class="product-item">
        <div class="product-info">
          <div>{{ product.name }}</div>
          <div>{{ product.price }}元</div>
          <div>{{ product.count }}个</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: "List",
  data() {
    return {
      products: [
        {name: '商品1', price: 10, count: 2},
        {name: '商品2', price: 20, count: 1},
        {name: '商品3', price: 30, count: 3},
        {name: '商品4', price: 40, count: 2},
        {name: '商品5', price: 10, count: 1},
        {name: '商品6', price: 20, count: 3},
        {name: '商品7', price: 30, count: 2},
        {name: '商品8', price: 40, count: 1},
        {name: '商品9', price: 10, count: 3},
        {name: '商品10', price: 20, count: 2},
        {name: '商品11', price: 30, count: 1},
        {name: '商品12', price: 40, count: 3},
      ],
    };
  },
  computed: {
    productsChunks() {
      const chunks = [];
      for (let i = 0; i < this.products.length; i += 4) {
        chunks.push(this.products.slice(i, i + 4));
      }
      return chunks;
    }
  },
  methods: {
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