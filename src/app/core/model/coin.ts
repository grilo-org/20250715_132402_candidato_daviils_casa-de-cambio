export type Coins = Coin[]

export class Coin {
  id?: string
  nome?: string
  cotacao?: number
  faces?: number[]
}


export class Order {
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
