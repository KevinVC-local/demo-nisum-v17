import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageManagerService {

  protected storage: Storage | null = null;
  protected session: Storage | null = null;

  constructor() {
    this.storage = this.isLocalStorageAvailable() ? localStorage : null;
    this.session = this.isSessionStorageAvailable() ? sessionStorage : null;
  }


  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, '1');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  private isSessionStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      sessionStorage.setItem(testKey, '1');
      sessionStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Retrieves the value associated with the specified key from the storage.
   * 
   * @param key - The key to retrieve the value for.
   * @returns The value associated with the key, or `null` if the key does not exist.
   * @template T - The type of the value to retrieve.
   */
  get<T>(key: string): T | null {
    const dataStorage = this.storage?.getItem(key);
    return dataStorage ? JSON.parse(dataStorage) : null;
  }

  /**
   * Sets the value for the specified key in the storage.
   * If `parse` is true, the `data` will be parsed as JSON before storing.
   * If `parse` is false, the `data` will be stored as is.
   * 
   * @param key - The key to set the value for.
   * @param data - The value to be stored.
   * @param parse - Optional. Indicates whether to parse the `data` as JSON before storing. Default is true.
   */
  set(key: string, data: any, parse: boolean = true): void {
    const value = parse ? JSON.stringify(data) : data;
    this.storage?.setItem(key, value);
  }

  remove(key: string) {
    this.storage?.removeItem(key);
  }

  removeLocalAndSessionStorage(){
    this.storage?.clear();
    this.session?.clear();
  }


}
