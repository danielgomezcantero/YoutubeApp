import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import {map} from 'rxjs/operators'
import { YoutubeResponse } from '../models/youtube.models';




@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl='https://www.googleapis.com/youtube/v3';
  private apikey='AIzaSyB1RfChSLB5xcwJC61uR1vUnugAIw7Llu4';
  private nextPageToken='';
  private playList='UUuaPTYj15JSkETGnEseaFFg';


  constructor( private http:HttpClient ) {

    
   }

   getVideos(){

    const url =`${ this.youtubeUrl }/playlistItems`;

    const params = new HttpParams()
                  .set('part','snippet')
                  .set('maxResults','10')
                  .set('playlistId', this.playList)
                  .set('key',this.apikey)
                  .set('pageToken', this.nextPageToken)

    return this.http.get<YoutubeResponse>( url, {params}).pipe(

      map( videos=>{

        this.nextPageToken= videos.nextPageToken;

        return videos.items;
            
      }),
      map( items=>{        
        return items.map( video => video.snippet )
      })
      
      
    )
   }
}
