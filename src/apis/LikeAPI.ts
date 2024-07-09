import instance from '@/utils/request'
export const getLikeListApi = ({ limit = 4 }) => {
  return instance.get('/goods/relevant', { params: { limit } })
}
