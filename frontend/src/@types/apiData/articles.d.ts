interface IArticle {
    title: string,
    date: string,
    photo: string,
    subtitle: string,
    text: string,
    video: string,
    comments: Array<IComment>,
    pathname: string,
    author: IAuthor,
    category: Array<ICategory>,
    tag: Array<ITag>,
    createdAt: string
    type: string;
    _id: string;
    createdAt: string
}