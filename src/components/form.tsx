import { useState } from "react";
import iconCalcylator from "/images/icon-calculator.svg";
import FormControl from "./formcontrol";
import { calculateMortgage, } from "./calculations";
import type { MortgageValues, MortgageResult } from "./calculations";

interface FormProps {
    onCalculate: (result: MortgageResult) => void; // Callback för att skicka resultatet
}

function Form({ onCalculate }: FormProps) {
    const [selected, setSelected] = useState<"repayment" | "interestOnly" | null>(null);
    const [values, setValues] = useState({
        mortgageAmount: "",
        mortgageTerm: "",
        interestRate: "",
        mortgageType: "",
    });
    const [showErrors, setShowErrors] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "interestRate") {
            if (/^\d*\.?\d*$/.test(value)) {
                setValues(prev => ({ ...prev, [name]: value }));
            }
        } else if (name === "mortgageAmount") {
            // Remove non-digit characters for the internal value
            const numericValue = value.replace(/\D/g, "");
            setValues(prev => ({ ...prev, [name]: numericValue }));
        } else {
            if (/^\d*$/.test(value)) {
                setValues(prev => ({ ...prev, [name]: value }));
            }
        }
    };

    const handleRadioChange = (type: "repayment" | "interestOnly") => {
        setSelected(type);
        setValues(prev => ({ ...prev, mortgageType: type }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowErrors(true);

        // Validering: alla fält måste fyllas
        if (!values.mortgageAmount || !values.mortgageTerm || !values.interestRate || !values.mortgageType) {
            return;
        }

        const mortgageValues: MortgageValues = {
            mortgageAmount: values.mortgageAmount,
            mortgageTerm: values.mortgageTerm,
            interestRate: values.interestRate,
            mortgageType: values.mortgageType as "repayment" | "interestOnly",
        };

        const calcResult: MortgageResult = calculateMortgage(mortgageValues);

        // Skicka resultatet via callback
        onCalculate(calcResult);
    };

    const formatNumberForDisplay = (num: string) => {
        if (!num) return ""; // empty string if nothing entered
        return Number(num).toLocaleString("en-US");
    };

    return (
        <form className="space-y-6 mt-5 sm:mt-10" onSubmit={handleSubmit}>
            {/* Mortgage Amount */}
            <div className="w-full">
                <label htmlFor="mortgageAmount" className="block text-[var(--Slate-700)] font-medium mb-2 text-xs">
                    Mortgage Amount
                </label>
                <div className={`group flex items-center rounded-lg border ${showErrors && !values.mortgageAmount ? "border-red-500" : "border-[var(--Slate-700)]"} focus-within:border-[var(--Lime)]`}>
                    <span className={`font-bold px-4 py-3 rounded-l-lg text-sm ${showErrors && !values.mortgageAmount ? "bg-[var(--Red)] text-[var(--White)]" : "bg-[var(--Slate-100)] text-[var(--Slate-700)]"} group-focus-within:bg-[var(--Lime)] group-focus-within:text-[var(--Slate-900)] transition`}>
                        £
                    </span>
                    <input type="text" id="mortgageAmount" name="mortgageAmount" value={formatNumberForDisplay(values.mortgageAmount)} onChange={handleChange} className="w-full rounded-r-lg focus:outline-none ml-5" />
                </div>
                <FormControl values={values} showErrors={showErrors} field="mortgageAmount" />
            </div>
            {/* Mortgage Term & Interest Rate */}
            <div className="w-full flex flex-col sm:flex-row gap-4">
                <div className="sm:w-1/2">
                    <label htmlFor="mortgageTerm" className="block text-[var(--Slate-700)] font-medium mb-2 text-xs">Mortgage Term</label>
                    <div className={`group flex items-center rounded-lg border ${showErrors && !values.mortgageTerm ? "border-red-500" : "border-[var(--Slate-700)]"} focus-within:border-[var(--Lime)]`}>
                        <input type="text" id="mortgageTerm" name="mortgageTerm" value={values.mortgageTerm} onChange={handleChange} className="w-full rounded-l-lg focus:outline-none ml-5" />
                        <span className={`font-bold px-4 py-3 rounded-r-lg text-sm ${showErrors && !values.mortgageTerm ? "bg-[var(--Red)] text-[var(--White)]" : "bg-[var(--Slate-100)] text-[var(--Slate-700)]"} group-focus-within:bg-[var(--Lime)] group-focus-within:text-[var(--Slate-900)] transition`}>years</span>
                    </div>
                    <FormControl values={values} showErrors={showErrors} field="mortgageTerm" />
                </div>
                <div className="sm:w-1/2">
                    <label htmlFor="interestRate" className="block text-[var(--Slate-700)] font-medium mb-2 text-xs">Interest Rate</label>
                    <div className={`group flex items-center rounded-lg border ${showErrors && !values.interestRate ? "border-red-500" : "border-[var(--Slate-700)]"} focus-within:border-[var(--Lime)]`}>
                        <input type="text" id="interestRate" name="interestRate" value={values.interestRate} onChange={handleChange} className="w-full rounded-l-lg focus:outline-none ml-5" />
                        <span className={`font-bold px-4 py-3 rounded-r-lg text-sm ${showErrors && !values.interestRate ? "bg-[var(--Red)] text-[var(--White)]" : "bg-[var(--Slate-100)] text-[var(--Slate-700)]"} group-focus-within:bg-[var(--Lime)] group-focus-within:text-[var(--Slate-900)] transition`}>%</span>
                    </div>
                    <FormControl values={values} showErrors={showErrors} field="interestRate" />
                </div>
            </div>
            {/* Mortgage Type */}
            <div className="w-full">
                <label id="mortgageTypeLabel" className="block text-[var(--Slate-700)] font-medium mb-2 text-xs">Mortgage Type</label>
                <div className="flex flex-col gap-3" role="radiogroup" aria-labelledby="mortgageTypeLabel">
                    <label className="cursor-pointer">
                        <input type="radio" name="mortgageType" value="repayment" className="sr-only peer" checked={selected === "repayment"} onChange={() => handleRadioChange("repayment")} />
                        <div className="flex items-center w-full p-3 rounded-lg border border-[var(--Slate-700)] transition peer-checked:border-[var(--Lime)] peer-checked:bg-[var(--Lime)]/10 hover:border-[var(--Lime)]">
                            <span className={`ml-0 h-5 w-5 rounded-full border-1 inline-block shrink-0 mr-4 relative transition ${selected === "repayment" ? "border-[var(--Lime)]" : "border-black"}`}>
                                <span className={`absolute inset-1 rounded-full opacity-100 transition ${selected === "repayment" ? "bg-[var(--Lime)]" : "border-transparent"}`} />
                            </span>
                            <span className="font-bold text-sm text-[var(--Slate-900)]">Repayment</span>
                        </div>
                    </label>

                    <label className="cursor-pointer">
                        <input type="radio" name="mortgageType" value="interestOnly" className="sr-only peer" checked={selected === "interestOnly"} onChange={() => handleRadioChange("interestOnly")} />
                        <div className="flex items-center w-full p-3 rounded-lg border border-[var(--Slate-700)] transition peer-checked:border-[var(--Lime)] peer-checked:bg-[var(--Lime)]/10 hover:border-[var(--Lime)]">
                            <span className={`ml-0 h-5 w-5 rounded-full border-1 inline-block shrink-0 mr-4 relative transition ${selected === "interestOnly" ? "border-[var(--Lime)]" : "border-black"}`}>
                                <span className={`absolute inset-1 rounded-full opacity-100 transition ${selected === "interestOnly" ? "bg-[var(--Lime)]" : "border-transparent"}`} />
                            </span>
                            <span className="font-bold text-sm text-[var(--Slate-900)]">Interest Only</span>
                        </div>
                    </label>
                </div>
                <FormControl values={values} showErrors={showErrors} field="mortgageType" />
            </div>

            <button type="submit" className="flex items-center justify-center gap-2 font-bold text-sm bg-[var(--Lime)] text-gray-900 px-6 py-4 rounded-full w-full sm:w-75 hover:bg-[var(--Lime)]/50 cursor-pointer">
                <img src={iconCalcylator} alt="Calculator Icon" className="h-5 w-5" />
                Calculate Repayments
            </button>
        </form>
    );
}

export default Form;