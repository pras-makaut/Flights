const {Logger } = require('../config');

class CrudRepository{
    constructor(model){
        this.model=model;
    }

    async createData(data){
        
        const resposne = await this.model.create(data);
        return resposne;
        
    }

    async destroy(data){
        try {
            const resposne = await this.model.destroy({
                where:{
                    id:data
                }
            });
            return resposne;
        } catch (error) {
            Logger.error('Something went wrong in the crud repo : destroy');
            throw error;
        }
    }
    async get(data){
        try {
            const resposne = await this.model.findByPk(data);
            return resposne;
        } catch (error) {
            Logger.error('Something went wrong in the crud repo : get');
            throw error;
        }
    }
    async getAll(data){
        try {
            const resposne = await this.model.findAll();
            return resposne;
        } catch (error) {
            Logger.error('Something went wrong in the crud repo : getAll');
            throw error;
        }
    }
    async get(id,data){
        try {
            const resposne = await this.model.update(data,{
                where: {
                    id:id
                } 
            });
            return resposne;
        } catch (error) {
            Logger.error('Something went wrong in the crud repo : update');
            throw error;
        }
    }

}

module.exports = CrudRepository;