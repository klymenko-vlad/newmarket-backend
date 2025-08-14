import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    password: string;
    role: "user" | "root" | "seller";
    profilePicUrl?: string | null | undefined;
    resetToken?: string | null | undefined;
    expireToken?: NativeDate | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    password: string;
    role: "user" | "root" | "seller";
    profilePicUrl?: string | null | undefined;
    resetToken?: string | null | undefined;
    expireToken?: NativeDate | null | undefined;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    password: string;
    role: "user" | "root" | "seller";
    profilePicUrl?: string | null | undefined;
    resetToken?: string | null | undefined;
    expireToken?: NativeDate | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    password: string;
    role: "user" | "root" | "seller";
    profilePicUrl?: string | null | undefined;
    resetToken?: string | null | undefined;
    expireToken?: NativeDate | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    password: string;
    role: "user" | "root" | "seller";
    profilePicUrl?: string | null | undefined;
    resetToken?: string | null | undefined;
    expireToken?: NativeDate | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    password: string;
    role: "user" | "root" | "seller";
    profilePicUrl?: string | null | undefined;
    resetToken?: string | null | undefined;
    expireToken?: NativeDate | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
