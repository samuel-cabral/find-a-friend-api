export class InvalidBirthDateError extends Error {
  constructor() {
    super('User must be at least 18 years old.')
  }
} 