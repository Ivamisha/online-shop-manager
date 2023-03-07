import { ICategoryModalCreateForm } from './components/modals/ModalCreateCategory/interface'
import { IProductModalCreateForm } from './components/modals/ModalCreateProduct/interface'
import { ILoginInputMap, IDrawerList } from './models/interfaces'

export const inputForLogin: ILoginInputMap[] = [
  {
    inputName: 'email',
    type: 'text',
    label: 'email',
  },
  {
    inputName: 'password',
    type: 'password',
    label: 'Пароль',
  },
]

export const drawerList: IDrawerList[] = [
  {
    name: 'Категории',
    route: 'categories',
  },
  {
    name: 'Товары',
    route: 'products',
  },
  {
    name: 'Статистика',
    route: 'statistics',
  },
]

export const drawerWidth = 240

export const categoryTableHead = [
  { name: 'Название категории', sortField: 'title' },
  { name: 'Описание', sortField: 'description' },
  { name: 'Статус', sortField: 'shown' },
  { name: 'Дата создания', sortField: 'createdAt' },
  { name: 'Дата редактирования', sortField: 'updatedAt' },
]

export const productsTableHead = [
  { name: 'Наименование', sortField: 'name' },
  { name: 'Категория', sortField: 'category' },
  { name: 'Цена', sortField: 'price' },
  { name: 'Остаток', sortField: 'quantity' },
]

export const pickupPointTableHead = [
  { name: 'Адрес', sortField: 'address' },
  { name: 'Описание', sortField: 'description' },
  { name: 'Рабочие часы', sortField: 'workingHours' },
  { name: 'Дата создания', sortField: 'createdAt' },
  { name: 'Дата редактирования', sortField: 'updatedAt' },
]

export const createCategoryForm: ICategoryModalCreateForm[] = [
  {
    inputName: 'title',
    type: 'text',
    label: 'Название категории',
  },
  {
    inputName: 'description',
    type: 'text',
    label: 'Дополнительное поле',
  },
]

export const createProductForm: IProductModalCreateForm[] = [
  {
    inputName: 'name',
    type: 'text',
    label: 'Название товара',
  },
  {
    inputName: 'price',
    type: 'text',
    label: 'Стоимость',
  },
  {
    inputName: 'quantity',
    type: 'text',
    label: 'Количество',
  },
  {
    inputName: 'description',
    type: 'text',
    label: 'Описание',
  },
]

export const blueIconImage = {
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
}

export const redIconImage = {
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
}

export const blackIconImage = {
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
}

export const mapAttribution =
  '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

export const mapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
