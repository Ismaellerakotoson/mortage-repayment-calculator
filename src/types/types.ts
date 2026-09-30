export type MortgageType = "repayment" | "interest-only";

export interface MortageForm {
  amount: string;
  term: string;
  rate: string;
  type: MortgageType | "";
};

export interface MortageErrors {
  amount: boolean;
  term: boolean;
  rate: boolean;
  type: boolean;
}

export type Results = { monthly: number; total: number } | null;