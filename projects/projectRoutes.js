const express = require('express');
const router = express.Router();
const db = require('./projectModel');



//GET ALL PROJECTS

router.get('/', async (req, res)=>{
    
    const projects = await db.get();
    try{
        res.status(200).json(projects)
    }
    catch(er){
        res.status(500).json({message: 'There was an error retrieving the data'})
    }

});

//GET PROJECT BY ID

router.get('/:id', async (req, res)=>{

 let {id} = req.params;
 let project = await db.get(id);

 try{
     if(project){
    res.status(200).json(project)
 }
 else{
     res.status(404).json({message: 'Project Not Found'})
 }
}
 catch(er){
    res.status(500).json({message: 'There was an error retrieving the data'})
 }
})

//GET A PROJECT'S ACTIONS

router.get('/:id/actions', async (req, res)=>{
    let {id} = req.params;
    let projectActions = await db.getProjectActions(id);

    try{
        res.status(200).json(projectActions);
    }
    catch(er){
        res.status(500).json({message: 'There was an error retrieving the data'})
    }
});

//ADD A PROJECT

router.post('/', (req, res)=>{
    
    let {name, description } = req.body;
    let project = req.body;
    
    if(name && description){
    db.insert(project)
    .then(r => res.status(200).json(r))
    .catch(err => res.status(500).json({message: 'There was an error processing the data'}));
    }
    else{
        res.status(400).json({message: 'Please try again with the correct parameters'})
    }

})
//EDIT A PROJECT

router.put('/:id',  async (req, res)=>{
    let {id} = req.params;
    let project = req.body; 
    
    let update = await db.update(id, project);
    try{
        if(update)
        {res.status(200).json(update)}
        else{
        res.status(404).json({message: 'Project Not Found'})
        }
    }
    catch(er){
        res.status(500).json({message: 'There was an error processing the data'})
    }
    

})


//DELETE POST
router.delete('/:id', async (req, res) => {
    let {id} = req.params;
    let project = await db.get(id);
    let deletion = await db.remove(id);
    console.log(deletion);
    try{
        
        if(deletion){
        res.status(200).json({message: 'Deleted Successfully'})
    }
        else{
            res.status(404).json({message: 'Project Not Found'})
        }

    }
    catch(er){
        if(!project){
            res.status(404).json({message: 'Project Not Found'})
        }
        else{
        res.status(500).json({message: 'There was an error processing your request'})
        }
    }

})

module.exports = router;