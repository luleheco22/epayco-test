import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Función para registrar un usuario
export const registerCustomer = async (data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/register-customer`, data);

    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Función para hacer login de un usuario
export const loginCustomer = async (data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/login-customer`, data);

    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// Función para recargar el wallet
export const rechargeWallet = async (data: any, token: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/recharge-wallet`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error recharging wallet:", error);
    throw error;
  }
};

// Función para hacer un pago
export const pay = async (data: any, token: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/pay`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error making payment:", error);
    throw error;
  }
};

// Función para confirmar el pago
export const confirmPayment = async (data: any, token: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/confirm-payment`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error confirming payment:", error);
    throw error;
  }
};

// Función para obtener el balance del wallet
export const getBalance = async (
  document: string,
  phone: string,
  token: string,
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/balance/${document}/${phone}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
};
