import { ValidationError, ValidationFailureError } from '../error'

export class Failure {
	readonly valid = false
	readonly error = new ValidationFailureError(this.reasons)
	constructor(
		readonly reasons: Array<ValidationError>
	) {
	}
	toString() {
		return this.error.message
	}
	toJSON() {
		return this.reasons
	}
}
