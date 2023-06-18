export class SensorsResponse {
  items: Sensor[] = [];
  count: number = 0;
}

export class Sensor {
  id: string = "";
  name: string = "";
  lastUpdated: string = ""
  status: string = ""
}