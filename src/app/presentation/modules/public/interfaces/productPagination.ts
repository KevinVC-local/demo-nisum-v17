export interface ProductPagination {
    id:          number;
    title:       string;
    price:       number;
    description: string;
    images:      string[];
    creationAt:  Date;
    updatedAt:   Date;
    category:    Category;
    discount: number;
    rating: number;
    discountPercentage: string;
    totalPrice: string;
}

export interface Category {
    id:         number;
    name:       string;
    image:      string;
    creationAt: Date;
    updatedAt:  Date;
}
