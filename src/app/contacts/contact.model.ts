export class Contact {
    constructor (
        public id: string,          
        public name: string,
        // public displayName: string,
        public email: string,
        public phone: string,
        public imageUrl: string,
        public group: null | Contact[],
        public _id?: string
    ) { }
}