import { NgModule } from '@angular/core';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';



@NgModule({
    imports: [MatSidenavModule,
                MatButtonModule, 
                MatFormFieldModule, 
                MatInputModule,
                MatIconModule, 
                MatToolbarModule, 
                MatListModule], 
    exports: [MatSidenavModule, 
                 MatButtonModule, 
                 MatFormFieldModule, 
                 MatInputModule, 
                 MatIconModule,
                 MatToolbarModule,
                 MatListModule]
})

export class MaterialModule {}