export interface Person {
  name: string
  startAge: number
  color: string
  avatar: string
}

export interface SavingsData {
  age: number
  [key: string]: number
} 