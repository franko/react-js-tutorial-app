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
		return React.createElement('li', {},
			React.createElement('h2', {}, this.props.name),
			React.createElement('a', {href: "mailto:" + this.props.email}, this.props.email),
			React.createElement('div', {}, this.props.description)
		);
	}
});

var ContactForm = React.createClass({
	propTypes: {
		contact: React.PropTypes.object.isRequired,
	},

	render: function() {
		var contact = this.props.contact;
		return React.createElement('form', {},
			React.createElement('input', {type: 'text', placeholder: 'Name (required)', value: contact.name}),
			React.createElement('input', {type: 'email', placeholder: 'Email', value: contact.email}),
			React.createElement('textarea', {placeholder: 'Description', value: contact.description}),
			React.createElement('button', {type: 'submit'}, 'Add Contact')
		);
	}
});

var contactItemsElements = contacts
	.filter(function(contact) { return contact.email; })
	.map(function(contact) { return React.createElement(ContactItem, contact); });

var rootElement =
	React.createElement('div', {},
		React.createElement('h1', {}, "Contacts"),
		React.createElement('ul', {}, contactItemsElements),
		React.createElement(ContactForm, {contact: newContact})
	);

ReactDOM.render(rootElement, document.getElementById('react-app'))
