var Tabs = (function () {
    'use strict';

    // create object method
    var method          = {},
        settings        = {},

        tabULElement    = document.createElement('ul'),
        tabContentArray = [],
        tabLinksArray   = [],
        tabLIArray      = [],
        tabLIElement,
        aTag,
        pageLink,
        currentTab,
        tabIndex,
        mainUL,


        defaultSettings = {
            appendTo  : document.body,
            before    : document.body.children[0],
            position  : 'fixed',
            defaultTab: '',
            display   : 'block',
            tabs      : [
                {
                    label   : 'ExampleTab',
                    href    : '#exampletab',
                    content : '<h1>This is example tab</h1>',
                    inactive: true
                }
            ]
        };


    // Create tabs
    method.Init = function (parameters) {
        settings.appendTo   = parameters.appendTo || defaultSettings.appendTo;
        settings.before     = parameters.before || defaultSettings.before;
        settings.position   = parameters.position || defaultSettings.position;
        settings.defaultTab = parameters.defaultTab || defaultSettings.defaultTab;
        settings.display    = parameters.display || defaultSettings.display;
        settings.tabs       = parameters.tabs || defaultSettings.tabs;
        settings.tabsLength = parameters.tabs.length || defaultSettings.tabs.length;

        // If there is tabs
        if (settings.tabsLength > 0) {
            method.CreateLinks();
            for (var i = 0; i < settings.tabsLength; i++) {
                currentTab = settings.tabs[i];
                tabIndex   = i;
                if ((currentTab.content || currentTab.isUL) && !currentTab.ajaxContent) {
                    method.GetHTMLContent(tabIndex, currentTab.content, currentTab.href);
                }
                else if (currentTab.ajaxContent && !currentTab.content) {
                    //TODO implement ajax call
                }
                // Set style for single tab
                method.SetTabStyle();
            }
            // Set style for ul
            tabULElement.style.position = settings.position;
            Utils.AddClass(tabULElement, 'tabs');
        }

    };

    // Creates ul element with tabCount li's
    method.CreateLinks = function () {

        // Sets ul element with id="tabs"
        tabULElement.setAttribute('id', 'tabs');

        // Creates tab list elements
        for (var i = 0; i < settings.tabsLength; i++) {
            // Set href link
            var aHref       = document.createElement('a');
            aHref.setAttribute('href', settings.tabs[i].href.toLowerCase());
            aHref.innerHTML = settings.tabs[i].label;

            // Creates LI element and appends href
            tabLIElement = document.createElement('LI');
            tabLIElement.appendChild(aHref);

            // Appends li elements to UL
            tabULElement.appendChild(tabLIElement);
        }

        // Appends Tab UL to appendTo element before settings.before element
        settings.appendTo.insertBefore(tabULElement, settings.before);

    };

    // Called if content is html
    method.GetHTMLContent = function (tabIndex, tabContent, href) {
        // Gets tabs child nodes
        tabLIArray = Utils.GetElementID('tabs').childNodes;

        aTag     = method.GetFirstChildWithTagName(tabLIArray[tabIndex], 'a');
        pageLink = href.substring(1).toLowerCase();

        tabLinksArray[pageLink] = aTag;
        currentTab.content ? tabContentArray[pageLink] = tabContent : false;

        // On Tab Switch
        if (tabLinksArray.hasOwnProperty(currentTab.label)) {
            if (currentTab.content) {
                tabLinksArray[currentTab.label].onmousedown = method.ShowTabContent;
                tabLinksArray[currentTab.label].onfocus     = function () {
                    this.blur();
                };
            }
            else if (currentTab.isUL) {
                tabLinksArray[currentTab.label].onmousedown = method.ShowULContent;
                tabLinksArray[currentTab.label].onfocus     = function () {
                    this.blur();
                };
            }
        }

    };

    // Show clicked tab
    method.ShowTabContent = function () {
        // Gets the name of selected tab
        var selectedTab = method.ReturnSelected();

        for (var id in tabContentArray) {
            if (id === selectedTab.selected) {
                if (tabContentArray.hasOwnProperty(id)) {
                    Utils.RemoveClassAttribute(tabLinksArray[id]);
                    Utils.RemoveClassAttribute(tabContentArray[id]);

                    Utils.AddClass(tabLinksArray[id], 'selected');
                    Utils.AddClass(tabContentArray[id], 'tabContent');
                }
            }
            else {
                if (tabContentArray.hasOwnProperty(id)) {
                    Utils.RemoveClassWithName(tabLinksArray[id], 'selected');
                    Utils.AddClass(tabContentArray[id], 'tabContentHide');
                }
            }
        }
        return false;
    };

    // Get first child with tag name
    method.GetFirstChildWithTagName = function (element, tagName) {
        for (var i = 0; i < element.childNodes.length; i++) {
            if (element.childNodes[i].nodeName.toLowerCase() == tagName) return element.childNodes[i];
        }
    };

    // Return clicked item
    method.ReturnSelected = function (e) {
        var elem,
            evt = e ? e : event;
        if (evt.srcElement) {
            elem = evt.srcElement;
        }
        else if (evt.target) {
            elem = evt.target;
        }
        return {
            selected: elem.innerText.toString()
        }
    };

    // Initialize default and inactive tabs
    method.SetTabStyle = function () {
        // Hides all tabs content at the start
        if (currentTab.content) {
            Utils.AddClass(tabContentArray[currentTab.label], 'tabContentHide');
        }

        if ((currentTab.label === settings.defaultTab) && !currentTab.inactive) {
            Utils.RemoveClassAttribute(tabLinksArray[settings.defaultTab]);
            Utils.RemoveClassAttribute(tabContentArray[settings.defaultTab]);

            Utils.AddClass(tabLinksArray[settings.defaultTab], 'selected');
            Utils.AddClass(tabContentArray[settings.defaultTab], 'tabContent');
        }

        if (currentTab.inactive) {
            Utils.RemoveClassAttribute(tabLinksArray[currentTab.label]);
            Utils.RemoveClassAttribute(tabContentArray[currentTab.label]);

            Utils.AddClass(tabLinksArray[currentTab.label], 'inactiveLink');
            Utils.AddClass(tabContentArray[currentTab.label], 'tabContentHide');
        }
        if (currentTab.isUL) {
            Utils.RemoveClassAttribute(Utils.GetElementID(currentTab.label));
            Utils.AddClass(Utils.GetElementID(currentTab.label), 'tabDropdownHide');
        }

        Utils.AddClass(tabLIArray[tabIndex], 'tabsLiElement');
        tabLIArray[tabIndex].style.display = settings.display;

    };

    // Show content of ul tab
    method.ShowULContent = function () {
        var selectedTab = method.ReturnSelected();

        for (var id in tabLinksArray) {
            if (id === selectedTab.selected) {
                var mainUL           = Utils.GetElementID(selectedTab.selected),
                    liElements       = mainUL.getElementsByTagName('li'),
                    liElementsLength = liElements.length,
                    childNodesList   = [],
                    currentChild     = null;


                var toogle = Utils.HasClass(mainUL, 'tabDropdownHide') ? true : false;

                if (toogle) {
                    Utils.RemoveClassWithName(mainUL, 'tabDropdownHide');
                    Utils.AddClass(mainUL, 'tabDropdownShow');
                }
                else if (!toogle) {
                    Utils.RemoveClassWithName(mainUL, 'tabDropdownShow');
                    Utils.AddClass(mainUL, 'tabDropdownHide');
                }
                // Check for child elements of li
                for (var i = 0; i < liElementsLength; i++) {
                    if (liElements[i].children.length > 0) {
                        childNodesList = liElements[i].childNodes;
                        for (var j = 0; j < childNodesList.length; j++) {
                            currentChild = childNodesList[j];
                            if (currentChild.tagName === 'UL') {
                                Utils.AddClass(currentChild, 'ulHide');
                                currentChild.parentNode.onmousedown = function () {
                                    var self        = this;
                                    var childToogle = Utils.HasClass(self.firstElementChild, 'ulHide') ? true : false;

                                    if (childToogle) {
                                        Utils.RemoveClassWithName(self.firstElementChild, 'ulHide');
                                        Utils.AddClass(self.firstElementChild, 'ulShow');
                                    }
                                    else if (!childToogle) {
                                        Utils.RemoveClassWithName(self.firstElementChild, 'ulShow');
                                        Utils.AddClass(self.firstElementChild, 'ulHide');
                                    }
                                };
                            }
                        }
                    }
                }
            }
        }
    };

    return method;
}());
