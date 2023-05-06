import { Component, OnInit } from '@angular/core';
import { ServerService } from 'app/services/server.service';
import { UserAppService } from 'app/services/userApp.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {

   [x: string]: any;
  
  liste_des_bd: any = []; // liste de base de donne de serveur 
  liste_des_table: any = [];// liste de fact table  de base de donné slecté 
  liste_des_dim: any = []; // liste de dim de fact table 
  serveurid: any; // servur id slecté 
  bd_name: any; // dbname slecte 
  lodaing: boolean = false;
  selectedServer :any;
  selectedServerSourceId : any;
  newCubename: any;
   selectedDatabase : any;
   responseDate : Date;

  constructor(private serverService: ServerService, private userService: UserAppService) { }

  async ngOnInit() {
   this.getServers()  
  }
          // serveur Engine 
          getServers() {
            this.liste_des_serveur = []
            this.serverDisplays = new Map<string, number>();
              let progress = 0;
            const data = this.serverService.getServers(this.userService.user.Id)

              .pipe(
                catchError(err => of(null)),
                tap(() => this.lodaing == false)
          
              ).subscribe(data => {
                this.liste_des_serveur = data.Servers
                if (data) {
                  for (let s of data.Servers) {
                    this.serverDisplays.set(s.Id, s.Name);
                    this.getServers
                  }
                }
              });


          }

          //  get db a partir de id serveur 
          setserveur(id: any) {
            this.serveurid = id;
            const data = this.serverService.getBbs(id)
              .pipe(
                catchError(err => of(null)),
                tap(() => this.lodaing == false)
              ).subscribe(data => {

                if (data) {
                  this.liste_des_bd = data.DataBases

                }
              });
          }


}


