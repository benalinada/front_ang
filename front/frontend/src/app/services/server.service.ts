import { HttpClient, HttpErrorResponse, HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, finalize, Observable, of, tap } from "rxjs";
import { BaseData, BasesData } from "../models/BaseData";
import { ServerData, ServersData } from '../models/ServerData';
import { TableData, TablesData } from "../models/TableData";
import { ColumnData, ColumnsData } from "../models/ColumnData";
import { AttributFactData, AttributFactsData } from "app/models/AttributFact";
import { CubeData } from "app/models/CubeData";
import { DispatchData } from "app/models/DispatchData";
@Injectable()
export class ServerService {
    dataserver: ServerData[] ;
    databases: BaseData[] ;
    Tables: TableData[] ;
    Columns : ColumnData[];
    AttributFacts : AttributFactData[];
    loading : boolean = false;
    constructor(private http: HttpClient) {

    }

    // get liste des serveur disponible a connecte
    getServers(userid: string): Observable<ServersData> {
        this.loading = true;
        const res = this.http.get<ServersData | null>(`https://localhost:44362/api/servers/${userid}`).pipe(
            tap( data => {
                this.dataserver = data.Servers;
              }),
              catchError(err => {
                return of(null);
              }),
              finalize(() =>this.loading = false)
            );
            return res;
    }

    // get liste des base de données disponible sur serveur x avec le id  
    getBbs(id: string): Observable<BasesData> {
      this.loading = true;
      const res = this.http.get<BasesData | null>(`https://localhost:44362/api/DataBases/${id}`).pipe(
          tap( data => {
              this.databases = data.DataBases;
            }),
            catchError(err => {
              return of(null);
            }),
            finalize(() =>this.loading = false)
          );
          return res;
  }

  // get liste des table de base selectione via sans id 
  getTables(id: string, dbName:string): Observable<TablesData> {
    this.loading = true;
    const res = this.http.get<TablesData | null>(`https://localhost:44362/api/tables/${id}/${dbName}`).pipe(
        tap( data => 
            this.Tables = data.Tables
          ),
          catchError(err => {
            return of(null);
          }),
          finalize(() =>this.loading = false)
        );
        return res;
}

// retorner les dimention des table fact  
getColumns(id: string, dbName:string,tableName:string): Observable<ColumnsData> {
  this.loading = true;
  const res = this.http.get<ColumnsData | null>(`https://localhost:44362/api/Columns/${id}/${dbName}/${tableName}`).pipe(
      tap( data => {
          this.Columns = data.Columns;
         
        }),
        catchError(err => {
          return of(null);
        }),
        finalize(() =>this.loading = false)
      );
      return res;
}

// def 

// def fact 
getAttributFacts(id: string, dbName:string,tableName:string ): Observable<AttributFactsData> {
  this.loading = true;
  const res = this.http.get<AttributFactsData | null>(`https://localhost:44362/api/AttributFacts/${id}/${dbName}/${tableName}`).pipe(
      tap( data => {
          this.AttributFacts = data.AttributFacts;
        }),
        catchError(err => {
          return of(null);
        }),
        finalize(() =>this.loading = false)
      );
      return res;
}

 postCube(cubeData : CubeData ): Observable<Boolean>{
  this.loading = true;
  return this.http.post<Boolean>('https://localhost:44362/api/Cube', cubeData).pipe(
    catchError(err => {
      return of(false);
    }),
    finalize(() =>  this.loading = false)
  );
 }
  postCubedispatch(DispatchData : DispatchData ): Observable<Boolean>{
    this.loading = true;
    return this.http.post<Boolean>('https://localhost:44362/api/Dispatch', DispatchData).pipe(
      catchError(err => {
        return of(false);
      }),
      finalize(() =>  this.loading = false)
    );

}
}
