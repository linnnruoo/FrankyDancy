enum Move {
  Hair = 1,
  Pushback = 2,
  Rocket = 3,
  Scarecrow = 4,
  Shouldershrug = 5,
  Windows = 6,
  Zigzag = 7,
  Elbowlock = 8,
}

export enum MoveUrl {
  Elbowlock = 'https://i.imgur.com/pwOOQFb.png',
  Hair = 'https://i.imgur.com/St7BJf5.png',
  Pushback = 'https://i.imgur.com/7JdWlkz.png',
  Rocket = 'https://i.imgur.com/kK35SYR.png',
  Scarecrow = 'https://i.imgur.com/h2pbVVi.png',
  Shouldershrug = 'https://i.imgur.com/g28PHpc.jpg',
  Windows = 'https://i.imgur.com/gYLPr1j.png',
  Zigzag = 'https://i.imgur.com/2dENb9M.png',
}

export const getMoveName = (move: Move): string => Move[move]

export const getMoveUrl = (move: Move): string => {
  const moveName = Move[move] // key
  return MoveUrl[moveName]
}

export default Move
