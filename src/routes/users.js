import { Router } from "express";
import { query, validationResult, body,matchedData,checkSchema} from 'express-validator';
import { monsterTrio } from "../utils/monsters.js";
import {createMonsterValidationSchema} from '../utils/validationSchema.js';
import { resolveIndexByUserId } from "../utils/middlewares.js";
import User from '../mongoose/schemas/user.js';
import { hashPassword } from "../utils/helpers.js";
const router=Router();
router.get('/api/users',
     query('filter').notEmpty().withMessage('cannot be empty')
     .isString().withMessage('must be a string')
     .isLength({ max: 10, min: 3 }).withMessage('name must be between 3 and 10 characters'), 
     (req, res) => {
    const result = validationResult(req);
    console.log(result);
    const { query: { filter, value } } = req;
    if (filter && value)
        return res.send(monsterTrio.filter((user) => user[filter].includes(value)));
    return res.send(monsterTrio);
});
router.post('/api/users',
    checkSchema(createMonsterValidationSchema),
    async(req, res) => {
    const result=validationResult(req);
    if(!result.isEmpty())
        return res.status(400).send({error:result.array()});
    const data=matchedData(req);
    data.password=hashPassword(data.password);
    const newUser=new User(data);//await User.create(body) means it creates instance and also saves
    try
    {
        const savedUser=await newUser.save();
        return res.status(201).send(savedUser);
    }
    catch(err)
    {
        console.log(err);
        return res.sendStatus(400);
    }
});
router.get('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const { findUserIndex } = req;
    const findUsers = findUserIndex
    return res.send(monsterTrio[findUsers]);
});
router.put('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const { body, findUserIndex } = req;
    monsterTrio[findUserIndex] = { id: monsterTrio[findUserIndex].id, ...body };
    return res.sendStatus(200);
});
router.patch('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const { body, findUserIndex } = req;
    monsterTrio[findUserIndex] = { ...monsterTrio[findUserIndex], ...body };
    return res.sendStatus(200);
});
router.delete('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const { findUserIndex } = req;
    monsterTrio.splice(findUserIndex, 1);
    return res.sendStatus(200);
});
export default router;