import { ValidationError } from './validationError'

export class ValidationFailureError extends ValidationError {
	public constructor(
		readonly reasons: Array<ValidationError>,
	) {
		super(`Validation failed: ${reasons.length}`)
	}
}
