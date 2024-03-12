import { ChangeEventHandler } from "react";

export interface Selectable {
  symbol: string;
  name: string;
}

interface Props<T extends Selectable> {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  id: string;
  list: Array<T> | null;
}

export function Select<T extends Selectable>({ onChange, id, list }: Props<T>) {
  return (
    <select onChange={onChange} name={id} id={id}>
      {list?.map((coin) => (
        <option key={coin.symbol} value={coin.symbol}>
          {coin.name}
        </option>
      ))}
    </select>
  );
}
