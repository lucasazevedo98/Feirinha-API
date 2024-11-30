import express, { json } from "express"


const app = express();
app.use(json())


const items = []


app.post("/items", (req, res) => {
    const { name, quantity, type } = req.body;

    if (!name || !quantity || !type) {
        return res.sendStatus(422)

    }

    for (let i = 0; i < items.length; i++) {
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

app.get("/items", (req, res) => {

    const { type } = req.query

    if (type) {
        const itemsFiltrados = items.filter((e) => {
            return e.type.toLowerCase() === type.toLowerCase()
        })
        res.send(itemsFiltrados)
    }


    res.send(items)
})

app.get("/items/:id", (req, res) => {

    const id = req.params.id;

    const item = items.find((e)=>{
        return e.id === parseInt(id)
    })

    if (isNaN(id) || id < 0) {
        return res.status(400).send({ error: "ID inválido. Deve ser um número positivo." });
    }
    if (!item) {
        return res.status(404).send({ error: "Item não encontrado" });
    }
    res.send(item)
})





app.listen(5000, () => { console.log("Rodando tudo!!!") })