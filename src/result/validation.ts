import { ValidationError } from '../error'

export interface Validation {
	errors: Array<ValidationError>,
	results: Array<any>,
}
