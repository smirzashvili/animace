interface IManga {
    pathname: string,
    rating: number,
    title: string,
    photo: string,
    genre: Array<IGenre>, //////
    alternativeName: string,
    author: IAuthor,
    publisher: string,
    year: number,
    status: string,
    views: string,
    volumes: string,
    releaseDate: string,
    finishDate: string,
    fullStory: string,
    reviews: Array<IReview>,
    type?: string
    createdAt: string;
}