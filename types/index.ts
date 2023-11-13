export type ApiResponse<T> =
	| {
			status: 'success'
			statusCode: number
			data: T
			timestamp: Date
	  }
	| {
			status: 'error'
			statusCode: number
			message: string
			stack?: string
			timestamp: Date
	  }
