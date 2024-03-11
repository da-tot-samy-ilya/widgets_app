export enum EWidgetType {
  CLOCK = "CLOCK",
  WEATHER = "WEATHER",
  CURRENCIES = "CURRENCIES",
}

export interface Widget {
  type: EWidgetType;
  id: string;
}
