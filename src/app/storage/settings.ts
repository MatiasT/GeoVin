export class Settings {
  commitOverWifi: boolean;
  privateCommits: boolean;
    /**
     *
     */
    constructor() {
        this.privateCommits=false;
        this.commitOverWifi=true;
    }
}