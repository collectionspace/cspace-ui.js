# Configuration How-To

A guide to common UI configuration tasks, including examples.

The CollectionSpace user interface may be configured by editing the HTML file for the tenant you
wish to configure. In a standard installation of CollectionSpace, the tenant HTML files are deployed to Tomcat's `webapps` directory. A tenant is installed for each community-of-practice profile, in a subdirectory named `cspace#{tenant name}`. Each tenant's subdirectory contains a file named `index.html`, which contains the configuration for that tenant's user interface. For example, the configuration for the core (default) tenant is located in `/usr/local/share/apache-tomcat-8.5.51/webapps/cspace#core/index.html`, and the configuration for the fine and contemporary art profile tenant is located in `/usr/local/share/apache-tomcat-8.5.51/webapps/cspace#fcart/index.html`. If you created your own tenant, the `index.html` file will be located in a directory named `cspace#{tenant short name}`.

The deployed HTML file may be edited in place to add configuration properties, but it is recommended to edit the file in the services source tree, and then deploy the file into tomcat. The source tree can be checked in to git so that changes can be tracked and rolled back if necessary. To do this, edit the `index.html` file `services/cspace-ui/{tenant short name}`. Then deploy the updated file by running `ant deploy` in the `services/cspace-ui` directory. 

Each of the following how-to guides shows configuration settings that may be added to the HTML file to customize the CollectionSpace UI.

## Table of Contents

- [Changing the logo](Logo.md)
- [Modifying sign in screen text](SignInText.md)
- [Customizing option lists](OptionLists.md)
- [Changing a field label](FieldLabel.md)
- [Reordering fields](ReorderingFields.md)
- [Adding form templates](AddingTemplates.md)
- [Hiding record types and vocabularies](HideRecord.md)
