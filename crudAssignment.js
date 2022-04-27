class Game {
    constructor(genre, name) {
        this.genre = genre;
        this.name = name;
        this.platforms = [];
        this.id = `${this.name}${Math.random(1000)}`;
    }
     addPlatform = (platforms) => {
         this.platforms.push(platforms);
     }
}
class GameService{
    static fakeEndpoint = [new Game('Action','Halo') , new Game('Fantasy' , 'Skyrim')];;

    static setData = (newData) =>{
        this.fakeEndpoint = newData;
        DOMManager.getAllGames();
    }
    static getAllGames = () => this.fakeEndpoint;

    static getGame = (id) => {
        return this.fakeEndpoint.find(game => id === game.id)};

    static enterGame = (genre, name) => {
        let selectedName = document.querySelector('input[name=createName]').value;
        let selectedGenre = document.querySelector('input[name=newGenre]:checked').value;
        let tempData = [...this.fakeEndpoint];
        tempData.push(new Game(selectedGenre, selectedName));
        this.setData(tempData);
    }
    static removeGame = (id) => {
    let tempData = [...this.fakeEndpoint];
    tempData.splice(tempData.indexOf(GameService.getGame(id)),1);
    this.setData(tempData);
    }

    static editGame = (id) => {
        let tempGame = GameService.getGame(id);
        let newName  = prompt('Please enter the new name.');
        let newGenre  = prompt('Please enter: Action, Fantasy, or Strategy.');
        let approvedGenres = ['action' , 'fantasy' , 'strategy'];
        while(! approvedGenres.includes(newGenre.toLowerCase())){
            newGenre = prompt('Please enter: Action, Fantasy, or Strategy!');
        }
        tempGame.name = newName;
        tempGame.genre = newGenre;
        this.setData(this.fakeEndpoint);
    }
}

class DOMManager {
    static games;
    static getAllGames() {
        let allGames = GameService.getAllGames();
        this.render(allGames);
    }
    static render(games) {
        this.games = games;
        $('#app').empty();
        for (let game of games) {
            $('#app').prepend(
                `<div id="${game.id}" class ="card">
                <div class ="card-header">
                    <h2>${game.name}</h2>
                    <h3>${game.genre}</h3>
                    <button class="btn btn-danger" onClick="GameService.removeGame('${game.id}')">Delete</button>
                    <button type="button" class="btn btn-warning" onClick="GameService.editGame('${game.id}')">Edit</button>
                    </div>
                  <div class ="card-body">
                    <div class ="card">
                        <div class ="row">
                            <div class="col-sm">
                  </div>
                </div>
                `
            );
        }
    }

}
DOMManager.getAllGames();