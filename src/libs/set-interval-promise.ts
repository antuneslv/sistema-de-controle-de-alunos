export default function setIntervalPromise(
  timeInterval: number,
  timeDuration: number,
  textIn: string,
  textInterval: string,
  textOut = '',
) {
  let currentTime = 0
  return new Promise<void>((resolve, reject) => {
    try {
      process.stdout.write(`${textIn}`)
      const intervalTimer = setInterval(() => {
        currentTime += timeInterval
        if (currentTime <= timeDuration) {
          process.stdout.write(`${textInterval}`)
        } else {
          clearInterval(intervalTimer)
          console.log(`\n${textOut}\n`)
          resolve()
        }
      }, timeInterval)
    } catch (error) {
      reject(error)
    }
  })
}
