# Configuration How-To

A guide to common UI configuration tasks, including examples.

The CollectionSpace user interface may be configured by editing the HTML file for the tenant you
wish to configure. In a standard installation of CollectionSpace, the tenant HTML files are located in Tomcat's `webapps` directory. A tenant is installed for each community-of-practice profile, in a subdirectory named `cspace#{tenant name}`. Each tenant's subdirectory contains a file named `index.html`, which contains the configuration for that tenant's user interface. For example, the configuration for the core (default) tenant is located in `/usr/local/share/apache-tomcat-7.0.64/webapps/cspace#core/index.html`, and the configuration for the fine and contemporary art profile tenant is located in `/usr/local/share/apache-tomcat-7.0.64/webapps/cspace#fcart/index.html`. If you have a customized installation of CollectionSpace, or you [created an HTML file](../../installation) for your tenant in a location other than the standard installation directory, locate that file.

Each of the following how-to guides shows configuration settings that may be added to the HTML file to customize the CollectionSpace UI.

## Table of Contents

- [Changing the logo](Logo.md)
- [Modifying sign in screen text](SignInText.md)
- [Changing a field label](FieldLabel.md)
- [Reordering fields](ReorderingFields.md)