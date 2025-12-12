import { useState } from "react";
import Form from "./form";
import illustrationEmpty from "/images/illustration-empty.svg";
import type { MortgageResult } from "./calculations";

function Calculator() {
    const [resetKey, setResetKey] = useState<number>(0);
    const [result, setResult] = useState<MortgageResult | null>(null);

    return (
        <div className="bg-[var(--White)] w-full rounded-2xl flex flex-col sm:flex-row">
            {/* Formulär */}
            <div className="sm:w-1/2 p-[46px]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="font-bold text-[var(--Slate-900)] text-xl">Mortgage Calculator</h1>
                    <p
                        className="text-xs text-[var(--Slate-700)] cursor-pointer underline hover:text-[var(--Slate-900)]"
                        onClick={() => {
                            setResetKey(prev => prev + 1);
                            setResult(null);
                        }}
                    >
                        Clear All
                    </p>
                </div>
                <Form key={resetKey} onCalculate={setResult} />
            </div>

            {/* Resultatpanel */}
            <>
                {result ? (
                    <div className="sm:w-1/2 flex flex-col items-start gap-3 bg-[var(--Slate-900)] sm:rounded-bl-[75px] p-[46px] p-10">
                        <p className="font-bold text-[var(--White)] text-xl">Your results</p>
                        <p className="text-[var(--Slate-700)]">Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.</p>
                        <div className="rounded-lg bg-black w-full p-10 border-t-5 border-[var(--Lime)] mt-10">
                            <div className="flex flex-col gap-1">
                                <p className="text-[var(--Slate-700)]">Monthly Payment</p>
                                <p className="text-4xl text-[var(--Lime)] font-bold"> £{result.monthly}</p>
                            </div>
                            <hr className="border-0 h-px bg-[var(--Slate-700)] my-10" />
                            <div className="flex flex-col gap-1">
                                <p className="text-[var(--Slate-700)]">Total you'll repay over the term </p>
                                <p className="text-[var(--White)] font-bold text-xl">£{result.total}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="sm:w-1/2 flex flex-col items-center justify-center gap-3 bg-[var(--Slate-900)] sm:rounded-bl-[75px] sm:p-0 sm:px-[50px] text-center p-10">
                        <img src={illustrationEmpty} alt="Empty result illustration" />
                        <p className="text-xl text-[var(--White)] font-bold">Results shown here</p>
                        <p className="text-[var(--Slate-700)] mx-auto">
                            Complete the form and click “calculate repayments” to see what your monthly repayments would be.
                        </p>
                    </div>
                )}
            </>
        </div>
    );
}

export default Calculator;