import { Router } from "express";
import { body, param } from "express-validator";
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import { validateBudgetExists, validateBudgetId, validateBudgetInput } from "../middleware/budget";
import { ExpensesController } from "../controllers/ExpenseController";
import { validateExpenseExists, validateExpenseId, validateExpenseInput } from "../middleware/expense";

const router = Router()

router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExists)

router.param('expenseId', validateExpenseId)
router.param('expenseId', validateExpenseExists)

/** BUDGETS ROUTES */
// getAll
router.get('/', BudgetController.getAll)

// create
router.post('/',
    validateBudgetInput,
    handleInputErrors,
    BudgetController.create)

// getById
router.get('/:budgetId', BudgetController.getById)

// updateById
router.put('/:budgetId',
    validateBudgetInput,
    handleInputErrors,
    BudgetController.updateById)

// deleteById
router.delete('/:budgetId', BudgetController.deleteById)



/** EXPENSES ROUTES */
// create
router.post('/:budgetId/expenses',
    validateExpenseInput,
    handleInputErrors,
    ExpensesController.create)

// getById
router.get('/:budgetId/expenses/:expenseId', ExpensesController.getById)

// updateById
router.put('/:budgetId/expenses/:expenseId',
    validateExpenseInput,
    handleInputErrors,
    ExpensesController.updateById)

// deleteById
router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById)


export default router