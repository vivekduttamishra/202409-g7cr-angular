import { Component } from "@angular/core";

@Component({
    selector:'hello-app',
    template: `
        <div class='app'>
            <app-header/>
            <div class='main-content'>
                
                <router-outlet/>
                        
            </div>
            <app-footer/>
        </div>
    `
})
export class AppComponent{

}
