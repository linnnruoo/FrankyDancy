enum Move {
  Hair = 1,
  Rocket = 2,
  Zigzag = 3,
  Scarecrow = 4,
  Shouldershrug = 5,
  Windows = 6,
  Pushback = 7,
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

export enum MoveName {
  Hair = 'Hair',
  Pushback = 'Pushback',
  Rocket = 'Rocket',
  Scarecrow = 'Scarecrow',
  Shouldershrug = 'Shoulder Shrug',
  Windows = 'Windows',
  Zigzag = 'Zig Zag',
  Elbowlock = 'Elbow Lock',
}

export const getMoveKeys = () =>
  Object.keys(Move).filter((x) => !(parseInt(x) >= 0))

export const getMoveName = (move: Move): string => {
  const moveKey = Move[move]
  return MoveName[moveKey]
}

export const getMoveUrl = (move: Move): string => {
  const moveKey = Move[move] // key
  return MoveUrl[moveKey]
}

export default Move
