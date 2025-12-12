export interface MortgageValues {
    mortgageAmount: string;
    mortgageTerm: string;
    interestRate: string;
    mortgageType: "repayment" | "interestOnly";
}

export interface MortgageResult {
    monthly: string; // changed to string for formatted output
    total: string;   // changed to string for formatted output
}

// Funktion som gör uträkningen
export function calculateMortgage(values: MortgageValues): MortgageResult {
    const P = Number(values.mortgageAmount);
    const n = Number(values.mortgageTerm) * 12;
    const r = Number(values.interestRate) / 100 / 12;

    if (isNaN(P) || isNaN(n) || isNaN(r) || n === 0) {
        return { monthly: "0.00", total: "0.00" };
    }

    let monthly = 0;
    let total = 0;

    if (values.mortgageType === "repayment") {
        monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        total = monthly * n;
    } else {
        monthly = P * r;
        total = monthly * n;
    }

    return {
        monthly: monthly.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        total: total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    };
}
