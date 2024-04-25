export interface Post {
    userId: User['id'];
    id: number;
    title: string;
    body: string;
}

export interface User {
    address: {
        city: string;
        geo: {
            lat: string;
            lng: string;
        };
        street: string;
        suite: string;
        zipcode: string;
    };
    company: {
        bs: string;
        catchPhrase: string;
        name: string;
    };
    email: string;
    id: number;
    name: string;
    phone: string;
    username: string;
    website: string;
}

export interface Comment {
    postId: Post['id'];
    id: number;
    name: string;
    email: User['email'];
    body: string;
}

export type SetPostsFE = (newValue: Post[]) => void;

export interface ProfileProps {
    userData: User;
}

export interface PostItemProps extends Post {
    showComments: boolean;
}
