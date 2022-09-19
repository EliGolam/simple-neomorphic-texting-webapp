// Initial Handshake
console.log('SCRIPT - app.js: Loaded!');

contactsData.forEach(contact => {
    contact.messages.forEach(message => {
        message.options = false;
    });
});

const app = new Vue({
    el: '#app',

    data: {
        // Data for data.js
        contacts: contactsData,

        // App Variables
        activeChat: 0,
        textBox: '',
        searchBox: '',
        activeOption: undefined,
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
            this.moveChatToBottom();
        },
        
        receiveText (contact) {
            const text = 'Ok!';
            contact.messages.push(new Message(text, 'received'));
            this.moveChatToBottom();
        },

        isLastMessage(index) {
            const messages = this.getActiveChat('messages');
            return index === messages.length - 1 ? true : false;
        },


        getPreviewMessage(contact) {
            let messageAmount = contact.messages.length;
            if (messageAmount === 0) return '';

            let sender = contact.messages[messageAmount - 1].status === 'sent' ? 'You: ' : '';
            let previewMessage = contact.messages[messageAmount - 1].message;

            let preview = `${sender}${previewMessage}`;
            
            return preview;
        }, 

        getLastMessageTime(contact) {
            let messageAmount = contact.messages.length;
            if (messageAmount === 0) return '';
            return this.getMessageTime(contact, messageAmount - 1); 
        }, 

        removeMessage(index) {
            let activeContact = this.contacts[this.activeChat];

            activeContact.messages.splice(index, 1);
        },

        showOptions(element) {
            if (this.activeOption !== undefined) {
                if(this.activeOption !== element) {
                    this.activeOption.options = false;
                }
            }
            this.activeOption = element;
            this.activeOption.options = !element.options;
        },

        // DOM utilities
        getProfilePicturePath(contact) {
            return PROF_IMG_PATH + PROF_IMG_PREFIX + contact.avatar + PROF_IMG_FORMAT;
        }, 

        getProfilePictureAlt(contact) {
            return `Profile Picture of ${contact.name}`;
        }, 

        getMessageTime(contact, messageIdx) {
            let messageTime = contact.messages[messageIdx].date.split(' ');

            return messageTime[1].slice(0, -3);
        }, 

        messageProperties (message, index) {
            const classes = [message.status];

            return classes;
        }, 

        searchChat() {
            console.log(this.searchBox);
            console.log(this.searchBox.length);

            if (this.searchBox.length <= 0) {
                this.contacts.forEach(contact => {
                    contact.visible = true;
                });
                return;
            }

            this.contacts.forEach(contact => {
                if(contact.name.slice(0, this.searchBox.length).toLowerCase() !== this.searchBox.toLowerCase()) {
                    contact.visible = false;
                } else {
                    contact.visible = true;
                }
            });

            console.log('DEBUG - contacts', this.contacts);
        },

        moveChatToBottom() {
            setTimeout(() => {
                const messageBody = document.querySelector('.messages-body');
                messageBody.lastElementChild.scrollIntoView();
            }, 0);
        }, 
    },

    // MOUNTED
    mounted () {
        // console.log('DEBUG - test function getProfilePicturePath', this.getProfilePicturePath(this.contacts[3]));
    }
});

console.log('DEBUG - app: ', app);

