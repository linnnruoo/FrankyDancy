enum Move {
  Hair = 1,
  Pushback = 2,
  Rocket = 3,
  Scarecrow = 4,
  Shouldershrug = 5,
  Windowwipe = 6,
  Zigzag = 7,
  Elbowlock = 8,
  Logout = 9,
}

export enum MoveUrl {
  Elbowlock = 'https://i.imgur.com/pwOOQFb.png',
  Hair = 'https://i.imgur.com/St7BJf5.png',
  Pushback = 'https://i.imgur.com/7JdWlkz.png',
  Rocket = 'https://i.imgur.com/kK35SYR.png',
  Scarecrow = 'https://i.imgur.com/h2pbVVi.png',
  Shouldershrug = 'https://i.imgur.com/g28PHpc.jpg',
  Windowwipe = 'https://i.imgur.com/gYLPr1j.png',
  Zigzag = 'https://i.imgur.com/2dENb9M.png',
  Logout = 'https://i.imgur.com/0QgeMcI.png',
}

export enum MoveName {
  Hair = 'Hair',
  Pushback = 'Pushback',
  Rocket = 'Rocket',
  Scarecrow = 'Scarecrow',
  Shouldershrug = 'Shoulder Shrug',
  Windowwipe = 'Window Wipe',
  Zigzag = 'Zig Zag',
  Elbowlock = 'Elbow Lock',
  Logout = 'Logout',
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
