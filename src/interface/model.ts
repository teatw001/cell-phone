export interface IProduct {
    _id: string;
    name: string;
    price: number;
    original_price: number;
    short_description: string;
    description: string;
    images: IImage[];
    brand: {
        _id: string;
        name: string;
        slug: string;
    };
    specifications: ISpecification;
}

export interface IImage {
    base_url: string;
    is_gallery: boolean;
    label: null | string;
    large_url: string;
    medium_url: string;
    position: null | number;
    small_url: string;
    thumbnail_url: string;
}

export interface ISpecification {
    name: string;
    attributes: {
        code: string;
        value: string;
        name: string;
    }[];
}

export interface ICategory {
    _id: string;
    name: string;
    slug: string;
}

// Client interface
export interface ICart {
    user: string;
    products: ICartItem[];
    totalPrice: number;
}

export interface ICartDetail {
    _id: string;
    name: string;
    images: string;
    price: number;
    original_price: number;
}

export interface ICartItem {
    product: string;
    quantity: number;
    price: number;
}

export interface ILogin {
    email: string,
    password: string
}

export interface IRegister {
    name: string,
    email: string,
    password: string
    confirmPassword: string
};

export interface IComments {
    id: number;
    content: string;
    author: string;
    comments: IComment[];
}
export interface IComment {
    _id: string;
    user: {
        _id: string;
        name: string;
    };
    content: string;
    createdAt: string;
    updatedAt: string;
}

// Admin interface
export interface IUser {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export interface IOrder {
    _id: string;
    user: IUser;
    products: IOrderProduct;
    totalPrice: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface IOrderProduct {
    product: IProduct;
    name: string
    quantity: number;
    price: number;
}

export interface IEditOrder {
    status: string;
}