import { IPaginationOptions } from 'nestjs-typeorm-paginate';

export interface IndexLiveInterface extends IPaginationOptions {
  highlighted: number;
}
