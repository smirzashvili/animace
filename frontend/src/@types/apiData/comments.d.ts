interface IComment {
    createdAt: string;
    _id: string;
    author: IAuthor,
    name: string,
    email: string,
    website: string 
    text: string,
    index: number,
    replies: Array<IComment>,
    repliedTo: string,
}
interface ICommentApiReq {
    author: {
        name: string;
        email: string;
        website: string;
        text: string;
        photo: string;
        id: string;
    };
    index: number;
    parentCom: string;
    postId: string;
}