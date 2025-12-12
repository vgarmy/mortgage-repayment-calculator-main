export interface MortgageValues {
    mortgageAmount: string;
    mortgageTerm: string;
    interestRate: string;
    mortgageType: "repayment" | "interestOnly";
}

export interface MortgageResult {
    monthly: number;
    total: number;
}

// Funktion som gör uträkningen
export function calculateMortgage(values: MortgageValues): MortgageResult {
    const P = Number(values.mortgageAmount);
    const n = Number(values.mortgageTerm) * 12;
    const r = Number(values.interestRate) / 100 / 12;

    if (isNaN(P) || isNaN(n) || isNaN(r) || n === 0) {
        return { monthly: 0, total: 0 };
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
        monthly: Number(monthly.toFixed(2)),
        total: Number(total.toFixed(2)),
    };
}
