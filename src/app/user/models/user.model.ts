export class User {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public employeeId: number) {
    }

    clone(): User {
        return new User(
            this.id,
            this.firstName,
            this.lastName,
            this.employeeId);
    }
}