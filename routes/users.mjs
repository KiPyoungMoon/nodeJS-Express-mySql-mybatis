import { Router } from 'express';
import { getUsers, insertUser } from '../controllers/usersController.mjs';

const router = Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    let users = await getUsers();
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const result = await insertUser(req.get('user'));

    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

export default router;
