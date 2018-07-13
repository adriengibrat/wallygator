import { Wallygator } from '.'
import { Success, Failure } from './result'
import { required, greaterThan, greaterThanOrEqualTo } from './validator'

// TODO actual unit tests

const greaterThan3 = greaterThan(3)
const numberValidator = new Wallygator<number>(
	required(),
	greaterThan3,
)

test('Validator Success', () => {
	[4, 10, Infinity].forEach((value) => {
		const result = numberValidator.validate(value)
		expect(result).toBeInstanceOf(Success)
		expect(result.valid).toBeTruthy()
		expect(result.toJSON()).toBe(value)
	})
})

test('Validator Failure', () => {
	const empty = [null, undefined]
	empty.forEach((value) => {
		const result = numberValidator.validate(value)
		expect(result).toBeInstanceOf(Failure)
		expect(result.valid).toBeFalsy()
		const json = result.toJSON()
		expect(json).toBeInstanceOf(Array)
		expect(json.length).toBe(2)
	})
	const invalid = [0, 2, 'plop', 'Test']
	invalid.forEach((value) => {
		const result = numberValidator.validate(value)
		expect(result).toBeInstanceOf(Failure)
		expect(result.valid).toBeFalsy()
		const json = result.toJSON()
		expect(json).toBeInstanceOf(Array)
		expect(json.length).toBe(1)
	})
})

test('Validator modification', () => {
	const greaterThanOrEqualTo2 = greaterThanOrEqualTo(2)
	const requiredValidator = numberValidator.remove(greaterThan3)
	expect(requiredValidator).toBeInstanceOf(Wallygator)
	expect(requiredValidator.validators.length).toBe(1)
	const anotherNumberValidator = requiredValidator.add(greaterThanOrEqualTo2)
	expect(anotherNumberValidator).toBeInstanceOf(Wallygator)
	expect(anotherNumberValidator.validators.length).toBe(2)
	const valid = [2, 3, 4, 10, Infinity]
	valid.forEach((value) => {
		const result = anotherNumberValidator.validate(value)
		expect(result).toBeInstanceOf(Success)
		expect(result.valid).toBeTruthy()
		expect(result.toJSON()).toBe(value)
	})
})
