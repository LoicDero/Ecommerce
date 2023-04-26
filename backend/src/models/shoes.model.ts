import {Schema, model} from 'mongoose';
export interface Shoes{
    id: string;
    name: string;
    price: number;
    tags: string[];
    favorite: boolean;
    stars: number;
    imageUrl: string;
    brand: string;
    size: number;
}

export const ShoesSchema = new Schema<Shoes>(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        tags: {type: [String]},
        favorite: {type: Boolean, required: false},
        stars: {type: Number, required: true},
        imageUrl: {type: String, required: true},
        brand: {type: String, required: true},
        size: {type: Number, required: true}
    }, {
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        },
        timestamps: true
    }
)

export const ShoesModel = model<Shoes>('shoes', ShoesSchema);