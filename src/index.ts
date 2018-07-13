import { ValidatorProcessError } from './error'
import { Validation, Failure, Success } from './result'
import { Validator } from './validator'

export class Wallygator<Input> {
	private _validators: Array<Validator<Input>>

	constructor(
		...validators: Array<Validator<Input>>
	) {
		this._validators = validators
	}

	get validators() {
		return this._validators.slice()
	}

	add(...validators: Array<Validator<Input>>) {
		return new Wallygator(...this._validators.concat(validators))
	}

	remove(...validators: Array<Validator<Input>>) {
		return new Wallygator(...this._validators.filter(
			validator => validators.indexOf(validator) === -1
		))
	}

	validate(value: any): Failure | Success {
		const validation = this._validators.reduce<Validation>(
			(validation: Validation, validator: Validator<Input>) => {
				try {
					const result = validator(value)
					result instanceof Error ?
						validation.errors.push(result) :
						validation.results.push(result)
				} catch (error) {
					validation.errors.push(new ValidatorProcessError(
						error instanceof Error ? error : new Error(error)
					))
				}
				return validation
			},
			{ errors: [], results: [] }
		)
		return validation.errors.length ? new Failure(validation.errors) : new Success(value, validation.results)
	}
}
