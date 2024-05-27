import type { RequestHandler } from "express";
import { getDB } from "@/db/index.js";
import type { QueryResult } from "mysql2";

interface PaginatedResult<T> {
    data: T;
    currentPage: number;
    totalPages: number;
    totalItems: number;
}

const db = getDB();

const getAll: RequestHandler = async (req, res): Promise<any> => {
    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = parseInt(req.query.limit as string) || 10;

    try {
        const offset: number = (page - 1) * limit;
    
        const results: QueryResult = await db.query(`SELECT COUNT(*) as count FROM ${'f'}`);
        const totalItems: number = (results as any)[0].count;
        const items: QueryResult = await db.query(`SELECT * FROM ${'f'} LIMIT ? OFFSET ?`, [limit, offset]);
        const totalPages: number = Math.ceil(totalItems / limit);
    
        const response: PaginatedResult<any> = {
            data: items,
            currentPage: page,
            totalPages: totalPages,
            totalItems: totalItems
        };
    
        res.json(response);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

const getOneByName: RequestHandler = (req, res): void => {
    const { name } = req.params;
    res.json({});
};

export default { getAll, getOneByName };
