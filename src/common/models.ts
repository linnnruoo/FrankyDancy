import Move from 'common/moves'

export type User = {
  _id: string
  name: string
  beetleId: string
  MAC: string
  url: string
}

export type Dancer = {
  userId: string
  beetleId: string
  dancerNo: Number
}

export interface DancerProfile extends Dancer {
  name: string
  url: string
}

export type Dance = {
  _id: string
  dancers: Dancer[]
  status: Number
  date: Date
}

export type Movement = {
  _id: string
  move: Move[]
  position: string // e.g '1 2 3'
  correctPosition: string // e.g '1 2 3'
  syncDelay: number
  date: Date
}

export type SensorReading = {
  x: number
  y: number
  z: number
}

export type Sensor = {
  _id: string
  dancerNo: number
  accelerometer: SensorReading
  gyroscope: SensorReading
  date: string
}

export type WrongPosition = {
  position: number[] // e.g [1,2,3]
  correctPosition: number[]
  syncDelay: number
  time: string
}
