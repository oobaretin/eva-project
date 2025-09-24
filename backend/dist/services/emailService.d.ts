interface BookingData {
    customer: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        hairLength?: string;
        hairTexture?: string;
        previousBraids?: boolean;
        allergies?: string;
        notes?: string;
    };
    service: {
        name: string;
        price: string;
        duration: string;
    };
    date: string;
    time: string;
}
declare class EmailService {
    private transporter;
    constructor();
    sendBookingNotification(bookingData: BookingData): Promise<void>;
    sendCustomerConfirmation(bookingData: BookingData): Promise<void>;
}
declare const _default: EmailService;
export default _default;
//# sourceMappingURL=emailService.d.ts.map