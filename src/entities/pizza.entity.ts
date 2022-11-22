import { Review } from './review.entity';

export class Pizza {
    id: number;

    name: string;

    size: number;

    reviews: Review[];
}
