<script setup lang="ts">
import { useAddressData } from './composables/useAddress'
import { createOrderApi } from '@/apis/Order'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/CartStore'
const router = useRouter()
const cartStore = useCartStore()
const {
  checkInfo,
  curAddress,
  addFlag,
  toggleFlag,
  addAddressForm,
  delAddress,
  addAddress,
  editAddress,
  editFlag
} = useAddressData()
// 表单验证规则
const rules = {
  receiver: { required: true, message: '收货人不能为空', trigger: 'blur' },
  contact: { required: true, message: '联系方式不能为空', trigger: 'blur' },
  address: { required: true, message: '收获地址不能为空', trigger: 'blur' },
  addressTags: { required: true, message: '请选择地址标签', trigger: 'blur' },
  isDefault: { required: true, message: '请确定此地址是否为默认地址', trigger: 'change' }
}
// 切换active并存入
const activeIdx = ref(curAddress.value)
const activeAddress = (item: any) => {
  activeIdx.value = item
}
// 切换地址
const confirm = () => {
  curAddress.value = activeIdx.value
  toggleFlag.value = false
}
// 提交验证
const formRef = ref()
const submitData = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      addAddress()
    }
  })
}
// 提交订单
const createOrder = async () => {
  const { result } = (await createOrderApi({
    deliveryTimeType: 1,
    payType: 1,
    payChannel: 1,
    buyerMessage: '',
    goods: checkInfo.value.goods.map((item: any) => {
      return {
        skuId: item.skuId,
        count: item.count
      }
    }),
    addressId: curAddress.value.id
  })) as any
  const orderId = result.id
  router.push({
    path: '/paypage',
    query: { id: orderId }
  })
  cartStore.clearCartList()
}
</script>

<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!curAddress">您需要先添加收货地址才可提交订单。</div>
              <ul v-else>
                <li>
                  <span>收<i />货<i />人：</span>{{ curAddress.receiver }}
                </li>
                <li><span>联系方式：</span>{{ curAddress.contact }}</li>
                <li>
                  <span>收货地址：</span>{{ curAddress.fullLocation }} {{ curAddress.address }}
                </li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="toggleFlag = true">切换地址</el-button>
              <el-button size="large" @click="addFlag = true">添加地址</el-button>
              <el-button size="large" @click="editFlag = true">修改当前地址</el-button>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in checkInfo.goods" :key="i.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="i.picture" alt="" />
                    <div class="right">
                      <p>{{ i.name }}</p>
                      <p>{{ i.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ i.price }}</td>
                <td>{{ i.price }}</td>
                <td>&yen;{{ i.totalPrice }}</td>
                <td>&yen;{{ i.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color: #999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ checkInfo.summary?.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ checkInfo.summary?.totalPrice.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ checkInfo.summary?.postFee.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">{{ checkInfo.summary?.totalPayPrice.toFixed(2) }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button type="primary" size="large" @click="createOrder">提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 切换地址 -->
  <el-dialog title="切换收货地址" width="30%" center v-model="toggleFlag">
    <div class="addressWrapper">
      <div
        class="text item"
        v-for="item in checkInfo.userAddresses"
        :key="item.id"
        :class="{ active: item.id == activeIdx.id }"
        @click="activeAddress(item)"
      >
        <ul>
          <li>
            <span>收<i />货<i />人：</span>{{ item.receiver }}
          </li>
          <li>
            <span>联系方式：</span>{{ item.contact }}
            <el-popconfirm
              title="确认删除吗?"
              confirm-button-text="确认"
              cancel-button-text="取消"
              @confirm="delAddress(item.id)"
            >
              <template #reference>
                <i class="iconfont icon-close-new"></i>
              </template>
            </el-popconfirm>
          </li>
          <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
        </ul>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="toggleFlag = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 添加地址 -->
  <el-dialog title="添加地址" width="30%" cente v-model="addFlag">
    <el-form :model="addAddressForm" :rules="rules" ref="formRef">
      <el-form-item label="收获人" prop="receiver">
        <el-input v-model="addAddressForm.receiver" />
      </el-form-item>
      <el-form-item label="联系方式" prop="contact">
        <el-input v-model="addAddressForm.contact" />
      </el-form-item>
      <el-form-item label="收获地址" prop="address">
        <el-input v-model="addAddressForm.address" />
      </el-form-item>
      <el-form-item label="地址标签" prop="addressTags">
        <el-select v-model="addAddressForm.addressTags" placeholder="---请选择---">
          <el-option label="家" value="家" />
          <el-option label="公司" value="公司" />
          <el-option label="学校" value="学校" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否设为默认地址" prop="isDefault" for="isDefault">
        <el-radio-group v-model="addAddressForm.isDefault" id="isDefault">
          <el-radio value="0">是</el-radio>
          <el-radio value="1" selected="selected">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addFlag = false">取消</el-button>
        <el-button type="primary" @click="submitData">提交</el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 修改地址 -->
  <el-dialog title="修改当前地址" width="30%" cente v-model="editFlag">
    <el-form :model="curAddress" :rules="rules" ref="formRef">
      <el-form-item label="收获人" prop="receiver">
        <el-input v-model="curAddress.receiver" />
      </el-form-item>
      <el-form-item label="联系方式" prop="contact">
        <el-input v-model="curAddress.contact" />
      </el-form-item>
      <el-form-item label="收获地址" prop="address">
        <el-input v-model="curAddress.address" />
      </el-form-item>
      <el-form-item label="地址标签" prop="addressTags">
        <el-select v-model="curAddress.addressTags" placeholder="---请选择---">
          <el-option label="家" value="家" />
          <el-option label="公司" value="公司" />
          <el-option label="学校" value="学校" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否设为默认地址" prop="isDefault" for="isDefault">
        <el-radio-group v-model="curAddress.isDefault" id="isDefault">
          <el-radio value="0">是</el-radio>
          <el-radio value="1" selected="selected">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addFlag = false">取消</el-button>
        <el-button type="primary" @click="editAddress">修改</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.xtx-pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    > ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    > a {
      color: $xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 400px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }

    > ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
      width: 100%;
      .iconfont {
        float: right;
      }
    }
  }
}
</style>
