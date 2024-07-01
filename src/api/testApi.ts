import instance from '@/utils/request'

export const testApi = () => {
    return instance.get('home/category/head')
}
