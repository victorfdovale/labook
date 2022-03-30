

export class Post {
    constructor(
        private id: string,
        private userId: string,
        private picture: string,
        private description: string,
        private created_at : string,
        private type : TYPE
    ){}
}

export type NewPostDTO = {
    picture: string,
    description: string,
    type: TYPE
}

export enum TYPE  {
    normal = "normal",
    event = "event"
}