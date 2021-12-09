import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {dtoUser} from "../dto/dtoUser";
import {EMPTY, mergeMap, Observable, ObservableInput, Subscription, switchMap} from "rxjs";
import {RelationDto} from "../../dto/RelationDto";

@Injectable({
  providedIn: 'root'
})
// tslint:disable-next-line:class-name
export class logInService {
  url = 'https://arqsi-dotnet.herokuapp.com/api/User';
  customHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, access-control-allow-methods, access-control-allow-headers, Access-Control-Allow-Origin, X-XSRF-TOKEN'
  });

  public constructor(private http: HttpClient) {
  }

  // por em localStora o username quando se chamar
  private responseBody: HttpResponse<any> | undefined;
  public logInRequest(user: dtoUser): Observable<HttpResponse<dtoUser>> {
    return this.http.post<dtoUser>(`${this.url}/Login`, user, {
      headers: this.customHeaders,
      withCredentials: false,
      observe: 'response'
    });
  }

  public getALlUsersTest(): Observable<any> {
    return this.http.get<any>(`${this.url}`, {
      headers: this.customHeaders,
      withCredentials: false,
      observe: 'response'
    });
  }

  public addUser(user: dtoUser): Observable<HttpResponse<dtoUser>> {
    return this.http.post<dtoUser>(`${this.url}`, user, {
      headers: this.customHeaders,
      withCredentials: false,
      observe: 'response'
    });
  }

  public addTagsToUser(Tags: [], idUser: string): Observable<HttpResponse<dtoUser>> {
        const userTag = {
          idUser: idUser,
          tagDescription: Tags
        }
        return this.http.post<dtoUser>(`${this.url}/addTagsToUser`, userTag, {
          headers: this.customHeaders,
          withCredentials: false,
          observe: 'response'
        });
  }

  public getTagsFromUser(userId: string): Observable<HttpResponse<[]>> {
    return  this.http.get<[]>(`${this.url}/getTagsUser/${userId}`, {
          headers: this.customHeaders,
          withCredentials: false,
          observe: 'response'
        });
  }

  public updateUser(userdto: dtoUser | null):  Observable<HttpResponse<dtoUser>>{
    return  this.http.put<any>(`${this.url}`, userdto, {
          headers: this.customHeaders,
          withCredentials: false,
          observe: 'response'
        });
  }

  public getUserByUsername(username: string | null): Observable<HttpResponse<dtoUser>> {
    return this.http.get<dtoUser>(`${this.url}/getUserByUsername/${username}`, {
      headers: this.customHeaders,
      withCredentials: false,
      observe: 'response'
    });
  }

  public getUserById(userId: string): Observable<HttpResponse<dtoUser>> {
    return this.http.get<dtoUser>(`${this.url}/${userId}`, {
      headers: this.customHeaders,
      withCredentials: false,
      observe: 'response'
    });
  }

  public deleteUser(userId: string) {
    return this.http.delete<dtoUser>(`${this.url}/${userId}`, {
      headers: this.customHeaders,
      withCredentials: false,
      observe: 'response'
    });
  }
}
