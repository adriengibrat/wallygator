import { ValidationError } from '../error'
import { eq } from './predicate/common/equalTo'
import { lgt } from './predicate/common/longerThan'
import { rq } from './predicate/common/required'
import { gt } from './predicate/number/greaterThan'
import { lt } from './predicate/number/lowerThan'
import { ct } from './predicate/string/contains'

export interface Predicate<Input> {
	(input: Input):  boolean
}

export interface Validator<Input> {
	(input: Input): Error | any
}

interface Factory<Output, Param> {
	(value: Param): Output
}

export const or = <Input, Param>(...factories: Array<Factory<Predicate<Input>, Param>>): Factory<Predicate<Input>, Param> =>
	(value) => {
		const predicates = factories.map((factory) => factory(value))
		return (input: Input) => predicates.some((predicate) => predicate(input))
	}

export const validatorOf = <Input, Param>(name: string, factory: Factory<Predicate<Input>, Param>): Factory<Validator<Input>, Param> =>
	(value) => {
		const predicate = factory(value)
		return (input: Input) => predicate(input) || new ValidationError(name, { value })
	}

export const equalTo = validatorOf<any, number>('equalTo', eq)
export const required = validatorOf<any, void>('required', rq) as () => Validator<any>
export const greaterThan = validatorOf<number, number>('greaterThan', gt)
export const greaterThanOrEqualTo = validatorOf<number, number>('greaterThanOrEqualTo', or(gt, eq))
export const lowerThan = validatorOf<number, number>('lowerThan', lt)
export const lowerThanOrEqualTo = validatorOf<number, number>('lowerThanOrEqualTo', or(lt, eq))
export const contains = validatorOf<string, string|RegExp>('contains', ct)
export const longerThan = validatorOf<ArrayLike<any>, number>('longerThan', lgt)
