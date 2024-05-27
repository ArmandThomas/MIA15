import type { RequestHandler } from "express";
import { getDB } from "@/db/index.js";
import { z } from "zod";

interface PaginatedResult<T> {
    data: T;
    currentPage: number;
    totalPages: number;
    totalItems: number;
}

const querySchema = z.object({
    page: z.string().transform((val) => parseInt(val, 10)).optional().default('1').refine(val => !isNaN(val) && val > 0),
    limit: z.string().transform((val) => parseInt(val, 10)).optional().default('10').refine(val => !isNaN(val) && val > 0),
});

const db = getDB();

const getAll: RequestHandler = async (req, res): Promise<any> => {
    const queryParams = querySchema.parse(req.query);
    const page = queryParams.page;
    const limit = queryParams.limit;

    try {
        const offset = (page - 1) * limit;
        const results = await db.query(`SELECT COUNT(*) as count FROM ${process.env.DB_TABLE_PAYS}`);
        const totalItems = (results as any)[0].count;
        const data = await db.query(`SELECT * FROM ${process.env.DB_TABLE_PAYS} LIMIT ? OFFSET ?`, [limit, offset]);
        const totalPages = Math.ceil(totalItems / limit);
    
        const response: PaginatedResult<any> = {
            data,
            currentPage: page,
            totalPages,
            totalItems,
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
