export interface User {
    customer_id: number;
    customer_first_name: string;
    customer_last_name: string;
    customer_email: string;
    customer_phone: string;
    customer_language: string;
    orders_count: number;
    likes_count: number;
    dislikes_count: number;
    collages_count: number;
    image: string;
    role_id: number | null;
    cart_count: number;
    token?: string;
}

export interface AuthResponse {
    data: User;
    status: string;
    message: string;
    status_code: number;
} 