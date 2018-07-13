import { ValidationError } from './validationError'

export class ObjectValidationError extends ValidationError {
	public constructor(
		readonly message: string,
		readonly path: Array<string>,
	) {
		super(`${message} at ${path.join('.')}`)
	}
}
