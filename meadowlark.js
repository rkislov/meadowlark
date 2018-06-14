const express = require('express')

const app = express()

const fortunes = [
    "Победи свои страхи, или он победят тебя",
    "Рекам нужны истоки",
    "Не бойся неведомого",
    "Тебя ждет приятный сюрприз",
    "Будь проще везде, где только можно",
]
const handlebars = require('express-handlebars')
    .create({defaultLayout: 'main'})
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.set('port', process.env.PORT || 3000 )
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res)=>{
   res.render('home')
})
app.get('/about', (req, res)=>{
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
    res.render('about', {fortune: randomFortune})
})
app.use((req,res)=>{
    res.status(404)
    res.render('404')
})

app.use((err,req,res, next) => {
    console.log(err.stack)
    res.status(500)
    res.render('500')
})

app.listen(app.get('port'), () => {
    console.log(`Сервер запущен по адресу http://localhost:${app.get('port')} нажмите  Ctrl + C для завершения`)
})