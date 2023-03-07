import * as yup from 'yup'

export const modalManageCategoryScheme = yup
  .object({
    title: yup.string().required('Поле "Название категории" должно быть заполнено'),
    description: yup.string().required('Дополнительное поле должно быть заполнено'),
  })
  .required()

export const modalManageProductScheme = yup
  .object({
    name: yup.string().required('Название товара должно быть заполнено'),
    image: yup
      .mixed()
      .required('Добавьте изображение товара')
      .test('fileSize', 'Файл слишком большой', (value) => {
        return value && value[0].size < 2000000
      }),
    price: yup.number().required('Стоимость товара должно быть заполнена'),
    quantity: yup.number().required('Укажите количество товара'),
    category: yup.string().required('Укажите категорию'),
    description: yup.string().required('Описание товара быть заполнено'),
  })
  .required()

export const modalManagePickUpPointScheme = yup
  .object({
    latitude: yup.number().required('Укажите координаты на карте'),
    longitude: yup.number().required('Укажите координаты на карте'),
    address: yup
      .string()
      .min(5, 'Адрес должен содержать минимум 5 символов!')
      .required('Укажите адрес'),
    description: yup
      .string()
      .min(5, 'Описание должно содержать минимум 5 символов!')
      .required('Описание пункта выдачи должно быть заполнено'),
    timeOpen: yup.string().required('Укажите время работы пункта выдачи'),
    timeClose: yup.string().required('Укажите время работы пункта выдачи'),
  })
  .required()

export const modalUpdateCategoryScheme = yup
  .object({
    title: yup.string().required('Поле "Название категории" должно быть заполнено'),
    description: yup.string().required('Дополнительное поле должно быть заполнено'),
  })
  .required()

export const autohrizationScheme = yup
  .object({
    email: yup
      .string()
      .email('Введите корректный email')
      .required('Поле Email должно быть заполнено'),
    password: yup
      .string()
      .required('Поле Пароль должно быть заполнено')
      .min(6, 'Пароль должен состоять минимум из 6 символов!'),
  })
  .required()
