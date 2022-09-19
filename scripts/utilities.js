// Initial Handshake
console.log('SCRIPT - utilities.js: Loaded!');

class Message {
    constructor (message, status) {
        const now = new Date();
        const currentTime = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`

        this.date = currentTime;
        this.message = message;
        this.status = status;
    }
}