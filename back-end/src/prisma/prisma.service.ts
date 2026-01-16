import 'dotenv/config'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from 'generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit
{
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
          ssl: {
        rejectUnauthorized: false 
      }
    })

    super({ adapter })
  }

  async onModuleInit() {
    // try {
    //   await this.$queryRaw`SELECT 1`
    //   this.logger.log('Connected to the database successfully')
    // } catch (error) {
    //   this.logger.error('Error connecting to the database', error)
    //   throw error
    // }
  }
}
