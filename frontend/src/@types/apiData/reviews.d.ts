interface IReview {
    _id: string;
    rating: number;
    title: string,
    date: string,
    photo: string,
    subtitle: string,
    text: string,
    subphoto: string,
    video: string,
    comments: Array<IComment>,
    pathname: string,
    author: IAuthor,
    category: Array<ICategory>,
    tag: Array<ITag>,
    score: number,
    about: string,
    createdAt: string,
    type?: string
}