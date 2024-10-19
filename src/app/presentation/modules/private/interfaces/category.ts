export interface CategoryList {
    id:    number;
    name:  string;
    image: string;
}

export interface CreateCategory {
    name:  string;
    image: string;
}

export interface UpdateCategory {
    name: string;
}
