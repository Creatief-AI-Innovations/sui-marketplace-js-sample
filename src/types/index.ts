import { Product } from '@creatief/suisdk';
export interface User {
    id: string;
    token: string;
}

export interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

export interface ProductContextType {
    products: Product[];
    myProducts: Product[];
    loadProducts: () => Promise<void>;
    loadMyProducts: () => Promise<void>;
    buyProduct: (productId: string) => Promise<void>;
    sellProduct: (productId: string) => Promise<void>;
}