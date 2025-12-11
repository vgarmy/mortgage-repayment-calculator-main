
import { useState } from "react";
import iconCalcylator from "/images/icon-calculator.svg"

function Form() {

    const [selected, setSelected] = useState<"repayment" | "interestOnly" | null>(null);

    return (

        <form className="space-y-6 mt-10">
            <div className="w-full">
                <label
                    htmlFor="mortgageAmount"
                    className="block text-[var(--Slate-700)] font-medium mb-2 text-xs"
                >
                    Mortgage Amount
                </label>
                <div className="group flex items-center rounded-lg border border-[var(--Slate-700)] focus-within:border-[var(--Lime)]">
                    <span className="bg-[var(--Slate-100)] text-[var(--Slate-700)] font-bold px-4 py-2 rounded-l-lg text-sm group-focus-within:bg-[var(--Lime)] group-focus-within:text-[var(--Slate-900)] transition">
                        £
                    </span>
                    <input
                        type="text"
                        id="mortgageAmount"
                        name="mortgageAmount"
                        className="w-full rounded-r-lg focus:outline-none ml-5"
                    />
                </div>
            </div>
            <div className="w-full flex flex-row gap-4">
                <div className="w-1/2">
                    <label
                        htmlFor="mortgageAmount"
                        className="block text-[var(--Slate-700)] font-medium mb-2 text-xs"
                    >
                        Mortgage Term
                    </label>

                    <div className="group flex items-center rounded-lg border border-[var(--Slate-700)] focus-within:border-[var(--Lime)]">
                        <input
                            type="text"
                            id="mortgageAmount"
                            name="mortgageAmount"
                            className="w-full rounded-l-lg focus:outline-none ml-5"
                        />
                        <span className="bg-[var(--Slate-100)] text-[var(--Slate-700)] font-bold px-4 py-2 rounded-r-lg text-sm">
                            years
                        </span>
                    </div>
                </div>
                <div className="w-1/2">
                    <label
                        htmlFor="mortgageAmount"
                        className="block text-[var(--Slate-700)] font-medium mb-2 text-xs"
                    >
                        Interest Rate
                    </label>

                    <div className="group flex items-center rounded-lg border border-[var(--Slate-700)] focus-within:border-[var(--Lime)]">
                        <input
                            type="text"
                            id="mortgageAmount"
                            name="mortgageAmount"
                            className="w-full rounded-l-lg focus:outline-none ml-5"
                        />
                        <span className="bg-[var(--Slate-100)] focus-bg-[var(--Lime)] text-[var(--Slate-700)] font-bold px-4 py-2 rounded-r-lg text-sm group-focus-within:bg-[var(--Lime)] group-focus-within:text-[var(--Slate-900)] transition">
                            %
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <label
                    id="mortgageTypeLabel"
                    className="block text-[var(--Slate-700)] font-medium mb-2 text-xs"
                >
                    Mortgage Type
                </label>

                <div
                    className="flex flex-col gap-3"
                    role="radiogroup"
                    aria-labelledby="mortgageTypeLabel"
                >
                    {/* Repayment */}
                    <label className="cursor-pointer">
                        <input
                            type="radio"
                            name="mortgageType"
                            value="repayment"
                            className="sr-only peer"
                            onChange={() => setSelected("repayment")}
                        />
                        <div
                            className="flex items-center w-full p-3 rounded-lg border border-[var(--Slate-700)] transition
                   peer-checked:border-[var(--Lime)] peer-checked:bg-[var(--Lime)]/10 hover:border-[var(--Lime)]"
                        >
                            <span
                                className={`ml-0 h-5 w-5 rounded-full border-1 inline-block shrink-0 mr-4 relative transition
            ${selected === "repayment" ? "border-[var(--Lime)]" : "border-black"}`}
                            >
                                <span className={`absolute inset-1 rounded-full opacity-100 transition ${selected === "repayment" ? "bg-[var(--Lime)]" : "border-transparent"}`} />
                            </span>
                            <span className="font-bold text-sm text-[var(--Slate-900)]">
                                Repayment
                            </span>
                        </div>
                    </label>

                    {/* Interest Only */}
                    <label className="cursor-pointer">
                        <input
                            type="radio"
                            name="mortgageType"
                            value="interestOnly"
                            className="sr-only peer"
                            onChange={() => setSelected("interestOnly")}
                        />
                        <div
                            className="flex items-center w-full p-3 rounded-lg border border-[var(--Slate-700)] transition
                   peer-checked:border-[var(--Lime)] peer-checked:bg-[var(--Lime)]/10 hover:border-[var(--Lime)]"
                        >
                            <span
                                className={`ml-0 h-5 w-5 rounded-full border-1 inline-block shrink-0 mr-4 relative transition
            ${selected === "interestOnly" ? "border-[var(--Lime)]" : "border-black"}`}
                            >
                                <span className={`absolute inset-1 rounded-full opacity-100 transition ${selected === "interestOnly" ? "bg-[var(--Lime)]" : "border-transparent"}`} />
                            </span>
                            <span className="font-bold text-sm text-[var(--Slate-900)]">
                                Interest Only
                            </span>
                        </div>
                    </label>
                </div>
            </div>


            <button className="flex items-center justify-center gap-2 font-bold text-sm bg-[var(--Lime)] text-[var(--Slate-900)] px-6 py-3 rounded-full font-semibold cursor-pointer transition w-75 hover:bg-[var(--Lime)]/50">
                <img src={iconCalcylator} alt="Calculator Icon" className="h-5 w-5" />
                Calculate Repayments
            </button>
        </form>
    )
}

export default Form
