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
        idPostfix       = 'ID',
        tabLIElement,
        aTag,

        // Tab variables
        currentTab,
        tabIndex,
        tabTitle,
        tabHref,
        tabTitleLower,
        tabID,

        defaultSettings = {
            appendTo  : document.body,
            before    : document.body.children[0],
            position  : 'fixed',
            defaultTab: '',
            display   : 'block',
            tabs      : []
        };


    // Create tabs
    method.Init = function (parameters) {
        settings.appendTo    = parameters.appendTo || defaultSettings.appendTo;
        settings.before      = parameters.before || defaultSettings.before;
        settings.position    = parameters.position || defaultSettings.position;
        settings.defaultTab  = parameters.defaultTab || defaultSettings.defaultTab;
        settings.display     = parameters.display || defaultSettings.display;
        settings.showHTMLOn  = parameters.showHTMLOn || defaultSettings.showHTMLOn;
        settings.showULOn    = parameters.showULOn || defaultSettings.showULOn;
        settings.hideULOn    = parameters.hideULOn || defaultSettings.hideULOn;
        settings.showChildOn = parameters.showChildOn || defaultSettings.showChildOn;
        settings.hideChildOn = parameters.hideChildOn || defaultSettings.hideChildOn;
        settings.tabs        = parameters.tabs || defaultSettings.tabs;
        settings.tabsLength  = parameters.tabs.length || defaultSettings.tabs.length;


        // Sets ul element with id="tabs"
        tabULContainer.setAttribute('id', 'tabs');

        for (var i = 0; i < settings.tabsLength; i++) {
            currentTab    = settings.tabs[i];
            tabIndex      = i;
            tabTitle      = currentTab.label;
            tabTitleLower = tabTitle.toLowerCase();
            tabID         = tabTitleLower.replace(/\s+/g, '') + idPostfix;
            tabHref       = currentTab.href.toLowerCase();

            method.CreateLinks(tabTitle, tabHref, tabID);
            if ((currentTab.content || currentTab.isUL) && !currentTab.ajaxContent) {
                method.GetContent(tabID, tabIndex, tabTitleLower);
            }
            else if (currentTab.ajaxContent && !currentTab.content) {

            }
            // Set style for single tab
            method.SetTabStyle(tabTitle, tabTitleLower, tabID, tabIndex);
        }
        // Set style for ul

        tabULContainer.style.position = settings.position;
        Utils.AddClass(tabULContainer, 'tabs');
    };

    // Creates ul element with li's
    method.CreateLinks = function (tabTitle, tabHref, tabID) {
        // Creates link attribute
        var aHref       = document.createElement('a');
        aHref.setAttribute('href', tabHref);
        aHref.innerHTML = tabTitle;

        // Creates LI element and appends href
        tabLIElement = document.createElement('LI');
        tabLIElement.setAttribute('id', tabID);
        tabLIElement.appendChild(aHref);

        // Appends li to ul container
        tabULContainer.appendChild(tabLIElement);

        // Appends Tab UL to appendTo element before settings.before element
        settings.appendTo.insertBefore(tabULContainer, settings.before);

    };

    // Called if content is html
    method.GetContent = function (tabID, tabIndex, tabTitleLower) {
        // Gets tabs child nodes
        tabLIArray = Utils.GetElementID('tabs').childNodes;
        aTag       = method.GetFirstChildWithTagName(tabLIArray[tabIndex], 'a');

        tabLinksArray[tabTitleLower] = aTag;
        currentTab.content ? tabHTMLContent[tabTitleLower] = currentTab.content : null;
        currentTab.isUL ? tabULContent[tabTitleLower] = currentTab.content : null;

        // On tab action
        if (tabLinksArray.hasOwnProperty(tabTitleLower) && !currentTab.inactive) {
            if (!currentTab.isUL) {
                Utils.GetElementID(tabID).addEventListener(settings.showHTMLOn, method.ShowHTMLContent);
            }
            else if (currentTab.isUL) {
                Utils.GetElementID(tabID).addEventListener(settings.showULOn, method.ShowULContent);
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
    method.SetTabStyle = function (tabTitle, tabTitleLower, tabID, tabIndex) {

        // Hides all tabs content at the start
        currentTab.isUL ? Utils.AddClass(tabULContent[tabTitleLower], 'tabDropdownHide') :
            Utils.AddClass(tabHTMLContent[tabTitleLower], 'tabContentHide');

        // Set style for default tab
        if (tabTitle === settings.defaultTab) {
            Utils.RemoveClassAttribute(tabLinksArray[tabTitleLower]);
            Utils.RemoveClassAttribute(tabHTMLContent[tabTitleLower]);

            Utils.AddClass(tabLinksArray[tabTitleLower], 'selected');
            Utils.AddClass(tabHTMLContent[tabTitleLower], 'tabContent');
        }

        // Set style for inactive tab
        if (currentTab.inactive) {
            Utils.RemoveClassAttribute(tabLinksArray[tabTitleLower]);
            Utils.RemoveClassAttribute(tabHTMLContent[tabTitleLower]);

            Utils.AddClass(tabLinksArray[tabTitleLower], 'inactiveLink');
            Utils.AddClass(tabHTMLContent[tabTitleLower], 'tabContentHide');
        }

        Utils.AddClass(tabLIArray[tabIndex], 'tabsLiElement');
        tabLIArray[tabIndex].style.display = settings.display;

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
            selected: elem.innerText.toLowerCase().toString()
        };
    };


    return method;
}());
