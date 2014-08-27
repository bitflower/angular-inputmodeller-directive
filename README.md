angular-inputmodeller-directive
===============================

Directive to format / limit / prepend text to the entered input value BEFORE it goes to the model.

Example of an input for entering valid table names with:
* a prepend text
* uppercase formatting
* only alpha-numeric characters and _ allowed
* and a max length of 25 characters:
```html
<input type="text" ng-model="myName" ng-maxlength="25" bf-input-modeller bf-prepend-text="ABC_" bf-prevent-space="true" bf-upper-case="true" bf-alpha-underscore="true" ng-trim="false" id="txtName" class="form-control" placeholder="Name" />
```

Renders to:

![No errors](http://www.bitflower.net/keeponline/bfInputModeller_render.png)

When you delete back to "ABC_" and reach the prepend text which can't be deleted:

![Error prepend text](http://www.bitflower.net/keeponline/bfInputModeller_render_red1.png)

When you enter "&%$test   !!!" the non alpha-numeric characters will be removed, inluding space, and the text will be uppercased:

![Error prepend text](http://www.bitflower.net/keeponline/bfInputModeller_render_blue1.png)
