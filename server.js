const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const users = [
    { id: '1', name: 'Ariel', password: 'password', role: 'admin' },
    { id: '2', name: 'yann', password: '24cmAuRepos', role: 'user' }
]

const jwtSecret = 'lefootcunsportdemerdeattarde'
const generateJwt =(id,name,role) =>{
    return jwt.sign({
        iss: 'http://localhost:3000',
        id, 
        name,
        role,
        exp: parseInt(Date.now() / 1000 + 60 * 60)// Ce JWT expirera dans 1h  
    }, jwtSecret)
}

const app= express()
app.use(helmet())
app.use(bodyParser.json())

app.post('/signin', (req, res)=>{
    const{name, password}= req.body
    const user = users.find(u=> u.name === name && u.password === password)
    if (!user){
        return res.status(401).json({msg:'Accès refusé'})
    }
    const { name: username, id, role } = user
    const token = generateJwt(id, username, role)
    res.json({token})

    return res.json({ msg: `${ username } a l’id ${ id } et est ${ role }.` }) 
})

app.get('/admin', (req, res) => {
    return res.json({ msg: 'Bienvenue admin !' })
})



const port = 3000
app.listen(port,() => console.log(`Serveur lancé sur http://localhost:${port}`))
