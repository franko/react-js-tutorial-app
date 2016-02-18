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
		contact: React.PropTypes.object.isRequired,
	},

	render: function() {
		var contact = this.props.contact;
		return React.createElement('form', {className: 'ContactForm'},
			React.createElement('input', {type: 'text', placeholder: 'Name (required)', value: contact.name}),
			React.createElement('input', {type: 'email', placeholder: 'Email', value: contact.email}),
			React.createElement('textarea', {placeholder: 'Description', value: contact.description}),
			React.createElement('button', {type: 'submit'}, 'Add Contact')
		);
	}
});

var ContactView = React.createClass({
	propTypes: {
		contacts: React.PropTypes.array.isRequired,
		newContact: React.PropTypes.object.isRequired,
	},

	render: function() {
		return React.createElement('div', {className: 'ContactView'},
			React.createElement('h1', {className: 'ContactView-title'}, "Contacts"),
			React.createElement('ul', {className: 'ContactView-list'},
				this.props.contacts.filter(function(contact) { return contact.email; })
				.map(function(contact) { return React.createElement(ContactItem, contact); })
			),
			React.createElement(ContactForm, {contact: newContact})
		);
	},
});

var contactItemsElements = contacts
	.filter(function(contact) { return contact.email; })
	.map(function(contact) { return React.createElement(ContactItem, contact); });

var rootElement = React.createElement(ContactView, {contacts: contacts, newContact: newContact});
ReactDOM.render(rootElement, document.getElementById('react-app'))
