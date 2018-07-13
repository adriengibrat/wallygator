import { ValidationError } from './validationError'

export class ValidatorProcessError extends ValidationError {
	public constructor(
		readonly reason: Error,
	) {
		super(`Validator failed: ${reason.message}`)
	}
}
