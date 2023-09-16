const nameValidationRegex = /^[A-Z][a-zA-Z '.-]*[A-Za-z][^-]$/;
const passwordValidationRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

module.exports = { nameValidationRegex, passwordValidationRegex };
