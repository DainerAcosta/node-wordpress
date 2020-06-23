import { Request, Response } from 'express';
import pool from '../database/db';

class UserController {

    public async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const usersdatos = await pool.query('SELECT * FROM wp_users');
            res.json(usersdatos);
        } catch (error) {
            console.log(error);
        }
    }

}

export const userController = new UserController;