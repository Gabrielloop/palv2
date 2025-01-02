import {db} from "../db";

export const Add = async (entity: any, item: any) => {
    db.open()
    try {
        const id = await db.table(entity).add(item);
        return await db.table(entity).get(id)
    } catch (error) {
        console.log(error)
    }
}

export const GetCollection = async (entity: any) => {
    try {
        return db.table(entity).toCollection()
    } catch (error) {
        console.log(error)
    }
}

export const Get = async (entity: any, id: number) => {
    try {
        return await db.table(entity).get(id)
    } catch (error) {
        console.log(error)
    }
}

export const Update = async (entity: any, itemId: number, attributs: any) => {
    try {
        await db.table(entity).update(itemId, attributs)
        return await db.table(entity).get(itemId)
    } catch (error) {
        console.log(error)
    }
}

export const Delete = async (entity: any, itemId: number) => {
    try {
        await db.table(entity).delete(itemId)
        return await db.table(entity).get(itemId)
    } catch (error) {
        console.log(error)
    }
};