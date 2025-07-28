
// Booking gerelateerde TypeScript interfaces
export interface BookingEntity {
  id: string;
  user_id: string;
  flight_id: string;
  total_price: number;
  passenger_count: number;
  passenger_details?: PassengerDetails;
  payment_details?: PaymentDetails;
  booking_status: BookingStatus;
  created_at: string;
  updated_at: string;
}

export interface PassengerDetails {
  passengers: Array<{
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    passportNumber?: string;
    nationality?: string;
  }>;
}

export interface PaymentDetails {
  payment_method: string;
  transaction_id?: string;
  payment_status: 'pending' | 'completed' | 'failed';
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface CreateBookingRequest {
  flight_id: string;
  passenger_count: number;
  passenger_details: PassengerDetails;
  payment_details: Omit<PaymentDetails, 'transaction_id'>;
}
