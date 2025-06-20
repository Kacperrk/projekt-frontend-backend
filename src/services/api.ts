import axios from 'axios';
import { toast } from 'react-toastify';

//konfiguracja klienta axios
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

//obsługa błędów globalnie przez interceptory
api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Wystąpił nieoczekiwany błąd';

    console.error('[API ERROR]', {
      url: error.config?.url,
      method: error.config?.method,
      status,
      message,
      data: error.response?.data,
    });

    if (error.response) {
      switch (status) {
        case 400:
          toast.error(`Błąd danych: ${message}`);
          break;
        case 401:
          toast.error('Nieautoryzowany – zaloguj się ponownie');
          break;
        case 403:
          toast.error('Brak uprawnień do wykonania tej operacji');
          break;
        case 404:
          toast.error('Nie znaleziono zasobu');
          break;
        case 422:
          toast.error('Nieprawidłowe dane – popraw formularz');
          break;
        case 500:
          toast.error('Błąd serwera. Spróbuj ponownie później');
          break;
        default:
          toast.error(`Wystąpił błąd (${status}) – ${message}`);
      }
    } else if (error.request) {
      toast.error('Brak odpowiedzi z serwera. Sprawdź połączenie');
      console.warn('Brak odpowiedzi:', error.request);
    } else {
      toast.error('Wystąpił błąd podczas wysyłania zapytania');
      console.warn('Błąd przy wysyłaniu żądania:', error.message);
    }

    return Promise.reject(error);
  }
);

//przykładowe zapytanie – pobieranie produktów
export const getProducts = async () => {
  const response = await api.get('/books');
  return response.data;
};

export default api;
