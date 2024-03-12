import { WidgetComponent } from "../../features/widgetsPanel/model/types.ts";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { api } from "./api/api.ts";
import { Coin, CurrenciesData } from "./model/types.ts";
import { Loader } from "../../shared/ui/Loader";
import { Select } from "../../shared/ui/Select";
import { Remove } from "../../shared/ui/Remove";
import { useAppDispatch } from "../../app/hooks.ts";
import { WIDGET_ACTIONS } from "../../entities/widgetsPanel/model/slice.ts";
import { EWidgetType } from "../../entities/widget/model/types.ts";
import "./style.scss";
import { Refresh } from "../../shared/ui/Refresh";

export const Currencies: WidgetComponent = ({
  widgetId,
  onDrop,
  onDragStart,
  onDragLeave,
  columnId,
  onDragOver,
  onDragEnd,
}) => {
  const [currencies, setCurrencies] = useState<Coin[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currCoin, setCurrCoin] = useState<Coin | null>(null);

  const dispatch = useAppDispatch();

  const getData = async () => {
    setIsLoading(true);
    const { data } = await api.get<CurrenciesData>(
      "currencies?api_key=4bafbb34b829b4f5168a6f0fbf33aaa38cb4181cf2fa18d9e221c57da14b",
    );
    setIsLoading(false);

    setCurrencies(data.data);
    setCurrCoin(data.data[0]);
  };

  useEffect(() => {
    void getData();
  }, []);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      e.preventDefault();
      const currCoin =
        currencies?.find((coin) => coin.symbol === e.target.value) || null;

      setCurrCoin(currCoin);
    },
    [currencies],
  );

  const remove = useCallback(() => {
    dispatch(
      WIDGET_ACTIONS.removeWidget({
        columnId: columnId,
        widget: { id: widgetId, type: EWidgetType.CURRENCIES },
      }),
    );
  }, []);

  return (
    <div
      onDrop={onDrop}
      onDragStart={onDragStart}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      draggable={true}
      className="currencies"
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="currencies__data">
            <span className="currencies__symbol">{currCoin?.symbol}</span>
            <h1 className="currencies__name">{currCoin?.name}</h1>
            <p className="currencies__value">{currCoin?.values.USD.price}</p>
            <Select
              onChange={onChange}
              id={widgetId + columnId}
              list={currencies}
            />
          </div>
          <div className="currencies__manage">
            <Refresh onClick={getData} />
            <Remove onClick={remove} />
          </div>
        </>
      )}
    </div>
  );
};
