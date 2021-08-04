const ReqCompra = require ('../models/ReqCompra')
const ProdutoFinal = require ('../models/ProdutoFinal')
const MateriaPrima = require ('../models/MateriaPrima')


module.exports = {

    async createRC (req, res) {
        const {
            codigo,
            descricao,
            tipo,
            valor_compra, 
            valor_venda,
            quantidade,
        } = req.body

        const rc = await ReqCompra.findOne({ where: { codigo: codigo }})
        const pf = await ProdutoFinal.findOne({ where: {codigo: req.body.pf}})


        //return res.send(Object.keys(rc.__proto__))

        if (rc) return res.status(400).send({ error: 'requisição ja existe' })
        if (!rc) {
            const reqCompra = await ReqCompra.create ({
                codigo,
                descricao,
                tipo,
                valor_compra, 
                valor_venda,
                quantidade,
            })
            try {
                reqCompra.setProduto_final(pf)
                
                for (let index = 0; index < req.body.mp.length; index++) {
                    //console.log(arr[index])
                    const mp = await MateriaPrima.findOne({ where: {codigo: req.body.mp[index]}})
                    
                    reqCompra.addMatp(mp)
                }

                return res.json("Requisição adicionada com sucesso!")
            } catch (error) {
                return res.json(error)
            }
        }
    },


    async GetAllRc (req, res) {
        const requisitions = await ReqCompra.findAll()
        res.json(requisitions)
    },

    async ListMatp (req,res){
        const rc = await ReqCompra.findOne({ where: { codigo: req.body.rc }})
        if (!rc) return res.status(400).send({ error: 'requisição nao existe' })
        const matpList = await rc.getMatp()
        return res.send(matpList)
    },
    
    async AddMatp (req,res){
        const rc = await ReqCompra.findOne({ where: { codigo: req.body.rc }})
        const mp = await MateriaPrima.findOne({where: { codigo: req.body.mp }})
        if (!rc) return res.status(400).send({ error: 'requisição nao existe' })
        if (!mp) return res.status(400).send({ error: 'materia prima nao existe' })
        return res.send(rc.addMatp(mp))

    }
}