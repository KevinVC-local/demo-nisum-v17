export interface UserList {
    id:       number;
    email:    string;
    password: string;
    name:     string;
    role:     string;
    avatar:   string;
}


export interface CreateUser {
    email:    string;
    password: string;
    name:     string;
    avatar:   string;
}

export interface UpdateUser {
    email:    string;
    name:     string;
}
