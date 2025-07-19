import axios from 'axios'

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function testFn(number: number, callback: Function) {
  if (number > 10) {
    callback(number)
  }
}

export async function request() {
  const { data } = await axios.get('testUrl')
  return data
}
