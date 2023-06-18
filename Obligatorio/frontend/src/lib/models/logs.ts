export class LogsResponse {
  items: Log[] = [];
  count: number = 0;
}

export class Log {
  time: string = "";
  amount: string = "";
  maxAmount: string = ""
}