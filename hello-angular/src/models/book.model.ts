export interface Review{
    _id?:string;
    name:string;
    details:string;
    title:string;
    rating:number;
}

export interface Book{
    _id?:string;
    id:string;
    isbn?:string;
    title:string;
    author?:string;
    description:string;
    rating:string|number;
    votes?:string|number;
    cover:string;
    price:number|string;
    authorId:string;
    tags:string[];
    series?:string,
    seriesIndex?:string|number;
    pages?:string|number;
    reviews?:Review[];

}