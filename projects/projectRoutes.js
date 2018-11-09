const express = require('express');
const router = express.Router();
const db = require('./projectModel');

function allCap(req, res, next){
    if(req.body.name)
    {req.body.name = req.body.name.toUpperCase();}
    next();
}


router.get('/', async (req, res)=>{
    
    const users = await db.get();
    try{
        res.status(200).json(users)
    }
    catch(er){
        res.status(500).json({message: 'There was an error retrieving the data'})
    }

});

router.get('/:id', async (req, res)=>{

 let {id} = req.params;
 let user = await db.get(id);

 try{
     if(user){
    res.status(200).json(user)
 }
 else{
     res.status(404).json({message: 'User Not Found'})
 }
}
 catch(er){
    res.status(500).json({message: 'There was an error retrieving the data'})
 }
})

router.get('/:id/posts', async (req, res)=>{
    let {id} = req.params;
    let userPosts = await db.getUserPosts(id);

    try{
        res.status(200).json(userPosts);
    }
    catch(er){
        res.status(500).json({message: 'There was an error retrieving the data'})
    }
});


router.post('/', allCap, (req, res)=>{
    
    let user = req.body;
    
    db.insert(user)
    .then(r => res.status(200).json(r))
    .catch(err => res.status(500).json({message: 'There was an error processing the data'}));

})

router.put('/:id', allCap, async (req, res)=>{
    let {id} = req.params;
    let user = req.body; 
    let prevName = await db.get(id);
    let update = await db.update(id, user);
    try{
        if(update)
        {res.status(200).json(update)}
        else{
        res.status(404).json({message: 'User Not Found'})
        }
    }
    catch(er){
        res.status(500).json({message: 'There was an error processing the data'})
    }
    

})



router.delete('/:id', async (req, res) => {
    let {id} = req.params;
    let user = await db.get(id);
    let deletion = await db.remove(id);

    try{console.log(user)
        if(user){
        res.status(200).json(user)
    }
        else{
            res.status(404).json({message: 'User Not Found'})
        }

    }
    catch(er){
        if(!user){
            res.status(404).json({message: 'User Not Found'})
        }
        else{
        res.status(500).json({message: 'There was an error processing your request'})
        }
    }

})