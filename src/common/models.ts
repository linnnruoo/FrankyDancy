export type User = {
  _id: string
  name: string
  beetleId: string
  MAC: string
  url: string
}

export type Dancer = {
  userId: string
  dancerNo: Number
}

export type Dance = {
  _id: string
  dancers: Dancer[]
  status: Number
  date: Date
}

export enum Move {
  Elbowlock = 0,
  Hair = 1,
  Pushback = 2,
  Rocket = 3,
  Scarecrow = 4,
  Shouldershrug = 5,
  Windows = 6,
  Zigzag = 7,
}

export type Movement = {
  _id: string
  move: Move
  position: number[] // e.g [1,2,3]
  date: Date
}

export type PredictedMovement = {
  _id: string
  move: Move
  position: number[] // e.g [1,2,3]
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
  dancerNo: string
  accelerometer: SensorReading
  gyroscope: SensorReading
  date: Date
}
