export const ct = (value: string | RegExp) =>
	typeof value === 'string' ?
		(input: string) => input.includes(value) :
		(input: string) => value.test(input)
