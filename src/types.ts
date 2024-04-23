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
type changePageTo = (page: string) => void;

export interface FeedPageProps {
    changePageTo: changePageTo;
}

export interface ProfilePageProps {
    changePageTo: changePageTo;
}

export interface PostItemProps extends Post {
    changePageTo: changePageTo;
}
