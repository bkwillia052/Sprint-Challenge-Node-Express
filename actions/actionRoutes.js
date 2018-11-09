const express = require('express');
const router = express.Router();
const db = require('./actionModel');
//GET ALL ACTIONS

router.get('/', async (req, res)=>{
    
    const actions = await db.get();
    try{
        res.status(200).json(actions)
    }
    catch(er){
        res.status(500).json({message: 'There was an error retrieving the data'})
    }

});

//GET ACTION BY ID

router.get('/:id', async (req, res)=>{

 let {id} = req.params;
 let action = await db.get(id);

 try{
     if(action){
    res.status(200).json(action)
 }
 else{
     res.status(404).json({message: 'Action Not Found'})
 }
}
 catch(er){
    res.status(500).json({message: 'There was an error retrieving the data'})
 }
})


//ADD AN ACTION

router.post('/', (req, res)=>{
    
    let {project_id, description, notes } = req.body;
    let action = req.body;
    
    if(project_id && notes && description){
    db.insert(action)
    .then(r => res.status(200).json(r))
    .catch(err => res.status(500).json({message: 'There was an error processing the data'}));
    }
    else{
        res.status(400).json({message: 'Please try again with the correct parameters'})
    }

})

//EDIT AN ACTION

router.put('/:id',  async (req, res)=>{
    let {id} = req.params;
    let action = req.body; 
    
    let update = await db.update(id, action);
    try{
        if(update)
        {res.status(200).json(update)}
        else{
        res.status(404).json({message: 'Action Not Found'})
        }
    }
    catch(er){
        res.status(500).json({message: 'There was an error processing the data'})
    }
    

})


//DELETE ACTION
router.delete('/:id', async (req, res) => {
    let {id} = req.params;
    let action = await db.get(id);
    let deletion = await db.remove(id);
    console.log(deletion);
    try{
        
        if(deletion){
        res.status(200).json({message: 'Deleted Successfully'})
    }
        else{
            res.status(404).json({message: 'Action Not Found'})
        }

    }
    catch(er){
        if(!action){
            res.status(404).json({message: 'Action Not Found'})
        }
        else{
        res.status(500).json({message: 'There was an error processing your request'})
        }
    }

})

module.exports = router;