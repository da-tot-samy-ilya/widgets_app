import { Selectable } from "../../../shared/ui/Select";

export interface Coin extends Selectable {
  id: number;
  name: string;
  symbol: string;
  values: {
    USD: {
      price: number;
    };
  };
}

export interface CurrenciesData {
  data: Coin[];
}
