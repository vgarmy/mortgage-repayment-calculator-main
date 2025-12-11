import { useState } from "react";
import Form from "./form"
import illustrationEmpty from "/images/illustration-empty.svg"

function Calculator() {

    const [resetKey, setResetKey] = useState<number>(0);

    return (
        <div className='bg-[var(--White)] w-full rounded-2xl flex flex-row'>
            <div className="w-1/2 p-[46px]">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="font-bold text-[var(--Slate-900)] text-xl">Mortgage Calculator</h1>
                  <p
                        className="text-xs text-[var(--Slate-700)] cursor-pointer underline hover:text-[var(--Slate-900)]"
                        onClick={() => setResetKey(prev => prev + 1)}
                    >
                        Clear All
                    </p>
                </div>
              <Form  key={resetKey}/>
            </div>
            <div className="w-1/2 flex flex-col items-center justify-center gap-3 bg-[var(--Slate-900)] rounded-bl-[75px] px-[50px] text-center">
                <img src={illustrationEmpty} alt="Empty result illutration" />
                <p className="text-xl text-[var(--White)] font-bold">Results shown here</p>
                <p className="text-xs text-[var(--Slate-100)] mx-auto">Complete the form and click “calculate repayments” to see what your monthly repayments would be.</p>
            </div>
        </div>
    )
}

export default Calculator
