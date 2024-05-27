import type { RequestHandler } from "express";
import { getDB } from "@/db/index.js";
import { z } from "zod";

interface PaginatedResult<T> {
    data: T;
    currentPage: number;
    totalPages: number;
    totalItems: number;
}

const querySchemaGetAll = z.object({
    page: z.string().transform((val) => parseInt(val, 10)).optional().default('1').refine(val => !isNaN(val) && val > 0),
    limit: z.string().transform((val) => parseInt(val, 10)).optional().default('10').refine(val => !isNaN(val) && val > 0),
});

const querySchemaGetOneByName = z.object({
    name: z.string(),
});

const db = getDB();

const getAll: RequestHandler = async (req, res): Promise<any> => {
    const queryParams = querySchemaGetAll.parse(req.query);
    const { page, limit } = queryParams;

    try {
        const offset = (page - 1) * limit;
        const [count, data] = await Promise.all([
            db.query(`SELECT COUNT(*) AS count FROM ${process.env.DB_TABLE_PAYS}`),
            db.query(`SELECT * FROM ${process.env.DB_TABLE_PAYS} LIMIT ? OFFSET ?`, [limit, offset])
        ]);
        const totalItems = (count as any)[0].count;
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

const getOneByName: RequestHandler = async (req, res): Promise<any> => {
    const queryParams = querySchemaGetOneByName.parse(req.params);
    const { name } = queryParams;

    try {
        const data = await db.query(`SELECT * FROM ${process.env.DB_TABLE_PAYS} WHERE name = ? ORDER BY year DESC`, [name]);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export default { getAll, getOneByName };
