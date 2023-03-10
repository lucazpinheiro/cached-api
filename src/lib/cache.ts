import { createClient } from 'redis'

type TimeInSeconds = number

const CACHE_DURATION: TimeInSeconds = 120

const client = createClient({
  url: 'redis://redis:6379'
})

client.on('error', err => console.log('Redis Client Error', err))

async function connect () {
  await client.connect()
}

async function cacheIt (productId: string) {
  await client.set(productId, '', {
    EX: CACHE_DURATION,
    NX: true
  })
}

async function isCached (productId: string): Promise<boolean> {
  console.log(productId)
  const value = await client.get(productId)
  if (value === '') {
    return true
  }
  return false
}

export {
  connect,
  cacheIt,
  isCached
}
