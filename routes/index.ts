import { Handler } from 'express'
import { serverStatus } from '../controllers/main.controller'

export const get: Handler = serverStatus
