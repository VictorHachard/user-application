export class AlertManager {

  private _responseList = new Array<Alert>();
  private _iconList = new Array<any>();

  constructor() { }

  public addAlert(message: string, alert: string): void {
    this.add(new Alert(message, alert));
  }

  public addAlertIcon(id: any): void {
    this.addIcon(id);
  }

  private async addIcon(id: any): Promise<void> {
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    this._iconList.push(id);
    await delay(3000);
    this._iconList = this._iconList.filter(obj => obj !== id);
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

  get iconList(): any[] {
    return this._iconList;
  }

}

export class Alert {
  constructor(public message: string, public alert: string) { }
}
