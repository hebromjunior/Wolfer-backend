const ReqCompra = require ('../models/ReqCompra')

module.exports = {

    async createRC (req, res) {
        const {
            codigo,
            descricao,
            tipo,
            valor_compra, 
            valor_venda,
            quantidade
        } = req.body

        const rc = await ReqCompra.findOne({ where: { codigo: codigo }})
        if (rc) return res.status(400).send({ error: 'requisição ja existe' })
        if (!rc) {
            const reqCompra = await ReqCompra.create ({
                codigo,
                descricao,
                tipo,
                valor_compra, 
                valor_venda,
                quantidade
            })
            reqCompra.addMP(req.body.pf)
            try {
                return res.json("Requisição adicionada com sucesso!")
            } catch (error) {
                return res.json(error)
            }
        }
    }

    
}