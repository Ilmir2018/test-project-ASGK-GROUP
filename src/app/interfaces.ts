export interface User {
  email: string;
  password: string;
}

export interface ClientsTableData {
  uuid: string;
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  city: string;
  birthday: string;
  phone: string;
  salary: number;
  card_number: string;
}

export interface ClientDataProfile {
  id: number;
  uuid: string;
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  city: string;
  birthday: string;
  phone: string;
  salary: number;
  card_number: string;
  messages?: string[];
}

export interface PushData {
  id: number;
  first_name: string;
}
