import type { IAuthResponse } from '../models/interfaces'
import api from './api'

export default class AuthService {
  static async login(email: string, password: string): Promise<IAuthResponse> {
    const response = await api.post<IAuthResponse>('/users/login', {
      email,
      password,
    })
    return response.data
  }

  static async logout(): Promise<void> {
    await api.get('/users/logout')
  }

  static async checkAuth(): Promise<IAuthResponse> {
    const response = await api.get('/users/refresh')
    return response.data
  }
}
