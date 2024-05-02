import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { PokemonFormComponent } from "../pokemon-form/pokemon-form.component";
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-edit-pokemon',
    standalone: true,
    template: `
  <h2 class="center">
  Edité le pokemon {{ pokemon?.name }}
  </h2>
  <div class="center">
  @if(pokemon){
    <img [src]="pokemon.picture">
  }
  </div>
  @if(pokemon){
  <app-pokemon-form [pokemon]="pokemon"></app-pokemon-form>
  }
  `,
    styles: ``,
    imports: [PokemonFormComponent]
})
export class EditPokemonComponent implements OnInit {
  
  pokemon: Pokemon|undefined;
  
  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private title: Title
  ) { }
  
  ngOnInit() {
    const pokemonId: string|null = this.route.snapshot.paramMap.get('id');
    if (pokemonId) {
      this.pokemonService.getPokemonById(+pokemonId)
        .subscribe(
          pokemon => {
            this.pokemon = pokemon;
            this.initTitle(pokemon);
    });
    } else {
      this.pokemon = undefined;
    }
  }
  
initTitle(pokemon: Pokemon|undefined) {
  if (!pokemon) {
    this.title.setTitle('Pokémon not found - Pokédex');
    return;
  }
  this.title.setTitle(`Edit ${pokemon.name} - Pokédex`);
}
    

}
