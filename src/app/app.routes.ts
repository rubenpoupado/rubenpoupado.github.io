import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PoetryComponent } from './poetry/poetry.component';
import { GamesComponent } from './games/games.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'poetry', component: PoetryComponent},
    {path: 'games', component: GamesComponent},
];
