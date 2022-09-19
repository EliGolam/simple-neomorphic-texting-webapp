// Initial Handshake
console.log('SCRIPT - app.js: Loaded!');

const app = new Vue({
    el: '#app',

    data: {
        contacts: contactsData,
        
        activeChat: 0,

        textBox: '',
    },

    // METHODS
    methods: { 
        getActiveChat(property) {
            let contact = this.contacts[this.activeChat];

            switch (property) {
                case 'name': {
                    return contact.name;
                }
                case 'img': {
                    return this.getProfilePicturePath(contact);
                }
                case 'alt': {
                    return this.getProfilePictureAlt(contact);
                }
                case 'messages': {
                    return contact.messages;
                }
            }
        },

        sendText () {
            const text = this.textBox.trim();
            this.textBox = '';

            let activeContact = this.contacts[this.activeChat];

            activeContact.messages.push(new Message(text, 'sent'));

            setTimeout(this.receiveText, 1000, activeContact);
        },
        
        receiveText (contact) {
            const text = 'Ok!';
            contact.messages.push(new Message(text, 'received'));
        },

        isLastMessage(index) {
            const messages = this.getActiveChat('messages');
            return index === messages.length - 1 ? true : false;
        },

        // DOM utilities
        getProfilePicturePath(contact) {
            return PROF_IMG_PATH + PROF_IMG_PREFIX + contact.avatar + PROF_IMG_FORMAT;
        }, 

        getProfilePictureAlt(contact) {
            return `Profile Picture of ${contact.name}`;
        }, 

        getLastMessage(contact) {
            let messageAmount = contact.messages.length;
            let sender = contact.messages[messageAmount - 1].status === 'sent' ? 'You: ' : '';
            let previewMessage = contact.messages[messageAmount - 1].message;

            let preview = `${sender}${previewMessage}`;
            
            return preview;
        }, 

        getLastMessageTime(contact) {
            let messageAmount = contact.messages.length;
            return this.getMessageTime(contact, messageAmount - 1); 
        }, 

        getMessageTime(contact, messageIdx) {
            let messageTime = contact.messages[messageIdx].date.split(' ');

            return messageTime[1].slice(0, -3);
        }, 

        messageAlign(message) {
            return message.status === 'sent' ? 'ms_message-sent' : 'ms_message-received';
        }, 

        messageProperties (message, index) {
            const classes = [this.messageAlign(message)];
            if(this.isLastMessage(index)) {
                classes.push('anchor');
            }

            return classes;
        }
     },

    // MOUNTED
    mounted () {
        // console.log('DEBUG - test function getProfilePicturePath', this.getProfilePicturePath(this.contacts[3]));
    }
});

console.log('DEBUG - app: ', app);