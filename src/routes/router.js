const router = require('express').Router();

const MPcontroller = require('../controllers/MPcontroller')
const PFcontroller = require('../controllers/PFcontroller')
const RCcontroller = require('../controllers/RCcontroller')

//Pagina de teste
router.get('/', (req,res) => {res.send('pagina inicial')});


//Paginas relacionadas a itens

//Cria nova materia prima
router.post('/mp/create', MPcontroller.CreateMateriaPrima)
//Resgatar todas materias primas
router.get('/mp/catalogue/all', MPcontroller.GetAllMateriaPrima);
//Resgata todos materiais de uma categoria
router.post('/mp/catalogue/category', MPcontroller.GetMateriaPrimaCategoria)
//Atualiza Materia Prima
router.put('/mp/update', MPcontroller.UpdateMateriaPrima)
//Deleta Materia Prima
router.delete('/mp/delete', MPcontroller.DelMP)

//Categoria de produto
router.get('/mp/categorias/all', MPcontroller.FindTypes)

//Criar novo Produto Final
router.post('/pf/create', PFcontroller.CreatePF)
//Resgatar todos os produtos finais
router.get('/pf/catalogue/all', PFcontroller.GetAllPF)
//Atualiza Produto Final
router.put('/pf/update')
//Deleta Produto Final
router.delete('/pf/delete', PFcontroller.DelPF)


//Adiciona materia prima à um produto final
router.post('/pf/add/mp', PFcontroller.AddMp)
//Lista as materias primas de um produto final
router.post('/pf/catalogue/mp', PFcontroller.ListMp)
//Deletes relationship pf-mp
router.delete('/pf/remove/mp')

//Cria requisição de produto final
router.post('/rc/create', RCcontroller.createRC)
//Pega materia primas 
router.post('/rc/catalogue/mp', RCcontroller.ListMatp)
//add matprime a req
router.post('/rc/add/mp', RCcontroller.AddMatp)




module.exports = router;