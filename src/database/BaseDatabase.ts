import { knex } from 'knex'
import dotenv from 'dotenv'
import { sqlite3 } from 'sqlite3'
dotenv.config()

export abstract class BaseDatabase {
    protected static connection = knex({
        client: "sqlite3",
        connection: {
            filename: process.env.DB_FILE_PATH as string,
        },
        useNullAsDefault: true,
        pool: { 
            min: 0,
            max: 1,
            afterCreate: (conn: any, cb: any) => {
                conn.run("PRAGMA foreign_keys = ON", cb)
            }
        }
    })
}