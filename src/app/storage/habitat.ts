export class Habitat {
    habitat: string;
    subHabitat: string;
    otherHabitat: string;
    /**
     *
     */
    constructor(habitat: string, subHabitat: string, otherHabitat: string) {
        this.habitat = habitat;
        this.subHabitat = subHabitat;
        this.otherHabitat = otherHabitat;
    }
    public toString(): string {
        return "habitat_" + this.subHabitat.toLowerCase();
    }
}