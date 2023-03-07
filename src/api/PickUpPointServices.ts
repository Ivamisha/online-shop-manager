import type { IPickUpPoints } from '../models/redux'
import { IFindPickUpPointsDate, IPickUpPointDate } from '../models/redux/interfaces'
import { stringify } from 'qs'
import api from './api'

export default class PickUpPointsServices {
  static async getPartOfPickUpPoint(
    page: number,
    limit: number,
    shown?: boolean,
    field?: string,
    sortWay?: 'asc' | 'desc'
  ): Promise<IPickUpPoints> {
    const queries = stringify({ page, limit, shown, field, sortWay })
    const response = await api.get<IPickUpPoints>(`/pickupPoint?${queries}`)
    return response.data
  }

  static async createPickUpPoint(
    address: string,
    description: string,
    coordinates: number[],
    workingHours: string
  ): Promise<IPickUpPointDate> {
    const response = await api.post<IPickUpPointDate>(`/pickupPoint/`, {
      address,
      description,
      coordinates,
      workingHours,
    })
    return response.data
  }

  static async updatePickUpPoint(
    id: string,
    address: string,
    description: string,
    coordinates: number[],
    workingHours: string
  ): Promise<IPickUpPointDate> {
    const response = await api.put<IPickUpPointDate>(`/pickupPoint/${id}`, {
      address,
      description,
      coordinates,
      workingHours,
    })
    return response.data
  }

  static async hidePickUpProduct(id: string, visibility: boolean): Promise<IPickUpPointDate> {
    const queries = stringify({ visibility })
    const response = await api.put<IPickUpPointDate>(`/pickupPoint/${id}?${queries}`)
    return response.data
  }

  static async findPickUpPoint(
    address: string,
    field?: string,
    sortWay?: 'asc' | 'desc'
  ): Promise<IFindPickUpPointsDate> {
    const queries = stringify({ field, sortWay })
    const response = await api.get<IFindPickUpPointsDate>(`/pickupPoint/${address}?${queries}`)
    return response.data
  }
}
