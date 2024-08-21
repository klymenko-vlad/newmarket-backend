import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    user: mongoose.Types.ObjectId;
    date: Date;
    name: string;
    price: number;
    mainPicture: string;
    pictures: string[];
    description: string;
    quantity: number;
    category: "womanfashion" | "menfashion" | "electronics" | "accessories" | "furniture" | "football" | "groceries" | "other";
    rating: number;
    pastPrice?: number | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    user: mongoose.Types.ObjectId;
    date: Date;
    name: string;
    price: number;
    mainPicture: string;
    pictures: string[];
    description: string;
    quantity: number;
    category: "womanfashion" | "menfashion" | "electronics" | "accessories" | "furniture" | "football" | "groceries" | "other";
    rating: number;
    pastPrice?: number | null | undefined;
}> & {
    user: mongoose.Types.ObjectId;
    date: Date;
    name: string;
    price: number;
    mainPicture: string;
    pictures: string[];
    description: string;
    quantity: number;
    category: "womanfashion" | "menfashion" | "electronics" | "accessories" | "furniture" | "football" | "groceries" | "other";
    rating: number;
    pastPrice?: number | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    user: mongoose.Types.ObjectId;
    date: Date;
    name: string;
    price: number;
    mainPicture: string;
    pictures: string[];
    description: string;
    quantity: number;
    category: "womanfashion" | "menfashion" | "electronics" | "accessories" | "furniture" | "football" | "groceries" | "other";
    rating: number;
    pastPrice?: number | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    user: mongoose.Types.ObjectId;
    date: Date;
    name: string;
    price: number;
    mainPicture: string;
    pictures: string[];
    description: string;
    quantity: number;
    category: "womanfashion" | "menfashion" | "electronics" | "accessories" | "furniture" | "football" | "groceries" | "other";
    rating: number;
    pastPrice?: number | null | undefined;
}>> & mongoose.FlatRecord<{
    user: mongoose.Types.ObjectId;
    date: Date;
    name: string;
    price: number;
    mainPicture: string;
    pictures: string[];
    description: string;
    quantity: number;
    category: "womanfashion" | "menfashion" | "electronics" | "accessories" | "furniture" | "football" | "groceries" | "other";
    rating: number;
    pastPrice?: number | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default _default;
