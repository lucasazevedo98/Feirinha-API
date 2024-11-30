import express,{json} from "express"


const app = express();
app.use(json())


const items = []


app.post("/items", (req,res) =>{
    const {name , quantity , type} = req.body;

    if(!name || !quantity || !type){
        return res.sendStatus(422)

    }

    for(let i=0;i<items.length;i++) {
        if (items[i].name === name) {
            return res.sendStatus(409)
        }
    }

    items.push({
        id: items.length + 1,
        ...req.body
    })

    res.sendStatus(201)
})



app.listen(5000,() => {console.log("Rodando tudo!!!")})