const ProdutoFinal = require ('../models/ProdutoFinal')
const MateriaPrima = require ('../models/MateriaPrima')
module.exports = {


    //adiciona produto final
    async CreatePF (req, res) {

        const{
            ncm,
            cfop,
            sct,
            descricao,
            tipo,
            valor_compra,
            valor_venda,
            quantidade,
            codigo
        } = req.body
        

        try {
            const pf = await ProdutoFinal.findOne({ where: {codigo: codigo}})
            if (pf) return res.status(400).send({ error:'Produto final ja existe!'})
            if (!pf) {
                const produtoFinal = await ProdutoFinal.create({
                    ncm,
                    cfop,
                    sct,
                    descricao,
                    tipo,
                    valor_compra,
                    valor_venda,
                    quantidade,
                    codigo
                })
                return res.status(201).json(`Produto foi adicionado com sucesso!`)
            }
        } catch (error) {
            return res.send(err)           
        }
    },

    //resgata todos os produtos finais
    async GetAllPF (req, res) {
        const produtofinal = await ProdutoFinal.findAll()
        res.json(produtofinal)
    },

    //adiciona relação produto-final <=> materia-prima
    async AddMp (req,res) {
        const pf = await ProdutoFinal.findOne({ where: {codigo: req.body.pf}})
        const mp = await MateriaPrima.findOne({ where: {codigo: req.body.mp}})
        pf.addMp(mp)
        .then(res => {return res.send('success')})
        .catch(err => {return res.json(err)})
        
    },

    async ListMp (req,res) {
        const pf = await ProdutoFinal.findOne({ where: {codigo: req.body.pf}})
        if (!pf) return res.status(400).send({ error:'Produto final não existe'})
        const subMp = await pf.getMp()
        return res.send(subMp)
    },

    async DelPF(req,res) {
        const pf = await ProdutoFinal.findOne({where: {codigo:req.body.codigo}})
        const pfDeleted = await pf.destroy()
        try {
            return res.json(mp.descricao + ' deletado com sucesso')
        } catch (error) {
            return res.json(error)}
        }

}