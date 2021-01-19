import { AppStateService } from './services/appstate.service';
import { ModuleWithProviders, NgModule } from "@angular/core";

///To inject the AppState into lazy loaded modules

@NgModule({

})
export class SharedModule {
    
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [AppStateService]
        }
    }
}