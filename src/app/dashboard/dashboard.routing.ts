import { DividendComponent } from './dividend/dividend.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { WalletComponent } from './wallet/wallet.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { RootComponent }    from './root/root.component';
import { SettingsComponent }    from './settings/settings.component'; 

import { AuthGuard } from '../auth.guard';
import { InvestICOComponent } from './invest-ico/invest-ico.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  {
      path: 'dashboard',
      component: RootComponent, canActivate: [AuthGuard],

      children: [      
       { path: '', component: WalletComponent },
       { path: 'home',  component: WalletComponent },
       { path: 'investICO',  component: InvestICOComponent },
       { path: 'exchange',  component: ExchangeComponent },
       { path: 'dividend',  component: DividendComponent }
      ]       
    }  
]);

