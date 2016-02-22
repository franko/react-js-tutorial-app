var ContactItem = React.createClass({
	propTypes: {
		name: React.PropTypes.string.isRequired,
		email: React.PropTypes.string.isRequired,
		description: React.PropTypes.string,
	},

	render: function() {
		return React.createElement('li', {className: 'ContactItem'},
			React.createElement('h2', {className: 'ContactItem-name'}, this.props.name),
			React.createElement('a', {className: 'ContactItem-email', href: "mailto:" + this.props.email}, this.props.email),
			React.createElement('div', {className: 'ContactItem-description'}, this.props.description)
		);
	}
});

var ContactForm = React.createClass({
	propTypes: {
		value: React.PropTypes.object.isRequired,
        onFormChange: React.PropTypes.func.isRequired,
        submitNewContact: React.PropTypes.func.isRequired,
	},

    onFormSubmit: function(e) {
        e.preventDefault();
        this.props.submitNewContact();
    },

    onNameChange: function(e) {
        this.props.onFormChange(Object.assign({}, this.props.value, {name: e.target.value}));
    },

    onEmailChange: function(e) {
        this.props.onFormChange(Object.assign({}, this.props.value, {email: e.target.value}));
    },

    onDescriptionChange: function(e) {
        this.props.onFormChange(Object.assign({}, this.props.value, {description: e.target.value}));
    },

	render: function() {
		var contact = this.props.value;
		return React.createElement('form', {className: 'ContactForm', onSubmit: this.onFormSubmit},
			React.createElement('input', {type: 'text', placeholder: 'Name (required)', value: contact.name, onChange: this.onNameChange}),
			React.createElement('input', {type: 'email', placeholder: 'Email', value: contact.email, onChange: this.onEmailChange}),
			React.createElement('textarea', {placeholder: 'Description', value: contact.description, onChange: this.onDescriptionChange}),
			React.createElement('button', {type: 'submit'}, 'Add Contact')
		);
	}
});

var ContactView = React.createClass({
	propTypes: {
		contacts: React.PropTypes.array.isRequired,
		newContact: React.PropTypes.object.isRequired,
        onNewContactChange: React.PropTypes.func.isRequired,
        submitNewContact: React.PropTypes.func.isRequired,
	},

	render: function() {
		return React.createElement('div', {className: 'ContactView'},
			React.createElement('h1', {className: 'ContactView-title'}, "Contacts"),
			React.createElement('ul', {className: 'ContactView-list'},
				this.props.contacts.filter(function(contact) { return contact.email; })
				.map(function(contact) { return React.createElement(ContactItem, contact); })
			),
			React.createElement(ContactForm, {value: this.props.newContact, onFormChange: this.props.onNewContactChange, submitNewContact: this.props.submitNewContact})
		);
	},
});

var state = {};

var updateState = function(changes) {
    Object.assign(state, changes);
    var contactView = React.createElement(ContactView, state);
    ReactDOM.render(contactView, document.getElementById('react-app'))
}

updateState({
    contacts: [
        {key: 1, name: "James K Nelson", email: "james@jamesknelson.com", description: "Front-end Unicorn"},
        {key: 2, name: "Jim", email: "jim@example.com"},
        {key: 3, name: "Joe"},
    ],

    newContact: {name: "", email: "", description: ""},

    onNewContactChange: function(currentContact) {
        updateState({newContact: currentContact});
    },

    submitNewContact: function() {
        var newContact = state.newContact;
        if (newContact.email !== "") {
            var contacts = state.contacts;
            contacts.push(Object.assign({}, newContact, {key: contacts.length + 1}));
            updateState({contacts: contacts, newContact: {name: "", email: "", description: ""}});
        }
    },
});
