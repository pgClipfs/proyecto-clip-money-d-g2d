import { TestBed } from '@angular/core/testing';
import {Injectable} from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';


describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
