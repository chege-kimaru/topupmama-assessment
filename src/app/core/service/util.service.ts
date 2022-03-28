import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class UtilService {
    constructor(private http: HttpClient) { }

    myLocation() {
        return this.http.get('https://api.ipregistry.co/?key=tryout')
            .pipe(map((res: any) => ({ country: res?.location?.country?.name, city: res.location?.city })));
    }
}