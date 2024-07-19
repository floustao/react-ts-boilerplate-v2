const VALID_OPERATIONS = ["+", "-", "*", "/"];

function isValid<T>(val: T): boolean {
  return !Number.isNaN(Number(val)) && val !== "";
}

export function computeFormula(formula: string, grid: string[]): string {
  const trimmedFormula = formula.slice(1).trim();
  const terms = trimmedFormula.split(/([+\-*/])/).map((term) => term.trim());

  const processedTerms = terms.map((term) => {
    if (term.startsWith("Cell")) {
      const index = parseInt(term.replace("Cell", ""), 10);
      return Number(grid[index]) || 0; // TODO: Confirm behaviour with product team/customer. Currently setting the value to 0 if not a number.
    } else if (VALID_OPERATIONS.includes(term)) {
      return term;
    } else {
      // treat as a valid number
      return parseInt(term, 10);
    }
  });

  let result = Number(processedTerms[0]);
  for (let i = 1; i < processedTerms.length; i += 2) {
    const operator = processedTerms[i];
    const nextValue = Number(processedTerms[i + 1]);
    if (operator === "+") {
      result += nextValue;
    } else if (operator === "-") {
      result -= nextValue;
    } else if (operator === "*") {
      result *= nextValue;
    } else if (operator === "/") {
      result /= nextValue;
    }
  }

  return isValid(result) ? String(result) : "";
}
