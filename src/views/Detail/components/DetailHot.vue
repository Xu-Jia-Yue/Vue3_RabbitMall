<script setup>
import { getHotGoodsApi } from '@/apis/DetailHotAPI'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const props = defineProps({
  type: {
    type: Number
  }
})
const hotList = ref([])
const getHotGoods = async (id) => {
  const { result } = await getHotGoodsApi({
    id,
    type: props.type,
    limit: 3
  })
  hotList.value = result
}
onMounted(() => {
  getHotGoods(route.params.id)
})
</script>

<template>
  <div class="goods-hot">
    <h3>{{ props.type === 1 ? '24小时热销榜' : '周热销榜' }}</h3>
    <!-- 商品区块 -->
    <RouterLink
      class="goods-item"
      v-for="item in hotList"
      :to="`/detail/${item.id}`"
      :key="item.id"
    >
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>
