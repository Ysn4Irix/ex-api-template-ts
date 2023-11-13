import { NextFunction, Request, Response } from 'express'
import logger from '../helpers/logger'
import { successResponse } from '../helpers/apiResponse'
import { StatusCodes } from 'http-status-codes'

export const serverStatus = async (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.status(200).json(
			successResponse<{ message: string }>(
				{
					message: 'Server is running'
				},
				StatusCodes.OK
			)
		)
	} catch (error) {
		logger.error((error as Error).message)
		return next(error)
	}
}
