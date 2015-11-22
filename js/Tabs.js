var Tabs = (function () {
    'use strict';

    // Global variables
    var method          = {},
        settings        = {},

        tabULContainer  = document.createElement('ul'),
        tabHTMLContent  = [],
        tabULContent    = [],
        tabLinksArray   = [],
        tabLIArray      = [],
        currentTab      = {},
        idPostfix       = 'ID',
        tabLIElement,
        aTag,


        defaultSettings = {
            appendTo  : document.body,
            before    : document.body.children[0],
            position  : 'fixed',
            active    : '',
            display   : 'block',
            tabs      : [],
            defaultTab: {
                label   : 'new tab',
                href    : '#newtab',
                inactive: false,
                isUL    : false,
                id      : 'newtab' + idPostfix,
                content : '<div id="newtab">' +
                '<h1>Example tab content</h1>' +
                '</div>'
            }
        };


    // Create tabs
    method.Init = function (parameters) {
        settings.appendTo    = parameters.appendTo || defaultSettings.appendTo;
        settings.before      = parameters.before || defaultSettings.before;
        settings.position    = parameters.position || defaultSettings.position;
        settings.active      = parameters.active || defaultSettings.active;
        settings.display     = parameters.display || defaultSettings.display;
        settings.showHTMLOn  = parameters.showHTMLOn || defaultSettings.showHTMLOn;
        settings.showULOn    = parameters.showULOn || defaultSettings.showULOn;
        settings.hideULOn    = parameters.hideULOn || defaultSettings.hideULOn;
        settings.showChildOn = parameters.showChildOn || defaultSettings.showChildOn;
        settings.hideChildOn = parameters.hideChildOn || defaultSettings.hideChildOn;
        settings.tabs        = parameters.tabs || defaultSettings.tabs;


        // Sets ul element with id="tabs"
        tabULContainer.setAttribute('id', 'tabs');

        for (var i = 0; i < settings.tabs.length; i++) {
            currentTab               = settings.tabs[i];
            currentTab.tabIndex      = i;
            currentTab.tabTitle      = currentTab.label;
            currentTab.tabTitleLower = currentTab.tabTitle.toLowerCase();
            currentTab.tabID         = currentTab.tabTitleLower.replace(/\s+/g, '') + idPostfix;
            currentTab.tabHref       = currentTab.href.toLowerCase();

            method.CreateLinks(currentTab);
            if ((currentTab.content || currentTab.isUL) && !currentTab.ajaxContent) {
                method.GetContent(currentTab);
            }
            else if (currentTab.ajaxContent && !currentTab.content) {

            }
            // Set style for single tab
            method.SetTabStyle(currentTab);
        }
        // Set style for ul container
        tabULContainer.style.position = settings.position;
        Utils.AddClass(tabULContainer, 'tabs');
    };

    // Creates ul element with li's
    method.CreateLinks = function (currentTab) {
        // Creates link attribute
        var aHref       = document.createElement('a');
        aHref.setAttribute('href', currentTab.tabHref);
        aHref.innerHTML = currentTab.tabTitle;

        // Creates LI element and appends href
        tabLIElement = document.createElement('LI');
        tabLIElement.setAttribute('id', currentTab.tabID);
        tabLIElement.appendChild(aHref);

        // Appends li to ul container
        tabULContainer.appendChild(tabLIElement);

        // Appends Tab UL to appendTo element before settings.before element
        settings.appendTo.insertBefore(tabULContainer, settings.before);

    };

    // Called if content is html
    method.GetContent = function (currentTab) {
        // Gets tabs child nodes
        tabLIArray = Utils.GetElementID('tabs').childNodes;

        aTag  = method.GetFirstChildWithTagName(tabLIArray[currentTab.tabIndex], 'a');
        tabLinksArray[currentTab.tabTitleLower] = aTag;
        currentTab.content ? tabHTMLContent[currentTab.tabTitleLower] = currentTab.content : null;
        currentTab.isUL ? tabULContent[currentTab.tabTitleLower] = currentTab.content : null;

        // On tab action
        if (tabLinksArray.hasOwnProperty(currentTab.tabTitleLower) && !currentTab.inactive) {
            if (!currentTab.isUL) {
                Utils.GetElementID(currentTab.tabID).addEventListener(settings.showHTMLOn, method.ShowHTMLContent);
            }
            else if (currentTab.isUL) {
                Utils.GetElementID(currentTab.tabID).addEventListener(settings.showULOn, method.ShowULContent);
            }
        }

    };

    // Show HTML content
    method.ShowHTMLContent = function () {
        // Gets the name of selected tab
        var selectedTab = method.ReturnSelected();

        for (var id in tabHTMLContent) {
            if (id === selectedTab.selected) {
                if (tabHTMLContent.hasOwnProperty(id)) {
                    Utils.RemoveClassAttribute(tabLinksArray[id]);
                    Utils.RemoveClassAttribute(tabHTMLContent[id]);

                    Utils.AddClass(tabLinksArray[id], 'selected');
                    Utils.AddClass(tabHTMLContent[id], 'tabContent');
                }
            }
            else {
                if (tabHTMLContent.hasOwnProperty(id)) {
                    Utils.RemoveClassWithName(tabLinksArray[id], 'selected');
                    Utils.AddClass(tabHTMLContent[id], 'tabContentHide');
                }
            }
        }
    };

    // Show ul content
    method.ShowULContent = function () {
        var selectedTab = method.ReturnSelected();

        for (var ulTab in tabULContent) {
            if (ulTab === selectedTab.selected) {
                if (tabULContent.hasOwnProperty(ulTab)) {
                    // Get ID of selected link
                    var selectedID   = tabULContent[ulTab].id,
                        mainUL       = Utils.GetElementID(selectedID),
                        liChildes    = mainUL.getElementsByTagName('li'),
                        toogle       = Utils.HasClass(mainUL, 'tabDropdownHide') ? true : false,
                        currentChild = {},
                        currentChildUL;

                    // Show or hide ul on action
                    toogle
                        ? (Utils.RemoveClassWithName(mainUL, 'tabDropdownHide'),
                        Utils.AddClass(mainUL, 'tabDropdownShow'))
                        : (Utils.RemoveClassWithName(mainUL, 'tabDropdownShow'),
                        Utils.AddClass(mainUL, 'tabDropdownHide'));

                    // Check for child elements of li
                    for (var i = 0; i < liChildes.length; i++) {
                        currentChild   = liChildes[i];
                        currentChildUL = method.GetFirstChildWithTagName(currentChild, 'ul');

                        if (currentChildUL !== undefined) {
                            Utils.AddClass(currentChildUL, 'ulHide');

                            currentChild.addEventListener(settings.showChildOn, function () {
                                var childToogle = Utils.HasClass(this.firstElementChild, 'ulHide') ? true : false;
                                if (childToogle) {
                                    Utils.RemoveClassWithName(this.firstElementChild, 'ulHide');
                                    Utils.AddClass(this.firstElementChild, 'ulShow');
                                }
                                else if (!childToogle) {
                                    Utils.RemoveClassWithName(this.firstElementChild, 'ulShow');
                                    Utils.AddClass(this.firstElementChild, 'ulHide');
                                }
                            });
                        }
                    }
                }
            }
        }
    };

    // Initialize tabs style, default tab, inactive tab
    method.SetTabStyle = function (currentTab) {

        // Hides all tabs content at the start
        currentTab.isUL ? Utils.AddClass(tabULContent[currentTab.tabTitleLower], 'tabDropdownHide') :
            Utils.AddClass(tabHTMLContent[currentTab.tabTitleLower], 'tabContentHide');

        // Set style for default tab
        if (currentTab.tabTitle === settings.active) {
            Utils.RemoveClassAttribute(tabLinksArray[currentTab.tabTitleLower]);
            Utils.RemoveClassAttribute(tabHTMLContent[currentTab.tabTitleLower]);

            Utils.AddClass(tabLinksArray[currentTab.tabTitleLower], 'selected');
            Utils.AddClass(tabHTMLContent[currentTab.tabTitleLower], 'tabContent');
        }

        // Set style for inactive tab
        if (currentTab.inactive) {
            Utils.RemoveClassAttribute(tabLinksArray[currentTab.tabTitleLower]);
            Utils.RemoveClassAttribute(tabHTMLContent[currentTab.tabTitleLower]);

            Utils.AddClass(tabLinksArray[currentTab.tabTitleLower], 'inactiveLink');
            Utils.AddClass(tabHTMLContent[currentTab.tabTitleLower], 'tabContentHide');
        }

        Utils.AddClass(tabLIArray[currentTab.tabIndex], 'tabsLiElement');
        tabLIArray[currentTab.tabIndex].style.display = settings.display;

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
            selected: elem.innerText.toLowerCase()
        };
    };

    // Adds new tab
    method.AppendTab = function (parametars) {
        var newTab = {
            label   : parametars.label || defaultSettings.defaultTab.label,
            href    : parametars.href || defaultSettings.defaultTab.href,
            content : parametars.content || defaultSettings.defaultTab.content,
            isUL    : parametars.isUL || defaultSettings.defaultTab.isUL,
            inactive: parametars.inactive || defaultSettings.defaultTab.inactive,
            id      : parametars.id + idPostfix || defaultSettings.defaultTab.id
        };

        currentTab               = newTab;
        currentTab.tabTitle      = newTab.label;
        currentTab.tabTitleLower = currentTab.tabTitle.toLowerCase();
        currentTab.tabID         = currentTab.tabTitleLower.replace(/\s+/g, '') + idPostfix;
        currentTab.tabHref       = newTab.href.toLowerCase();
        currentTab.tabIndex      = settings.tabs.length++;

        method.CreateLinks(currentTab);
        method.GetContent(currentTab);
        method.SetTabStyle(currentTab);

    };

    method.RemoveTab = function (parametars) {
        if (currentTab.remove) {
            tabLinksArray[parametars.tabTitleLower] = '';
            tabHTMLContent[parametars.tabTitleLower]
        }
    };

    return method;
}());
