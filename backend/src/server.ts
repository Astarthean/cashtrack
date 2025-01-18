import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import budgetRouter from './routes/budgetRouter'

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue.bold('Conexión OK DB'))
    } catch (error) {
        // console.log(error)
        console.log(colors.red.bold('Conexión KO DB'))
    }
}
connectDB()

const app = express()

app.use(morgan('dev'))

app.use(express.json())

app. use('/api/budgets', budgetRouter)

export default app
