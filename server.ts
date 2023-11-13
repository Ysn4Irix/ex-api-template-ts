import 'dotenv/config'
import express, { Application } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import favicon from 'serve-favicon'
import responseTime from 'response-time'
import { join } from 'path'
import logger from './helpers/logger'
import { notFound, errorHandler } from './middlewares/errorHandler'
import { rateLimiter } from './middlewares/rateLimiterHandler'
import { speedLimiter } from './middlewares/speedLimiterHandler'
import { router } from 'express-file-routing'

const app: Application = express()

;(async () => {
	app.use(responseTime())
	app.use(helmet())
	app.use(
		cors({
			origin: process.env.CORS_ORIGIN || '*',
			optionsSuccessStatus: 200
		})
	)
	app.use(compression())
	app.use(favicon(join(__dirname, 'public', 'favicon.ico')))
	app.use(express.json())
	app.use(
		express.urlencoded({
			extended: false
		})
	)

	app.use('/', rateLimiter, speedLimiter, await router())

	app.use(notFound)
	app.use(errorHandler)

	const PORT = process.env.PORT || 5000
	const HOST = process.env.HOST || 'localhost'
	const server = app.listen(PORT, () => {
		logger.info(`🚀 Server started at ${HOST} on PORT ${PORT} with processId: ${process.pid}`)
	})

	process.on('SIGTERM', () => {
		logger.info('Received kill signal, shutting down gracefully')
		//! Perform cleanup tasks here (e.g., close database connections, release resources).
		server.close(() => {
			logger.info('Closed out remaining connections')
			process.exit(0)
		})
		setTimeout(() => {
			logger.error('Could not close connections in time, forcefully shutting down')
			process.exit(1)
		}, 10000)
	})

	process.on('SIGINT ', () => {
		logger.info('Received kill signal, shutting down gracefully')
		//! Perform cleanup tasks here (e.g., close database connections, release resources).
		server.close(() => {
			logger.info('Closed out remaining connections')
			process.exit(0)
		})
		setTimeout(() => {
			logger.error('Could not close connections in time, forcefully shutting down')
			process.exit(1)
		}, 10000)
	})
})()
