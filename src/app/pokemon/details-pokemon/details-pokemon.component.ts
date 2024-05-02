import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { DatePipe } from '@angular/common';
import { PokemonService } from '../pokemon.service';
import { LoaderComponent } from "../loader/loader.component";
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-details-pokemon',
    standalone: true,
    templateUrl: './details-pokemon.component.html',
    imports: [LoaderComponent, PokemonTypeColorPipe, DatePipe]
})
export class DetailsPokemonComponent implements OnInit{
  
  pokemonList: Pokemon[]; // Liste des pokémons
  pokemon: Pokemon|undefined; // Pokémon à afficher dans le template
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private pokemonService: PokemonService,
    private title: Title
  ) { }
  
  ngOnInit() {
    const pokemonId: string|null = this.route.snapshot.paramMap.get('id');
    
    if (pokemonId) {
      this.pokemonService.getPokemonById(+pokemonId)
        .subscribe(pokemon => {
          this.pokemon = pokemon;
          this.initTitle(pokemon);
        });
    } 
  }

  deletePokemon(pokemon: Pokemon) {
    this.pokemonService.deletePokemonById(pokemon.id)
      .subscribe(() => this.goToPokemonList());
  }

  goToPokemonList() {
    this.router.navigate(['/pokemons']);
  }

  goEditPokemon(pokemon: Pokemon) {
    this.router.navigate(['/edit/pokemon', pokemon.id]);
  }

  initTitle(pokemon: Pokemon|undefined) {
    if (!pokemon) {
      this.title.setTitle('Pokémon not found - Pokédex');
      return;
    }
    this.title.setTitle(`${pokemon.name} - Pokédex`);
  }

}
