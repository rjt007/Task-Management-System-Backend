const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const authorizeToken = require('../middlewares/authorizeToken');

router.get('/',authorizeToken,async(req,res)=>{
    try{
        const taskInfo = await Task.find({user:req.userId.id});
        if(!taskInfo) return res.status(400).json('No record found');
        res.status(200).json(taskInfo);
    }
    catch(err){
        res.status(501).json(err.message);
    }
});

router.post('/',authorizeToken,async(req,res)=>{
    const {title,description,dueDate,priority,status} = req.body; 
    if(!title || !description || !dueDate || !priority || !status){
        return res.status(400).json('Error! All fields are mandatory.');
    }
    try{
        const task = new Task({
            title:title,
            description:description,
            dueDate:dueDate,
            priority:priority,
            status:status,
            user:req.userId.id
        });
        await task.save();
        res.status(201).json(task);
    }
    catch(err){
        res.status(501).json(err.message);
    }
});

router.put('/',async(req,res)=>{
    const status = req.body.status; 
    const id = req.body.id;
    if(!status || !id){
        return res.sendStatus(400);
    }
    try{
        const task = await Task.findOne({_id:id});
        task.status = status;
        await task.save();
        return res.status(201).json({success:true});
    }
    catch(err){
        res.status(501).json(err.message);
    }
});


router.delete('/:id',async(req,res)=>{
    const id = req.params.id;
    if(!id){
        return res.sendStatus(400);
    }
    try{
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(201).json({success:true});
    }
    catch(err){
        res.status(501).json(err.message);
    }
});
module.exports = router;