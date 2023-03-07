import type { IProducts } from '../models/redux'
import { IProductsDate } from '../models/redux/interfaces'
import { stringify } from 'qs'
import api from './api'

export default class ProductsServices {
  static async getAllProducts(): Promise<IProducts> {
    const response = await api.get<IProducts>(`/products/`)
    return response.data
  }

  static async createProduct(formdata: FormData): Promise<IProductsDate> {
    const response = await api.post<IProductsDate>(`/products/`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }

  static async getPartOfProducts(
    page: number,
    limit: number,
    shown?: boolean,
    field?: string,
    sortWay?: 'asc' | 'desc'
  ): Promise<IProducts> {
    const queries = stringify({ page, limit, shown, field, sortWay })
    const response = await api.get<IProducts>(`/products?${queries}`)
    return response.data
  }

  static async getProductsByCategories(
    category: string,
    field?: string,
    sortWay?: 'asc' | 'desc'
  ): Promise<IProducts> {
    const queries = stringify({ category, field, sortWay })
    const response = await api.get<IProducts>(`/products?${queries}`)
    return response.data
  }

  static async findProducts(
    name: string,
    field?: string,
    sortWay?: 'asc' | 'desc'
  ): Promise<IProducts> {
    const queries = stringify({ field, sortWay })
    const response = await api.get<IProducts>(`/products/${name}?${queries}`)
    return response.data
  }

  static async updateProducts(id: string, data: FormData): Promise<IProductsDate> {
    const response = await api.put<IProductsDate>(`/products/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }

  static async changeProductVisibility(id: string, visibility: boolean): Promise<IProductsDate> {
    const queries = stringify({ visibility })
    const response = await api.put<IProductsDate>(`/products/${id}?${queries}`)
    return response.data
  }
}
