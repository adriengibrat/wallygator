import { CustomError } from 'ts-custom-error'

interface ValidationErrorData {
	[key: string]: any
}

export class ValidationError extends CustomError implements ValidationErrorData {
	public constructor(
		message: string,
		data?: ValidationErrorData,
	) {
		data ? super(`${message}${JSON.stringify(data)}`) : super(message)
		Object.assign(this, data)
	}
}
