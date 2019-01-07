# Changing a field label

To change the label of a field in a record, provide a message override using the [`messages`](../README.md#messages) configuration property.

## Finding the message ID

Find the ID of the message to change using the [messages reference](../messages.js), by searching for the label text. For example, to change the label of the "Loan purpose" field on the Loan In record, search for "Loan purpose" in the messages reference file. This locates the message with ID `field.loansin_common.loanPurpose.name`:

```
"field.loansin_common.loanPurpose.name": "Loan purpose",
```

Verify that you've found the correct message ID: The ID for a field label should start with `field.` and end with `.name`. It should contain the name of the record (in this case, `loansin`), and will likely contain a field name that resembles the default label (in this case, `loanPurpose`).

⚠️ Some fields have a `.fullName` message in addition to the `.name` message. If you change the `.name` message, you should also change the `.fullName` message. The full name is a longer version of the name that is displayed in the record sidebar and on the advanced search form, while the name is shorter, and is displayed in the form for editing the record.

## Setting the label

Set the message for the ID that you located in the messages reference.

```
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <div id="cspace"></div>
    <script src="http://unpkg.com/cspace-ui@1.0.0/dist/cspaceUI.min.js"></script>
    <script>
      cspaceUI({
        messages: {
          'field.loansin_common.loanPurpose.name': 'My new label',
        },
      });
    </script>
  </body>
</html>
```
