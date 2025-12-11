interface FormControlProps {
    values: {
        mortgageAmount: string;
        mortgageTerm: string;
        interestRate: string;
        mortgageType: string;
    };
    showErrors: boolean;
    field: "mortgageAmount" | "mortgageTerm" | "interestRate" | "mortgageType";
}

function FormControl({ values, showErrors, field }: FormControlProps) {
    const errors: Record<string, string> = {};

    if (showErrors) {
        if (!values.mortgageAmount) errors.mortgageAmount = "This field is required";
        if (!values.mortgageTerm) errors.mortgageTerm = "This field is required";
        if (!values.interestRate) errors.interestRate = "This field is required";
        if (!values.mortgageType) errors.mortgageType = "This field is required";
    }

    // <-- Här returnerar vi bara felet för det fältet som skickats in
    return errors[field] ? <p className="text-[var(--Red)] text-xs mt-1 font-bold">{errors[field]}</p> : null;
}

export default FormControl;
