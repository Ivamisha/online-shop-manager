import type { ICategories, ICategoryDate } from '../models/redux'
import api from './api'
import { stringify } from 'qs'

export default class CategoriesServices {
  static async getPartOfCategories(
    page?: number,
    limit?: number,
    sortWay?: 'asc' | 'desc',
    field?: string,
    shown?: boolean
  ): Promise<ICategories> {
    const queries = stringify({ page, limit, sortWay, field, shown })
    const response = await api.get<ICategories>(`/categories/?${queries}`)
    return response.data
  }

  static async getAllAvailableCategories(): Promise<ICategories> {
    const queries = stringify({ shown: true })
    const response = await api.get<ICategories>(`/categories?${queries}`)
    return response.data
  }

  static async createCategory(title: string, description: string): Promise<ICategoryDate> {
    const response = await api.post<ICategoryDate>(`/categories`, {
      title,
      description,
      shown: true,
    })
    return response.data
  }

  static async updateCategory(
    id: string,
    title: string,
    description: string,
    shown: 'true' | 'false'
  ): Promise<ICategoryDate> {
    const response = await api.put<ICategoryDate>(`/categories/${id}`, {
      title,
      description,
      shown,
    })
    return response.data
  }

  static async findCategory(
    name: string,
    field?: string,
    sortWay?: 'asc' | 'desc'
  ): Promise<ICategories> {
    const queries = stringify({ field, sortWay })
    const response = await api.get<ICategories>(`/categories/${name}?${queries}`)
    return response.data
  }
}
