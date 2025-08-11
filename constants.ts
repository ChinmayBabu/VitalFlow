
import { BloodRequest, Donor, Hospital, BloodType, InventoryItem, Task, Alert, MessageTemplate } from './types';

export const SEARCH_RADIUS = 40; // Simulated radius for geolocation search

export const mockHospitals: Hospital[] = [
  { id: 'h1', name: 'City General Hospital', location: { lat: 25, lng: 25 } },
  { id: 'h2', name: 'St. Jude Medical Center', location: { lat: 75, lng: 80 } },
];

export const mockDonors: Donor[] = [
    { id: 'd1', name: 'John Doe', bloodType: BloodType.OPositive, lastDonation: '2024-05-01', location: { lat: 30, lng: 45 }, phone: '555-0101', email: 'john@example.com', dropoutRisk: 0.1, lastContacted: '2024-05-02' },
    { id: 'd2', name: 'Jane Smith', bloodType: BloodType.ANegative, lastDonation: '2024-04-15', location: { lat: 60, lng: 20 }, phone: '555-0102', email: 'jane@example.com', dropoutRisk: 0.75, lastContacted: '2024-01-10' },
    { id: 'd3', name: 'Peter Jones', bloodType: BloodType.BPositive, lastDonation: '2024-06-20', location: { lat: 80, lng: 50 }, phone: '555-0103', email: 'peter@example.com', dropoutRisk: 0.2, lastContacted: '2024-06-21' },
    { id: 'd4', name: 'Mary Williams', bloodType: BloodType.ABNegative, lastDonation: '2024-01-05', location: { lat: 45, lng: 75 }, phone: '555-0104', email: 'mary@example.com', dropoutRisk: 0.8, lastContacted: '2023-08-15' },
    { id: 'd5', name: 'David Brown', bloodType: BloodType.ONegative, lastDonation: '2024-07-12', location: { lat: 20, lng: 70 }, phone: '555-0105', email: 'david@example.com', dropoutRisk: 0.65, lastContacted: '2023-12-01' },
    { id: 'd6', name: 'Emily Davis', bloodType: BloodType.APositive, lastDonation: '2024-06-10', location: { lat: 85, lng: 75 }, phone: '555-0106', email: 'emily@example.com', dropoutRisk: 0.3, lastContacted: '2024-06-11' },
    { id: 'd7', name: 'Michael Miller', bloodType: BloodType.OPositive, lastDonation: '2024-07-30', location: { lat: 15, lng: 18 }, phone: '555-0107', email: 'michael@example.com', dropoutRisk: 0.15, lastContacted: '2024-06-01' },
    { id: 'd8', name: 'Sarah Wilson', bloodType: BloodType.ONegative, lastDonation: '2024-07-01', location: { lat: 40, lng: 30 }, phone: '555-0108', email: 'sarah@example.com', dropoutRisk: 0.5, lastContacted: '2024-02-02' },
];

export const mockRequests: BloodRequest[] = [
  {
    id: 'r1',
    hospitalId: 'h1',
    bloodType: BloodType.ONegative,
    units: 5,
    urgency: 'Critical',
    timestamp: '2024-07-15T10:00:00Z',
    status: 'Open',
  },
  {
    id: 'r2',
    hospitalId: 'h2',
    bloodType: BloodType.APositive,
    units: 10,
    urgency: 'High',
    timestamp: '2024-07-15T11:30:00Z',
    status: 'In Progress',
  },
];

export const mockInventory: InventoryItem[] = [
  { bloodType: BloodType.APositive, units: 65, maxUnits: 100 },
  { bloodType: BloodType.ANegative, units: 20, maxUnits: 100 },
  { bloodType: BloodType.BPositive, units: 75, maxUnits: 100 },
  { bloodType: BloodType.BNegative, units: 15, maxUnits: 100 },
  { bloodType: BloodType.ABPositive, units: 40, maxUnits: 100 },
  { bloodType: BloodType.ABNegative, units: 8, maxUnits: 100 },
  { bloodType: BloodType.OPositive, units: 80, maxUnits: 100 },
  { bloodType: BloodType.ONegative, units: 12, maxUnits: 100 },
];

export const mockTasks: Task[] = [
    { id: 't1', name: 'Donor Outreach', assignee: 'Team A', start: 0, duration: 40, color: '#3b82f6' },
    { id: 't2', name: 'Logistics Prep', assignee: 'Courier Inc.', start: 20, duration: 50, color: '#f59e0b' },
    { id: 't3', name: 'Lab Crossmatch', assignee: 'City General Lab', start: 45, duration: 45, color: '#10b981' },
    { id: 't4', name: 'Hospital Transfer', assignee: 'Ambulance 03', start: 60, duration: 30, color: '#8b5cf6' },
];

export const mockAlerts: Alert[] = [
    { id: 'a1', title: 'Critical Stock: O-', description: 'Inventory for O- blood is below 15 units.', timestamp: new Date(Date.now() - 3600000).toISOString(), read: false },
    { id: 'a2', title: 'New High Urgency Request', description: 'St. Jude Medical Center requested 10 units of A+ blood.', timestamp: new Date(Date.now() - 7200000).toISOString(), read: false },
    { id: 'a3', title: 'Weather Warning', description: 'Heavy rain expected, may impact courier ETAs.', timestamp: new Date(Date.now() - 86400000).toISOString(), read: true },
     { id: 'a4', title: 'System Maintenance', description: 'Scheduled maintenance tonight at 2:00 AM.', timestamp: new Date(Date.now() - 172800000).toISOString(), read: true },
];

export const mockFollowUpTemplates: MessageTemplate[] = [
    {
        id: 't1',
        title: 'Standard Thank You',
        content: 'Hi [Donor Name], thank you so much for your recent donation! People like you are lifesavers. We\'ve sent a short survey to your email to hear about your experience. - The VitalFlow Team'
    },
    {
        id: 't2',
        title: 'Impact Update',
        content: 'Hi [Donor Name], just wanted to let you know your recent donation has already been used to help a patient at City General Hospital. Thank you for making a difference! - The VitalFlow Team'
    },
    {
        id: 't3',
        title: 'Friendly Check-in',
        content: 'Hi [Donor Name], checking in after your recent donation. We hope you\'re feeling great! Remember to stay hydrated and eat iron-rich foods. We look forward to seeing you again soon! - The VitalFlow Team'
    }
];

export const mockReachOutTemplates: MessageTemplate[] = [
    {
        id: 'ro1',
        title: 'We Miss You!',
        content: 'Hi [Donor Name], it\'s been a while! We wanted to let you know how much we value your past contributions. Your donations have a huge impact. We hope to see you again soon! - The VitalFlow Team'
    },
    {
        id: 'ro2',
        title: 'Your Impact',
        content: 'Hi [Donor Name], thinking of you! Just a reminder that a single donation can save up to three lives. You have the power to make a real difference. Hope you\'re doing well! - The VitalFlow Team'
    },
    {
        id: 'ro3',
        title: 'Blood Type Needed',
        content: 'Hi [Donor Name], we\'re currently facing a shortage of your blood type. Your donation would be especially valuable right now. If you\'re able, please consider scheduling an appointment. Thank you for your support! - The VitalFlow Team'
    }
];
