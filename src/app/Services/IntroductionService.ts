import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {logInService} from "../log-in-component/Service/logInService";
import {dtoUser} from "../log-in-component/dto/dtoUser";
import {PostDto} from "../dto/PostDto";
import {IntroductionDto} from "../dto/IntroductionDto";
import {EMPTY, Observable} from "rxjs";
import {ResponseString} from "../dto/ResponseString";
import {IntroductionCompletedDto} from "../dto/IntroductionCompletedDto";

@Injectable({
  providedIn: 'root'
})
export class IntroductionService {
  url = 'https://arqsi-dotnet.herokuapp.com/api/Introduction';

  customHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, access-control-allow-methods, access-control-allow-headers, Access-Control-Allow-Origin, X-XSRF-TOKEN'
  });

  public constructor(private http: HttpClient, private userService: logInService) {
  }

  public addIntroductionBeginner(message: string,idUser: string, idUserObjective: string): Observable<HttpResponse<IntroductionDto>> {
          const newIntroductionBegginer = {
            _idUserMiddle: idUser,
            _idUserObjective: idUserObjective,
            _messageUserMiddle: message
          };
          console.log(newIntroductionBegginer);
          return this.http.post<IntroductionDto>(`${this.url}/beginner-introdution`, newIntroductionBegginer, {
            headers: this.customHeaders,
            withCredentials: false,
            observe: 'response'
          });
  }

  public DeleteIntroduction(idIntroduction: string): Observable<HttpResponse<IntroductionDto>> {
    return this.http.delete<IntroductionDto>(`${this.url}/beginner-introdution/${idIntroduction}`, {
      headers: this.customHeaders,
      withCredentials: false,
      observe: 'response'
    });
  }

  public AproveOrRejectIntroduction(introductionId: string | undefined, status: number, idUser: string | undefined): Observable<any> {
        return this.http.put<any>(`${this.url}/ApproveOrRejectIntroduction/${idUser}/${introductionId}/${status}`, {
          headers: this.customHeaders,
          withCredentials: false,
          observe: 'response'
        });
  }

  public AddMessagesToIntroduction(introductionId: string, messageTofriend: string, messageToObjective: string, userId: string): Observable<HttpResponse<IntroductionDto>> {
      const SetMessagesDTO = {
        _messageToFriend: messageTofriend,
        _messageToObjective: messageToObjective
      };
        return this.http.put<IntroductionDto>(`${this.url}/messagesToIntroduction/${userId}/${introductionId}`, SetMessagesDTO, {
          headers: this.customHeaders,
          withCredentials: false,
          observe: 'response'
        });
  }

  // passar so id introduction , menssagens  e responseStrings
  public updateIntroduction(introductionDto: IntroductionDto): Observable<HttpResponse<IntroductionDto>> {
    return this.http.put<IntroductionDto>(`${this.url}`, introductionDto, {
      headers: this.customHeaders,
      withCredentials: false,
      observe: 'response'
    });
  }

  // status awaiting ou pending
  public GetPendingOrAwaitingIntroductionRequests(userId: string | undefined , isuserMiddle: boolean): Observable<HttpResponse<IntroductionDto[]>>{
    return this.http.get<IntroductionDto[]>(`${this.url}/getIntroductions/${userId}/${isuserMiddle}`, {
          headers: this.customHeaders,
          withCredentials: false,
          observe: 'response'
    });
  }


}
