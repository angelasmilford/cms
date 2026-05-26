export class Contact {
    public id: string;
    public name: string;
    public displayName: string;
    public email: string;
    public phone: string;
    public imageUrl: string;
    public group: null | Contact[];

    constructor(id: string, name: string, displayName: string, email: string, phone: string, imageUrl: string, group: null | Contact[]) {
        this.id = id;
        this.name = name;
        this.displayName = displayName;
        this.email = email;
        this.phone = phone;
        this.imageUrl = imageUrl;
        this.group = group;
    }
}