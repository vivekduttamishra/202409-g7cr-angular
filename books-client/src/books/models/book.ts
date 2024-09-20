import { Review } from "./review";

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
    price:number;
    authorId:string;
    tags:string[];
    series?:string,
    seriesIndex?:string|number;
    pages?:string|number;
    reviews?:Review[];

}