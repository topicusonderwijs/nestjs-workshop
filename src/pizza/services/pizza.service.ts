import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pizza } from '../../entities/pizza.entity';
import { Repository } from 'typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class PizzaService implements OnModuleInit {
    constructor(
        @InjectRepository(Pizza)
        private pizzasRepository: Repository<Pizza>,
        @InjectPinoLogger(PizzaService.name) private readonly logger: PinoLogger,
    ) {
        this.logger.debug('PizzaService created');
    }

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

    public async updatePizza(pizzaId: number, updatedValues: Partial<Pizza>): Promise<Pizza> {
        const pizza = await this.getPizzaById(pizzaId);
        const updatedPizza = {...pizza, ...updatedValues};
        return this.pizzasRepository.save(updatedPizza);
    }

    public async getPizzaByName(name: string): Promise<Pizza | null> {
        return this.pizzasRepository.findOneBy({ name });
    }

    public async clearAll() {
        await this.pizzasRepository.clear();
    }
}
