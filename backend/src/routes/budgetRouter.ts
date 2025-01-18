import { Router } from "express";
import { body, param } from "express-validator";
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import { validateBudgetExists, validateBudgetId, validateBudgetInput } from "../middleware/budget";

const router = Router()

router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExists)

// getAll
router.get('/', BudgetController.getAll)

// create
router.post('/',
    validateBudgetInput,
    handleInputErrors,
    BudgetController.create)

// getById
router.get('/:budgetId', BudgetController.getBudgetById)

// updateById
router.put('/:budgetId',
    validateBudgetInput,
    handleInputErrors,
    BudgetController.updateBudgetById)

// deleteById
router.delete('/:budgetId', BudgetController.deleteBudgetById)

export default router