import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './search-pokemon.component.html',
})
export class SearchPokemonComponent implements OnInit{

  searchTerms = new Subject<string>();
  pokemons$: Observable<Pokemon[]>;

  constructor(private router: Router,
              private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    this.pokemons$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.pokemonService.searchPokemonList(term)),
    );
  }
  
  search(term: string) {
    this.searchTerms.next(term);
  }
  
  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }
  
}
