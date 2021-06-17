export class AlertManager {

  private _responseList = new Array<Alert>();

  constructor() { }

  public addAlert(message: string, alert: string): void {
    this.add(new Alert(message, alert));
  }

  private async add(response: Alert): Promise<void> {
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    this._responseList.push(response);
    await delay(5000);
    this._responseList = this._responseList.filter(obj => obj !== response);
  }

  get responseList(): Alert[] {
    return this._responseList;
  }

}

export class Alert {
  constructor(public message: string, public alert: string) { }
}
