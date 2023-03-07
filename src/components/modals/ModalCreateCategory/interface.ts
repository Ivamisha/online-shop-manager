export interface IModalCreateCategory {
  isModalCreateOpen: boolean
  setIsModalCreateOpen: (arg: boolean) => void
}

export interface ICategoryCreateForm {
  title: string
  description: string
}

export interface ICategoryModalCreateForm {
  inputName: keyof ICategoryCreateForm
  type: string
  label: string
}
