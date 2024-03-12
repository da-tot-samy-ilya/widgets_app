import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { api } from "./api/api.ts";
import { WeatherData } from "./model/types.ts";
import { Refresh } from "../../shared/ui/Refresh";
import { Remove } from "../../shared/ui/Remove";
import { WIDGET_ACTIONS } from "../../entities/widgetsPanel/model/slice.ts";
import { EWidgetType } from "../../entities/widget/model/types.ts";
import { useAppDispatch } from "../../app/hooks.ts";
import { WidgetComponent } from "../../features/widgetsPanel/model/types.ts";
import { Loader } from "../../shared/ui/Loader";
import "./style.scss";
import { Select } from "../../shared/ui/Select";
import { TOWNS } from "./constants.ts";

export const Weather: WidgetComponent = ({
  widgetId,
  onDrop,
  onDragStart,
  onDragLeave,
  columnId,
  onDragOver,
  onDragEnd,
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const getWeather = async (town: string) => {
    setLoading(true);
    const { data } = await api.get<WeatherData>(
      `current.json?key=1a45850b83074ed0912100416241203 &q=${town}_&lang=ru`,
    );

    setWeather(data);
    setLoading(false);
  };

  useEffect(() => {
    void getWeather("Kabul");
  }, []);

  const remove = useCallback(() => {
    dispatch(
      WIDGET_ACTIONS.removeWidget({
        columnId: columnId,
        widget: { id: widgetId, type: EWidgetType.CURRENCIES },
      }),
    );
  }, []);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    void getWeather(e.target.value);
  };
  return (
    <div
      onDrop={onDrop}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDragEnd={onDragEnd}
      draggable={true}
      className="weather"
    >
      <div className="weather__conditions">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="weather__data">
            <Select list={TOWNS} id={widgetId + columnId} onChange={onChange} />
            <span className="weather__country">
              {weather?.location.country}
            </span>
            <h1 className="weather__town">{weather?.location.name}</h1>
          </div>
        )}

        <div className="weather__manage">
          <Refresh onClick={() => getWeather(weather?.location.name || "")} />
          <Remove onClick={remove} />
        </div>
      </div>
      {isLoading ? null : (
        <div className="weather__digits">
          <img src={weather?.current.condition.icon} alt="" />
          <div className="weather__digits__data">
            <p>{weather?.current.condition.text}</p>
            <p>
              {weather?.current.temp_c}
              <span> &#8451;</span>
            </p>
            <p>Ветер {weather?.current.wind_kph} м/с</p>
          </div>
        </div>
      )}
    </div>
  );
};
