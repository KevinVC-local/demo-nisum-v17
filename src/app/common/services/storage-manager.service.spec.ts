import { TestBed } from '@angular/core/testing';

import { StorageManagerService } from './storage-manager.service';

describe('StorageManagerService', () => {
  let service: StorageManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('should get data from storage', () => {
      const key = 'testKey';
      const data = { name: 'Test', age: 25 };
      service.set(key, data);
      const result = service.get(key);
      expect(result).toEqual(data);
    });
    it('should return null if data does not exist in storage', () => {
      const key = 'nonExistentKey';
      const result = service.get(key);
      expect(result).toBeNull();
    });
  });
  
  describe('get', () => {
    it('should set data in storage', () => {
      const key = 'testKey';
      const data = { name: 'Test', age: 25 };
      service.set(key, data);
      const result = service.get(key);
      expect(result).toEqual(data);
    });

    it('should set data in storage false', () => {
      const key = 'testKey';
      const data = true;
      service.set(key, data, false);
      const result = service.get(key);
      expect(result).toEqual(data);
    });
    
  });


  it('should remove data from storage', () => {
    const key = 'testKey';
    const data = { name: 'Test', age: 25 };
    service.set(key, data);
    service.remove(key);
    const result = service.get(key);
    expect(result).toBeNull();
  });

  it('should removeLocalAndSessionStorage', () => {
    const key = 'testKey';
    const data = { name: 'Test', age: 25 };
    service.set(key, data);
    service.removeLocalAndSessionStorage();
    const result = service.get(key);
    expect(result).toBeNull();
  });
});