import { Injectable } from '@nestjs/common';
import { Pizza } from '../../entities/pizza.entity';

@Injectable()
export class PizzaService {
    pizzas: Pizza[] = [
        { id: 1, name: 'Salami', size: 25, reviews: [] },
        { id: 2, name: 'Margherita', size: 25, reviews: [] },
        { id: 3, name: 'Hawaï', size: 25, reviews: [] },
    ];

    public async getALlPizzas(): Promise<Pizza[]> {
        return this.pizzas;
    }

    public async getPizzaById(id: number): Promise<Pizza | null> {
        return this.pizzas.find((pizza) => pizza.id === id);
    }

    public async addPizza(pizza: Pizza): Promise<Pizza> {
        const maxId = Math.max(...this.pizzas.map((pizza) => pizza.id));
        pizza.id = maxId + 1;
        this.pizzas.push(pizza);
        return pizza;
    }

    public async getPizzaByName(name: string): Promise<Pizza | null> {
        return this.pizzas.find((pizza) => pizza.name === name);
    }
}
