import { ApiResponse } from '../types'

export const successResponse = <T>(data: T, statusCode = 200): ApiResponse<T> => ({
	status: 'success',
	statusCode,
	data,
	timestamp: new Date()
})

export const errorResponse = (message: string, stack?: string, statusCode: number = 500): ApiResponse<string> => ({
	status: 'error',
	statusCode,
	message,
	stack,
	timestamp: new Date()
})
