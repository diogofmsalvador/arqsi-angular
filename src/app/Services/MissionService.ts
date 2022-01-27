import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {logInService} from "./logInService";
import {EMPTY, Observable} from "rxjs";
import {IntroductionDto} from "../dto/IntroductionDto";
import {dtoUser} from "../dto/dtoUser";

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  url = 'https://arqsi-dotnet.herokuapp.com/api/Mission';

  customHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, access-control-allow-methods, access-control-allow-headers, Access-Control-Allow-Origin, X-XSRF-TOKEN'
  });

  public constructor(private http: HttpClient, private userService: logInService) {
  }

  public getSuggestedUsers(difficulty: string, idUser: string): Observable<HttpResponse<[]>> {
    return this.http.get<[]>(`${this.url}/getSuggestedUsers/${idUser}/${difficulty}`, {
            headers: this.customHeaders,
            withCredentials: false,
            observe: 'response'
        });
  }

  public GetMissionToObjectiveUser(iduserMission: string, difficulty: string, userIdObjective: string): Observable<HttpResponse<[]>> {
    return this.http.get<[]>(`${this.url}/getMissionPath/${iduserMission}/${difficulty}/${userIdObjective}`, {
          headers: this.customHeaders,
          withCredentials: false,
          observe: 'response'
        });
  }

  public createMission(iduserMission: string, difficulty: string, userIdObjective: string): Observable<HttpResponse<[]>> {
    return this.http.get<[]>(`${this.url}/createMission/${iduserMission}/${difficulty}/${userIdObjective}`, {
          headers: this.customHeaders,
          withCredentials: false,
          observe: 'response'
        });
  }
}
