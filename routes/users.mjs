import { Router } from 'express';
import * as rTracer from 'cls-rtracer';

import { getUsers, insertUser, updateUser, deleteUser, getUser, testApi } from '../controllers/usersController.mjs';

const router = Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const requestId = rTracer.id();
    console.log(`requestId: ${requestId}`);

    let users = await getUsers();

    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const requestId = rTracer.id();
    console.log(`requestId: ${requestId}`);

    const result = await insertUser(req.get('user'));

    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const requestId = rTracer.id();
    console.log(`requestId: ${requestId}`);

    const result = await updateUser(req.get('user'));

    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const requestId = rTracer.id();
    console.log(`requestId: ${requestId}`);

    const result = await deleteUser(req.get('user'));

    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

router.get('/:test', async (req, res, next) => {
  try {
    
    console.log('test');
    let result = await insertUser({ userId: 'test', password: '1234', email: 'test@test.com', name: '테스터' });
    result = await updateUser({ userId: 'test', password: '1234', email: 'test@test.com', name: '테스터' });
    result = await deleteUser({ userId: 'test' });
    // const result = await testApi(req.get('user'));

    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

export default router;
