import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import type { MortageErrors, MortageForm } from "../types/types";
import iconCalculator from '../assets/images/icon-calculator.svg'

interface MortageParameterProps {
  data: MortageForm;
  setData: Dispatch<SetStateAction<MortageForm>>;
  setResult: Dispatch<SetStateAction<number>>;
  setTermRepay: Dispatch<SetStateAction<number>>;
}

function MortageParameter({
  data,
  setData,
  setResult,
  setTermRepay,
}: MortageParameterProps) {

  const [errors, setErrors] = useState<MortageErrors>({
    amount: false,
    term: false,
    rate: false,
    type: false,
  });

  const calculateRepayments = (e: FormEvent) => {
    e.preventDefault();

    const newErrors: MortageErrors = {
      amount: data.amount.trim() === "",
      term: data.term.trim() === "",
      rate: data.rate.trim() === "",
      type: data.type === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((hasError) => hasError)) {
      return;
    }

    const principal = Number(data.amount);
    const monthlyRate = Number(data.rate) / 100 / 12;
    const months = Number(data.term) * 12;

    let monthly: number;

    if (data.type === "interest-only") {
      monthly = principal * monthlyRate;
    } else {
      monthly =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    const total =
      data.type === "interest-only"
        ? monthly * months + principal
        : monthly * months;

    setResult(monthly);
    setTermRepay(total);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={calculateRepayments} className="space-y-6">
      <div>
        <label className="block text-sm text-slate-700 mb-2">
          Mortgage Amount
        </label>
        <div className={`flex rounded-md border overflow-hidden focus-within:border-lime ${
          errors.amount ? "border-red" : "border-slate-300"
        }`}>
          <span className={`flex items-center px-4 font-bold ${
            errors.amount ? "bg-red text-white" : "bg-slate-100 text-slate-700"
          }`}>
            £
          </span>
          <input
            type="text"
            name="amount"
            value={data.amount}
            onChange={handleChange}
            className="w-full px-4 py-2 font-bold text-slate-900 outline-none hover:cursor-pointer"
          />
        </div>
        {errors.amount && (
          <p className="text-red text-sm mt-2">This field is required</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-700 mb-2">
            Mortgage Term
          </label>
          <div className={`flex rounded-md border overflow-hidden focus-within:border-lime ${
            errors.term ? "border-red" : "border-slate-300"
          }`}>
            <input
              type="text"
              name="term"
              value={data.term}
              onChange={handleChange}
              className="w-full px-4 py-2 font-bold text-slate-900 outline-none hover:cursor-pointer"
            />
            <span className={`flex items-center px-4 font-bold ${
              errors.term ? "bg-red text-white" : "bg-slate-100 text-slate-700"
            }`}>
              years
            </span>
          </div>
          {errors.term && (
            <p className="text-red text-sm mt-2">This field is required</p>
          )}
        </div>
        <div>
          <label className="block text-sm text-slate-700 mb-2">
            Interest Rate
          </label>
          <div className={`flex rounded-md border overflow-hidden focus-within:border-lime ${
            errors.rate ? "border-red" : "border-slate-300"
          }`}>
            <input
              type="text"
              name="rate"
              value={data.rate}
              onChange={handleChange}
              className="w-full px-4 py-2 font-bold text-slate-900 outline-none hover:cursor-pointer"
            />
            <span className={`flex items-center px-4 font-bold ${
              errors.rate ? "bg-red text-white" : "bg-slate-100 text-slate-700"
            }`}>
              %
            </span>
          </div>
          {errors.rate && (
            <p className="text-red text-sm mt-2">This field is required</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm text-slate-700 mb-2">
          Mortgage Type
        </label>
        <div className="space-y-3">
          {(["repayment", "interest-only"] as const).map((opt) => (
            <label
              key={opt}
              className={`flex items-center gap-4 rounded-lg border-2 px-4 py-3 cursor-pointer hover:border-lime ${
                data.type === opt
                  ? "border-lime bg-lime/10"
                  : "border-slate-300"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                  data.type === opt ? "border-lime" : "border-slate-500"
                }`}
              >
                {data.type === opt && (
                  <span className="h-2.5 w-2.5 rounded-full bg-lime" />
                )}
              </span>
              <input
                type="radio"
                name="type"
                value={opt}
                checked={data.type === opt}
                onChange={handleChange}
                className="sr-only"
              />
              <span className="font-bold text-slate-900">
                {opt === "repayment" ? "Repayment" : "Interest Only"}
              </span>
            </label>
          ))}
        </div>
        {errors.type && (
          <p className="text-red text-sm mt-2">This field is required</p>
        )}
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 w-full md:w-auto rounded-full bg-lime px-8 py-3 font-bold text-slate-900 hover:bg-lime/70"
      >
        <img src={iconCalculator} alt="icon-calculator" className="h-5 w-5" />
        Calculate Repayments
      </button>
    </form>
  );
}

export default MortageParameter;