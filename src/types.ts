export interface Post {
    userId: User['id'];
    id?: number;
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

export interface Picture {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export type SetPostsFE = (newValue: Post[]) => void;

export interface ProfileProps {
    userData: User;
}

export interface PostItemProps extends Post {
    editTools: {
        editMode: boolean;
        setTitleValue: any;
        setBodyValue: any;
    } | null;
}
