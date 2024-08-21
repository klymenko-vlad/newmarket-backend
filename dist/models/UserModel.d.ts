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
    expireToken?: Date | null | undefined;
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
    expireToken?: Date | null | undefined;
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
    expireToken?: Date | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
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
    expireToken?: Date | null | undefined;
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
    expireToken?: Date | null | undefined;
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
    expireToken?: Date | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default _default;
