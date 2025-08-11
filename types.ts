export enum BloodType {
  APositive = 'A+',
  ANegative = 'A-',
  BPositive = 'B+',
  BNegative = 'B-',
  ABPositive = 'AB+',
  ABNegative = 'AB-',
  OPositive = 'O+',
  ONegative = 'O-',
}

export type BloodRequestStatus = 'Open' | 'Fulfilled' | 'In Progress';

export interface Donor {
  id: string;
  name: string;
  bloodType: BloodType;
  lastDonation: string;
  location: { lat: number; lng: number };
  phone: string;
  email: string;
  dropoutRisk?: number; // 0.0 to 1.0
  lastContacted?: string;
}

export interface Hospital {
  id: string;
  name: string;
  location: { lat: number; lng: number };
}

export interface BloodRequest {
  id: string;
  hospitalId: string;
  bloodType: BloodType;
  units: number;
  urgency: 'Critical' | 'High' | 'Medium';
  timestamp: string;
  status: BloodRequestStatus;
}

export interface InventoryItem {
  bloodType: BloodType;
  units: number;
  maxUnits: number;
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export type AppView = 'dashboard' | 'chatbot' | 'telehealth';

export interface Task {
  id: string;
  name: string;
  assignee: string;
  start: number; // percentage from left
  duration: number; // percentage width
  color: string;
}

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

export interface Alert {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    read: boolean;
}

export interface MessageTemplate {
    id:string;
    title: string;
    content: string;
}