import { PrismaClient } from '@prisma/client'

/**
 * @type {import('@prisma/client').PrismaClient}
 */
let prisma = null

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })
  }
  prisma = global.prisma
}

export default prisma