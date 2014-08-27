angular-inputmodeller-directive
===============================

Directive to format / limit / prepend text to the entered input value BEFORE it goes to the model.

Example of an input for entering valid table names:
- with a prepend text
- uppercase formatting
- and a max length of 25 characters:
```html
<input type="text" ng-model="myName" ng-maxlength="25" bf-input-modeller bf-prepend-text="ABC_" bf-prevent-space="true" bf-upper-case="true" bf-alpha-underscore="true" ng-trim="false" id="txtName" class="form-control" placeholder="Name" />
```