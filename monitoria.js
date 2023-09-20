const express = require('express')
const fs = require('fs')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/criar', (req, res) =>{
const dados = JSON.stringify(req.body)
fs.writeFile(req.body.email+'.json',dados, err =>{
 if (err) {
    console.log(err);
}
res.send({message:"Dados salvos com sucesso"})   
}) 
})

app.get('/mostrar/:name', (req, res) =>{
    fs.readFile(req.params.name+'.json', (err,data)=>{
        const dados = JSON.parse(data)
        if (err) {
            console.log(err);
        }
        res.send({message:"Aqui estão seus dados", dados})
    })
})
app.delete('/deleta/:email',(req,res)=>{
    fs.unlinkSync(req.params.email+'.json')
    res.send({message:"Dados apagados"})   
})
app.put('/update/:email', (req,res)=>{
    const dados = JSON.stringify(req.body)
    fs.writeFileSync(req.body.email+'.json', dados, {flag:'w'})
    res.send({message:"feito.", dados})
})


app.listen(8080, () => console.log('server rodando'))