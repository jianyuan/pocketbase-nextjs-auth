import { AuthRecord, BaseAuthStore } from "pocketbase";

export type SyncSaveFunc = (serializedPayload: string) => void;

export type SyncClearFunc = () => void;

export class SyncAuthStore extends BaseAuthStore {
  private saveFunc: SyncSaveFunc;
  private clearFunc?: SyncClearFunc;

  constructor(config: {
    save: SyncSaveFunc;
    clear?: SyncClearFunc;
    initial?: string;
  }) {
    super();

    this.saveFunc = config.save;
    this.clearFunc = config.clear;

    this._loadInitial(config.initial);
  }

  save(token: string, record?: AuthRecord) {
    super.save(token, record);

    let value = "";
    try {
      value = JSON.stringify({ token, record });
    } catch {
      console.warn("SyncAuthStore: failed to stringify the new state");
    }

    this.saveFunc(value);
  }

  clear() {
    super.clear();

    if (this.clearFunc) {
      this.clearFunc();
    } else {
      this.saveFunc("");
    }
  }

  private _loadInitial(payload?: string) {
    try {
      if (payload) {
        let parsed;
        if (typeof payload === "string") {
          parsed = JSON.parse(payload) || {};
        } else if (typeof payload === "object") {
          parsed = payload;
        }

        this.save(parsed.token || "", parsed.record || parsed.model || null);
      }
    } catch {}
  }
}
