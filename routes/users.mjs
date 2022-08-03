import { Router } from 'express';
const router = Router();
import { getUsers, insertUser } from '../controllers/usersController.mjs';

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    var users = await getUsers();
    console.log(users);
    res.send(users);
  } catch (error) {
    console.log(error);
  }
  
});

router.post('/', async(req, res, next) => {
  try {
    const result = await insertUser(req.get('user'));

    res.send(result);
  } catch (error) {
    console.log(error);
  }
})

export default router;
