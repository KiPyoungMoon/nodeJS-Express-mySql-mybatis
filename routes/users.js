import { Router } from 'express';
const router = Router();
import { getUsers, createUser } from '../controllers/usersController.js';

/* GET users listing. */
router.get('/', async function(req, res, next) {
  console.log('route.users get');
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
    const result = await createUser(req.get('user'));

    res.send(result);
  } catch (error) {
    console.log(error);
  }
})

export default router;
