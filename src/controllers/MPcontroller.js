const MateriaPrima = require ('../models/MateriaPrima')

module.exports = {

    async CreateMateriaPrima (req, res) {
        const {
            codigo,
            ncm,
            cfop,
            sct,
            descricao,
            unid_medida,
            tipo,
            valor_compra,
            valor_venda,
            quantidade,
        } = req.body


        //Checar se o email existe
        const mp = await MateriaPrima.findOne({ where: { ncm: ncm } })
        if (mp) return res.status(400).send({ error: 'Materia Prima ja existe' })
        if (!mp) {
            const materiaPrima = MateriaPrima.create ({
                codigo,
                ncm,
                cfop,
                sct,
                descricao,
                unid_medida,
                tipo,
                valor_compra,
                valor_venda,
                quantidade
            }).catch(err => res.send(err))

            
            return res.json({
                descricao: descricao
            })
            
        }
    },

    async GetMateriaPrimaCategoria (req,res) {
        const mp = await MateriaPrima.findAll({where: {tipo: req.body.tipo}})
        if (!mp) return res.send(400).json("Tipo não encontrado")
        try {
            return res.json(mp)
        } catch (error) {
            
        }
        
    },

    async UpdateMateriaPrima(req,res) {
        const {
            codigo,
            ncm,
            cfop,
            sct,
            descricao,
            unid_medida,
            tipo,
            valor_compra,
            valor_venda,
            quantidade,
        } = req.body

        const mp = await MateriaPrima.findOne({where: {codigo: codigo}})
        if (!mp) return res.status(400).json("Materia Prima não existe")
        if (mp){

            try {

                const newMP = await mp.update({
                    codigo,
                    ncm,
                    cfop,
                    sct,
                    descricao,
                    unid_medida,
                    tipo,
                    valor_compra,
                    valor_venda,
                    quantidade,
                })
        
                return res.json(newMP)
            
        } catch (error) {
            return res.json(error)
        }}
        
        
    },

    async GetAllMateriaPrima (req,res) {
        const mp = await MateriaPrima.findAll()
        try {
            return res.json(mp)
        } catch (error) {
            return res.json(error)
        }
    },

    async DelMP(req,res) {
        const mp = await MateriaPrima.findOne({where: {codigo:req.body.codigo}})
        const mpDeleted = await mp.destroy()
        try {
            return res.json(mp.descricao + ' deletado com sucesso')
        } catch (error) {
            return res.json(error)}
    },

    async FindTypes(req,res){
        const tipos = await MateriaPrima.findAndCountAll(tipos) 
        return res.json(tipos)
    }


}