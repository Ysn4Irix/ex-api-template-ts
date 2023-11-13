import rateLimit from 'express-rate-limit'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { ApiResponse } from '../types'
import { errorResponse } from '../helpers/apiResponse'

export const rateLimiter = rateLimit({
	windowMs: 30 * 1000, // 30 seconds
	max: 10, // limit each IP to 10 requests per windowMs
	message: errorResponse(getReasonPhrase(StatusCodes.TOO_MANY_REQUESTS), undefined, StatusCodes.TOO_MANY_REQUESTS)
})
