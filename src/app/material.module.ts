import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
    imports: [
        MatSidenavModule,
        MatButtonModule, 
        MatFormFieldModule, 
        MatInputModule,
        MatIconModule, 
        MatToolbarModule, 
        MatListModule,
        MatTabsModule,
        MatTableModule,
        MatCardModule, 
        MatSnackBarModule, 
        MatProgressSpinnerModule
        ], 
    exports: [
        MatSidenavModule, 
        MatButtonModule, 
        MatFormFieldModule, 
        MatInputModule, 
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        MatTableModule,
        MatCardModule, 
        MatSnackBarModule, 
        MatProgressSpinnerModule
        ]
})

export class MaterialModule {}