import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "react-toastify";

import { IRecharge, ILoginForm, IPay } from "../interfaces/index";

import {
  registerCustomer,
  loginCustomer,
  rechargeWallet,
  pay,
  confirmPayment,
  getBalance,
} from "@/api/services";

interface WalletContextType {
  customer: any;
  token: string | null;
  balance: number;
  isConfirmed: boolean;
  login: (data: ILoginForm) => Promise<void>;
  logout: () => void;
  register: (data: any) => Promise<void>;
  rechargeWallet: (IRecharge: any) => Promise<void>;
  pay: (data: IPay) => Promise<void>;
  confirmPayment: (data: any) => Promise<void>;
  fetchBalance: (document: string, phone: string) => Promise<void>;
}

interface WalletProviderProps {
  children: ReactNode;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [customer, setCustomer] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedcustomer = localStorage.getItem("authCustomer");

    if (storedToken && storedcustomer) {
      setToken(storedToken);
      setCustomer(JSON.parse(storedcustomer));
    }
  }, []);

  const login = async (data: ILoginForm) => {
    try {
      const response = await loginCustomer(data);
      const { customer, token } = response.data;

      setToken(token);
      setCustomer(customer);
      localStorage.setItem("authToken", token);
      localStorage.setItem("authCustomer", JSON.stringify(customer));
      toast.success(`Welcome ${customer.name}`);
    } catch (error: any) {
      console.error(error.response.data);
      toast.error(error.response.data.message);
    }
  };

  const logout = () => {
    setCustomer(null);
    setToken(null);
    setBalance(0);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authCustomer");
  };

  const register = async (data: any) => {
    try {
      await registerCustomer(data);
      toast.success("Account created successfully");
    } catch (error: any) {
      console.error(error.response.data.messag);
      toast.error(error.response.data.message);
    }
  };

  const rechargeWalletHandler = async (data: IRecharge) => {
    if (!token) return;
    try {
      const response = await rechargeWallet(data, token);

      toast.success(response.data.message);
      setBalance(response.data.balance);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  const payHandler = async (data: any) => {
    if (!token) return;
    try {
      const response = await pay(data, token);

      toast.success(response.data.message, {
        autoClose: false,
      });
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  const confirmPaymentHandler = async (data: any) => {
    if (!token) return;
    try {
      const response = await confirmPayment(data, token);

      toast.success(response.data.message);
      setIsConfirmed(true);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
      setIsConfirmed(false);
    }
  };

  const fetchBalance = async (document: string, phone: string) => {
    if (!token) return;
    try {
      const response = await getBalance(document, phone, token);

      setBalance(response.data.balance);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        customer,
        token,
        balance,
        isConfirmed,
        login,
        logout,
        register,
        rechargeWallet: rechargeWalletHandler,
        pay: payHandler,
        confirmPayment: confirmPaymentHandler,
        fetchBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }

  return context;
};
