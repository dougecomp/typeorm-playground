import { config } from 'dotenv-safe'
import { join } from 'path'
import { ConnectionOptions } from 'typeorm'

config()

let ormConfig = {} as ConnectionOptions

const ormConfigs: ConnectionOptions[] = [
  {
    name: process.env.NODE_ENV === 'development' ? 'default' : process.env.NODE_ENV,
    type: 'sqlite',
    database: 'src/database/database.sqlite',
    logging: true,
    synchronize: true,
    dropSchema: true,
    entities: [
      join(__dirname, 'src', '**', 'entities', '*.{ts,js}')
    ],
    migrations: [
      join(__dirname, 'src', '**', 'migrations', '*.{ts,js}')
    ],
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/database/migrations'
    }
  },
  {
    name: process.env.NODE_ENV === 'production' ? 'default' : process.env.NODE_ENV,
    type: 'mssql',
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
    logging: false,
    synchronize: false,
    dropSchema: false,
    entities: [
      join(__dirname, 'src', '**', 'entities', '*.{ts,js}')
    ],
    migrations: [
      join(__dirname, 'src', '**', 'migrations', '*.{ts,js}')
    ],
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/database/migrations'
    },
    options: {
      enableArithAbort: false
    }
  }
]

ormConfig = ormConfigs.find(function (conf) {
  return conf.name === 'default'
})

module.exports = ormConfig
