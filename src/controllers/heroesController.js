const fs = require('fs');
const path = require('path');

const heroesFilePath = path.join(__dirname, '../data/heroes.json');
let heroes = JSON.parse(fs.readFileSync(heroesFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {
    showAll:(req,res)=>{
        heroes = JSON.parse(fs.readFileSync(heroesFilePath, 'utf-8'));
        res.render('heroes/heroes',{heroes:heroes})
    },
    showCreateHeroe:(req,res)=>{
      res.render('heroe/heroeFormCreate')
    },
    createHeroe:(req,res)=>{
            let newHeroe={
                id:heroes[heroes.length - 1].id+1,
                nombre:req.body.name,
                bio:req.body.bio,
                img:req.file.filename,
                aparicion:req.body.date,
                casa:req.body.casa
            }
        
        heroes.push(newHeroe);
        fs.writeFileSync(heroesFilePath,JSON.stringify(heroes,null," "));
        res.redirect('/heroes')

    },
    detail:(req,res)=>{
       const id = req.params.id;
       const heroe= heroes.find (heroe=>heroe.id==id);
       res.render('heroe/heroe',{heroe})
    },
    editHeroe:(req,res)=>{
        const id = req.params.id;
        const heroe= heroes.find (heroe=>heroe.id==id);
        res.render('heroe/heroeFormEdit',{heroe})
     },

     update:(req,res)=>{
        const id = req.params.id;
        const heroeToEdit= heroes.find (heroe=>heroe.id==id);
        const editHeroe={
            id:id,
            nombre:req.body.name,
            bio:req.body.bio,
            img:req.file?req.file.filename:heroeToEdit.img,
            aparicion:req.body.date,
            casa:req.body.casa
        }
        heroes.forEach((heroe,index)=>{
            if(heroe.id==id){
                heroes[index]=editHeroe;
            }
        });
        fs.writeFileSync(heroesFilePath,JSON.stringify(heroes,null," "));
        res.redirect('/heroes')
     },
     destroy:(req,res)=>{
        const id = req.params.id;
        const finalHeroes=heroes.filter(heroe=>heroe.id!=id);
        fs.writeFileSync(heroesFilePath,JSON.stringify(finalHeroes,null," "));
        res.redirect('/heroes')

     }
};

module.exports = controller;