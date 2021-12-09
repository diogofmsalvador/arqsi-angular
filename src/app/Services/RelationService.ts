import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {logInService} from "../log-in-component/Service/logInService";
import {dtoUser} from "../log-in-component/dto/dtoUser";
import {RelationDto} from "../dto/RelationDto";
import {EMPTY, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RelationService {
  url='https://arqsi-dotnet.herokuapp.com/api/Relation';

  customHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, access-control-allow-methods, access-control-allow-headers, Access-Control-Allow-Origin, X-XSRF-TOKEN'
  });

  public constructor(private http: HttpClient, private userService: logInService) {
  }
  public getRelationOfUser(userId: string): Observable<HttpResponse<RelationDto>>{
    return this.http.get<RelationDto>(`${this.url}/getRelationsUser/${userId}`,{headers: this.customHeaders, withCredentials: false, observe: 'response'});

  }
  public addRelation(userId: string, userIdFriend: string, relation: RelationDto){
    relation.id_UserA = userId;
    relation.id_UserB = userIdFriend;
    return this.http.post<RelationDto>(`${this.url}/addRelation`, relation,{headers: this.customHeaders, withCredentials: false, observe: 'response'});
  }
  public updateRelation(userId: string, userIdFriend: string, relation: RelationDto){
    console.log(userId)
    relation.id_UserA =userId;
    relation.id_UserB =userIdFriend;
    return this.http.put<RelationDto>(`${this.url}`, relation,{headers: this.customHeaders, withCredentials: false, observe: 'response'});

  }

}
