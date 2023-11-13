import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { NextFunction, Request, Response } from 'express'
import { errorResponse } from '../helpers/apiResponse'
const { NODE_ENV } = process.env

export const notFound = (req: Request, res: Response, next: NextFunction) => {
	res.status(StatusCodes.NOT_FOUND)
	const err = new Error(`requested url ${req.originalUrl} not found`)
	next(err)
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	const statusCode = res.statusCode === 200 ? StatusCodes.INTERNAL_SERVER_ERROR : res.statusCode

	res.status(statusCode).json(
		NODE_ENV === 'production'
			? errorResponse(getReasonPhrase(statusCode), err.stack, statusCode)
			: errorResponse(err.message, err.stack, statusCode)
	)
}
