export interface IRegisterForm {
  password: string;
  email: string;
  name: string;
  document: string;
  phone: string;
  confirmPassword: string;
}

export interface ILoginForm {
  password: string;
  email: string;
}

export interface IRecharge {
  document: string;
  phone: string;
  balance: number;
}

export interface ICreateWallet {
  document: string;
  phone: string;
}

export interface IPay {
  document: string;
  amount: number;
}
