import { Routes } from '@angular/router';
import { DetailsPokemonComponent } from './pokemon/details-pokemon/details-pokemon.component';
import { ListePokemonComponent } from './pokemon/liste-pokemon/liste-pokemon.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditPokemonComponent } from './pokemon/edit-pokemon/edit-pokemon.component';
import { AddPokemonComponent } from './pokemon/add-pokemon/add-pokemon.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'edit/pokemon/:id', component: EditPokemonComponent, canActivate: [authGuard]},
    { path: 'pokemon/add', title: 'Ajout de pokémon', component: AddPokemonComponent, canActivate: [authGuard]},
    { path: 'pokemons', title: 'Pokédex', component: ListePokemonComponent, canActivate: [authGuard]},
    { path: 'pokemon/:id', component: DetailsPokemonComponent, canActivate: [authGuard]},
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', title: 'Connexion', component: LoginComponent},
    { path: '**', title: 'Page not found', component: PageNotFoundComponent}
];
