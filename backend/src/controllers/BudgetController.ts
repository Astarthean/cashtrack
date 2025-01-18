import type { Request, Response } from "express";
import Budget from "../models/Budget";

export class BudgetController {

    static getAll = async (req: Request, res: Response) => {
        try {
            const budgets = await Budget.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                // TODO: Filtrar por el usuario autenticado
            })
            res.json(budgets)
        } catch (error) {
            // console.log(error)
            res.status(500).json({ error: 'Hubo un error' })
        }
    }
    static create = async (req: Request, res: Response) => {
        try {
            const budget = new Budget(req.body)
            await budget.save()
            res.status(201).json('Presupuesto creado')
        } catch (error) {
            // console.log(error)
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static getBudgetById = async (req: Request, res: Response) => {
        res.json(req.budget)
    }

    static updateBudgetById = async (req: Request, res: Response) => {
        await req.budget.update(req.body)
        res.json('Presupuesto actualizado correctamente')
    }

    static deleteBudgetById = async (req: Request, res: Response) => {
        await req.budget.destroy()
        res.json('Presupuesto eliminado correctamente')
    }
}