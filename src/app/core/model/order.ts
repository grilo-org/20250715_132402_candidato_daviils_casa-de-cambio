export class Order {
  name?: string
  document?: string
  email?: number
  phone?: number
  items?: Items[]

  constructor() {
  }
}


export class Items {
  id?: string
  nome?: string
  cotacao?: number
  totalFace?: number
  totalValue?: number
  faces?: Faces[]
}

export class Faces {
  face?: number
  qtde?: number
  totalFace?: number
  totalValue?: number
}
