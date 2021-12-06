import { Observable, of } from 'rxjs';
import { logInService } from '../../log-in-component/Service/logInService';
import { IntroductionService } from '../IntroductionService';
import {HttpResponse} from "@angular/common/http";
import {IntroductionDto} from "../../dto/IntroductionDto";
import {ResponseString} from "../../dto/ResponseString";

export interface IIntroductionService {

    addIntroductionBeginner(message: string,idUser: string, idUserObjective: string): Observable<HttpResponse<IntroductionDto>>
    DeleteIntroduction(idIntroduction: string): Observable<HttpResponse<IntroductionDto>>
    AproveOrRejectIntroduction(introductionId: string, status: ResponseString,idUser: string): Observable<IntroductionDto>
    AddMessagesToIntroduction(introductionId: string, messageTofriend: string, messageToObjective: string, userId: string): Observable<HttpResponse<IntroductionDto>>
    updateIntroduction(introductionDto: IntroductionDto): Observable<HttpResponse<IntroductionDto>>
    GetPendingOrAwaitingIntroductionRequests(userId: string | undefined , isuserMiddle: boolean): Observable<HttpResponse<IntroductionDto[]>>
}