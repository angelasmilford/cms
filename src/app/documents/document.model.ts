export class Contact {
    public id: string;
    public name: string;
    public description: string;
    public url: string;
    public children: Document;  
    
    constructor(
        id: string,
        name: string,
        description: string,
        url: string, 
        children: Document
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.url = url;
        this.children = children;
    }
}

export class Document {
    constructor(public name: string) {
        
    }
}