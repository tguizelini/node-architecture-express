const app = require('./src/config/app')()
app.listen(app.get('port'), () => console.log(`Server running on port ${app.get('port')}`))