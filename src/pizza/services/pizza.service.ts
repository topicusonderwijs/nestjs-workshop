import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pizza } from '../../entities/pizza.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PizzaService implements OnModuleInit {
    constructor(
        @InjectRepository(Pizza)
        private pizzasRepository: Repository<Pizza>,
    ) {}

    /**
     * Called when the Pizza module is initialized.
     * At this point we add the default pizza's
     */
    public async onModuleInit() {
        await this.pizzasRepository.save({ id: 1, name: 'Salami', size: 25 });
        await this.pizzasRepository.save({ id: 2, name: 'Margherita', size: 25 });
        await this.pizzasRepository.save({ id: 3, name: 'Hawaï', size: 25 });
    }

    public async getALlPizzas(): Promise<Pizza[]> {
        return this.pizzasRepository.find({ relations: ['reviews'] });
    }

    public async getPizzaById(id: number): Promise<Pizza | null> {
        return this.pizzasRepository.findOne({ where: { id }, relations: ['reviews'] });
    }

    public async addPizza(pizza: Pizza): Promise<Pizza> {
        return this.pizzasRepository.save(pizza, {});
    }

    public async getPizzaByName(name: string): Promise<Pizza | null> {
        return this.pizzasRepository.findOneBy({ name });
    }

    public async clearAll() {
        await this.pizzasRepository.clear();
    }
}
