var contacts = [
    {key: 1, name: "James K Nelson", email: "james@jamesknelson.com", description: "Front-end Unicorn"},
    {key: 2, name: "Jim", email: "jim@example.com"},
    {key: 3, name: "Joe"},
]

var newContact = {name: "", email: "", description: ""}

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
	},

	render: function() {
		var contact = this.props.value;
        var change = this.props.onFormChange;
		return React.createElement('form', {className: 'ContactForm'},
			React.createElement('input', {type: 'text', placeholder: 'Name (required)', value: contact.name, onChange: function(e) { change(Object.assign({}, contact, {name: e.target.value})); }}),
			React.createElement('input', {type: 'email', placeholder: 'Email', value: contact.email, onChange: function(e) { change(Object.assign({}, contact, {email: e.target.value})); }}),
			React.createElement('textarea', {placeholder: 'Description', value: contact.description, onChange: function(e) { change(Object.assign({}, contact, {description: e.target.value})); }}),
			React.createElement('button', {type: 'submit'}, 'Add Contact')
		);
	}
});

var renderState = function(xstate) {
    var contactView = React.createElement(ContactView, xstate);
    ReactDOM.render(contactView, document.getElementById('react-app'))
};

var ContactView = React.createClass({
	propTypes: {
		contacts: React.PropTypes.array.isRequired,
		newContact: React.PropTypes.object.isRequired,
        onStateChange: React.PropTypes.func.isRequired,
	},

	render: function() {
		return React.createElement('div', {className: 'ContactView'},
			React.createElement('h1', {className: 'ContactView-title'}, "Contacts"),
			React.createElement('ul', {className: 'ContactView-list'},
				this.props.contacts.filter(function(contact) { return contact.email; })
				.map(function(contact) { return React.createElement(ContactItem, contact); })
			),
			React.createElement(ContactForm, {value: this.props.newContact, onFormChange: this.props.onStateChange})
		);
	},
});

var contactItemsElements = contacts
	.filter(function(contact) { return contact.email; })
	.map(function(contact) { return React.createElement(ContactItem, contact); });

 var state = {
     contacts: contacts,
     newContact: newContact,
 };

state.onStateChange = function(currentContact) {
    renderState(Object.assign(state, {newContact: currentContact}));
};

renderState(state);
