import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  constructor(private http: HttpClient) { }

  getAllMovies(){

  	return this.http.get('/movies').pipe(map((movies) => {
  		return movies;
  	}));
  }

}
