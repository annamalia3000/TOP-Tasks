export class Task {
    constructor(text) {
        this.text = text;
        this.id = Date.now(); 
        this.isPinned = false; 
    }
}