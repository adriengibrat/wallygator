export class Success {
	readonly valid = true
	constructor(
		readonly value: any,
		readonly result?: any,
	) {
	}
	toString() {
		return this.valid
	}
	toJSON() {
		return this.value
	}
}
