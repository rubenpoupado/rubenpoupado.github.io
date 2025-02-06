import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Game {
  title: string;
  status: string;
  about: string;
  link: string;
  githubLink?: string;
  imageSrc: string[];
  tags: string[];
  date: string;
}

@Component({
  selector: 'app-games',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent implements OnInit{
  games: Game[] = [];
  filteredGames: Game[] = [];
  selectedGame: Game | null = null;
  selectedStatus: string = 'All';
  selectedImage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('assets/games.json').subscribe((data) => {
      this.games = data.map((game) => ({
        ...game,
      }));
      this.filterGames();
    });
  }

  selectGame(game: Game) {
    this.selectedGame = game;
    this.selectedImage = game.imageSrc[0];
  }

  filterGames() {
    if (this.selectedStatus === 'All') {
      this.filteredGames = this.games;
    } else {
      this.filteredGames = this.games.filter(game => game.status === this.selectedStatus);
    }
  }

  updateMainImage(img: string) {
    this.selectedImage = img;
  }
}
