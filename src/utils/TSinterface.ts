// 定义ts接口

// banner的数据类型
export interface bannerDataType {
  id: string
  imgUrl: string
  hrefUrl: string
  type: string
}
// 加入购物车api参数的数据类型
export interface insertCartDataType {
  skuId: string
  count: number
}

// 合并购物车api参数类型
export interface memberCartDataType {
  skuId: string
  selected: boolean
  count: number
}

// 获取筛选后的商品api参数类型
export interface filterGoodsDataType {
  categoryId: string | string[]
  page: number
  pageSize: number
  sortField: string
}

// 获取详情页的hot列表api参数类型
export interface getHotGoodsType {
  id: string //商品id
  type: number // 1代表24小时热销榜 2代表周热销榜
  limit: number // limit - 获取个数
}

// 登录相关api参数类型
export interface isLoginDataType {
  account: string
  password: string
}

// 购物车pinia中的购物车列表的数据类型
export interface cartListDataType {
  id: string
  name: string
  picture: string
  price: number
  count: number
  skuId: string
  attrsText: string
  selected: boolean
}

// 用户数据类型
export interface userDataType {
  account: string
  password: string
}

//商品的数据类型
export interface goodsDataType {
  id: string
  name: string
  picture: string
  price: number
  count: number
  skuId: string
  attrsText: string
  selected: boolean
}

// 获取的分类数据的类型
export interface categoryType {
  id: string
  name: string
  picture: string
  children: Array<object>
  goods: Array<object>
}
