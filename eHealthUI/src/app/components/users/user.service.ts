import { Injectable }           from '@angular/core';
import { HttpClient }           from '@angular/common/http';
import { Observable }           from 'rxjs';
import { User }                 from 'src/app/models/api-models/user.model';
import { UpdateUserRequest }    from 'src/app/models/api-models/update-user-request.model';

@Injectable
(
  {
    providedIn: 'root'
  }
)

export class UserService
{
  private baseApiUrl = "https://localhost:7112";

  constructor(private httpClient: HttpClient) { }

  getAllUser(): Observable<User[]>
  {
    return this.httpClient.get<User[]>(this.baseApiUrl + '/User')
  }

  getUser(userId: string): Observable<User>
  {
    return this.httpClient.get<User>(this.baseApiUrl + '/User/' + userId)
  }

  updateUser(userId: string, userRequest: User ): Observable<User>
  {
    const updateUserRequest: UpdateUserRequest = {
      firstname : userRequest.firstname,
      lastname : userRequest.lastname,
      email : userRequest.email,
      phone : userRequest.phone,
      dob : userRequest.dob,
      address : userRequest.address,
      fund : userRequest.fund,
      type : userRequest.type,
      status : userRequest.status
    }

    return this.httpClient.put<User>(this.baseApiUrl + '/User/' + userId, updateUserRequest);
  }

}
