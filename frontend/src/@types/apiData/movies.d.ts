interface IMovie {
    pathname: string,
    rating: number,
    score: number,
    title: string,
    subtitle: string,
    photo: string,
    subphoto: string,
    genre: Array<IGenre>, //////
    trailer: string,
    year: number,
    status: string,
    duration: string,
    studio: string,
    theatricalRelease: number,
    streamingRelease: string,
    story: string,
    fullStory: string,
    actors: Array<IActor>,
    staff: Array<IStaff>, /////
    reviews: Array<IReview>, ///
    type?: string,
    createdAt: string
}