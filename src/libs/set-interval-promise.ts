export default function setIntervalPromise(
  callback: CallableFunction,
  time: number,
  textIn: string,
  textInterval: string,
  textOut: string,
) {
  let currentTime = 0
  return new Promise<void>((resolve, reject) => {
    try {
      process.stdout.write(`${textIn}`)
      const intervalTimer = setInterval(() => {
        callback()
        currentTime += time
        if (currentTime <= 3000) {
          process.stdout.write(`${textInterval}`)
        } else {
          clearInterval(intervalTimer)
          console.log(`\n${textOut}\n`)
          resolve()
        }
      }, time)
    } catch (error) {
      reject(error)
    }
  })
}
