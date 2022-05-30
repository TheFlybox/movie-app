import { injectable } from "inversify";
import { Toast, ToastMessageType } from "primereact/toast";

@injectable()
export class MessageService {
  private _toast?: React.RefObject<Toast>;

  setToastRef(toast: React.RefObject<Toast>) {
    this._toast = toast;
  }

  show(message: ToastMessageType) {
    this._toast?.current?.show(message);
  }
}